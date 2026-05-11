provider "aws" {
  region = var.app_region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.14"

  backend "s3" {
    use_lockfile = true
  }
}


data "aws_vpc" "rooster_vpc" {
  default = true
}

# data "aws_subnets" "rooster_subnets" {
#   filter {
#     name   = "vpc-id"
#     values = [data.aws_vpc.rooster_vpc.id]
#   }
# }

resource "aws_subnet" "rooster_subnet1" {
  vpc_id                  = data.aws_vpc.rooster_vpc.id
  cidr_block              = cidrsubnet(data.aws_vpc.rooster_vpc.cidr_block, 8, 1)
  map_public_ip_on_launch = true
  availability_zone       = "${var.app_region}a"
}

resource "aws_subnet" "rooster_subnet2" {
  vpc_id                  = data.aws_vpc.rooster_vpc.id
  cidr_block              = cidrsubnet(data.aws_vpc.rooster_vpc.cidr_block, 8, 2)
  map_public_ip_on_launch = true
  availability_zone       = "${var.app_region}c"
}

# resource "aws_internet_gateway" "rooster_gateway" {
#   vpc_id = data.aws_vpc.rooster_vpc.id
#   tags = {
#     Name = "rooster_gateway"
#   }
# }

# resource "aws_route_table" "route_table" {
#   vpc_id = data.aws_vpc.rooster_vpc.id
#   route {
#     cidr_block = "0.0.0.0/0"
#     gateway_id = aws_internet_gateway.rooster_gateway.id
#   }
# }

# resource "aws_route_table_association" "subnet_route" {
#   subnet_id      = aws_subnet.rooster_subnet.id
#   route_table_id = aws_route_table.route_table.id
# }

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
  vpc_id      = data.aws_vpc.rooster_vpc.id

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
    description = "HTTP from anywhere for dev"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "RDS PostgreSQL access from app server"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
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

# data "aws_ssm_parameter" "ecs_ami" {
#   name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
# }

# resource "aws_launch_template" "ecs_launch_template" {
#   name_prefix   = "rooster-ecs-launch-template-"
#   image_id      = data.aws_ssm_parameter.ecs_ami.value
#   instance_type = var.app_instance_type

#   network_interfaces {
#     security_groups = [aws_security_group.app_db_sg.id]
#     subnet_id       = aws_subnet.rooster_subnet.id
#   }

#   tag_specifications {
#     resource_type = "instance"
#     tags = {
#       Name = var.app_instance_name
#     }
#   }

#   block_device_mappings {
#     device_name = "/dev/xvda"
#     ebs {
#       volume_size = 20
#       volume_type = "gp2"
#       delete_on_termination = true
#     }
#   }
#   iam_instance_profile {
#     name = "ecsInstanceRole"
#   }

#   # key_name = var.key_name
#   vpc_security_group_ids = [aws_security_group.app_db_sg.id]

#   user_data = <<-EOF
#               #!/bin/bash
#               echo "ECS_CLUSTER=${aws_ecs_cluster.rooster_cluster.name}" >> /etc/ecs/ecs.config
#               EOF
# }

# resource "aws_autoscaling_group" "rooster_asg" {
#   vpc_zone_identifier = [aws_subnet.rooster_subnet.id]
#   desired_capacity = 1
#   max_size = 2
#   min_size = 1

#   launch_template {
#     id = aws_launch_template.ecs_launch_template.id
#     version = "$Latest"
#   }
#   tag {
#     key = "AmazonECSManaged"
#     value = true
#     propagate_at_launch = true
#   }
# }

# resource "aws_lb" "rooster_alb" {
#   name = "rooster-alb"
#   internal = false
#   load_balancer_type = "application"
#   security_groups = [aws_security_group.app_db_sg.id]
#   subnets = [aws_subnet.rooster_subnet.id]

#   tags = {
#     Name = "rooster-alb"
#   }
# }

# resource "aws_lb_listener" "ecs_alb_listener" {
#   load_balancer_arn = aws_lb.rooster_alb.arn
#   port              = "80"
#   protocol          = "HTTP"

#   default_action {
#     type             = "fixed-response"
#     fixed_response {
#       content_type = "text/plain"
#       message_body = "Service is not yet deployed"
#       status_code  = "200"
#     }
#     # type = "forward"
#     # target_group_arn = aws_lb_target_group.ecs_tg.arn
#   }
# }

# resource "aws_lb_target_group" "ecs_tg" {
#   name= "rooster-ecs-tg"
#   port = 80
#   protocol = "HTTP"
#   vpc_id = data.aws_vpc.rooster_vpc.id
#   target_type = "ip"

#   health_check {
#     path = "/"
#   }
# }

resource "aws_db_subnet_group" "default" {
  name       = "rooster-db-subnet-group"
  subnet_ids = [aws_subnet.rooster_subnet1.id, aws_subnet.rooster_subnet2.id]

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

resource "aws_key_pair" "generated_key" {
  key_name   = "my-generated-key"
  public_key = file("${var.public_key_path}")
}

resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.app_instance_type
  vpc_security_group_ids = [aws_security_group.app_db_sg.id]
  subnet_id              = aws_subnet.rooster_subnet1.id
  key_name               = aws_key_pair.generated_key.key_name

  # root_block_device {
  #   volume_size = 150
  #   volume_type = "gp3"
  # }

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y docker.io
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu

              curl -fsSL https://get.pnpm.io/install.sh | sh -
              curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

              # $(aws ecr get-login-password --region ${var.app_region} | docker login --username AWS --password-stdin ${aws_ecr_repository.repository.repository_url})
              # docker pull ${aws_ecr_repository.repository.repository_url}:latest
              # docker run -d -p 3000:3000 --name rooster-app ${aws_ecr_repository.repository.repository_url}:latest
              EOF

  tags = {
    Name = var.app_instance_name
  }
}

# ECR repository and policy
resource "aws_ecr_repository" "repository" {
  name                 = var.ecr_repository_name
  # image_tag_mutability = "IMMUTABLE"
  # image_scanning_configuration {
  #   scan_on_push = true
  # }

  encryption_configuration {
    encryption_type = "KMS"
  }
}

resource "aws_ecr_lifecycle_policy" "name" {
  repository = aws_ecr_repository.repository.name
  policy     = templatefile("ecr-policy.json", {})
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
      identifiers = ["arn:aws:iam::${var.aws_account_id}:role/${var.iam_role}"]
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
