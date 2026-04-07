provider "aws" {
  region = var.app_region
}

locals {
  account-id = data.aws_caller_identity.current.account_id
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.14"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_security_group" "app_db_sg" {
  name        = "rooster-app-db-sg"
  description = "Shared app + DB security group"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "RDS MySQL access from app server"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rooster-app-db-sg"
  }
}

resource "aws_db_subnet_group" "default" {
  name       = "rooster-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "rooster-db-subnet-group"
  }
}

resource "aws_db_instance" "app_db" {
  identifier             = "rooster-app-db"
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = var.db_instance_type
  allocated_storage      = 20
  max_allocated_storage  = 100
  storage_type           = "gp2"
  db_subnet_group_name   = aws_db_subnet_group.default.name
  vpc_security_group_ids = [aws_security_group.app_db_sg.id]
  publicly_accessible    = false
  skip_final_snapshot    = true

  db_name  = var.db_schema_name
  username = var.db_username
  password = var.db_password

  tags = {
    Name = var.db_instance_name
  }
}

resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.app_instance_type
  vpc_security_group_ids = [aws_security_group.app_db_sg.id]

  tags = {
    Name = var.app_instance_name
  }
}

# ECR repository and policy
resource "aws_ecr_repository" "repository" {
  name                 = var.ecr_repository_name
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
  }
}

resource "aws_ecr_lifecycle_policy" "name" {
  repository = aws_ecr_repository.repository.name
  policy     = templatefile(var.lifecycle_policy, {})
}

resource "aws_ecr_registry_scanning_configuration" "scan_configuration" {
  scan_type = "ENHANCED"

  rule {
    scan_frequency = "CONTINUOUS_SCAN"
    repository_filter {
      filter      = "*"
      filter_type = "WILDCARD"
    }
  }
}

data "aws_iam_policy_document" "ecr_repo_policy" {
  statement {
    sid    = "All Accounts in the Org can pull"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:ListImages"
    ]
    condition {
      test     = "StringEquals"
      variable = "aws:PrincipalAccount"
      values   = ["${var.aws_account_id}"]
    }
  }
  statement {
    sid    = "Allow push only from github actions"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${local.account-id}:role/${var.iam_role}"]
    }
    actions = ["ecr:BatchCheckLayerAvailability",
      "ecr:CompleteLayerUpload",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
    "ecr:UploadLayerPart"]
    condition {
      test     = "StringEquals"
      variable = "aws:PrincipalAccount"
      values   = ["${var.aws_account_id}"]
    }
  }
}
