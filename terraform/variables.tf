# AWS general variables
variable "app_region" {
  description = "Region the app is being installed to"
  type        = string
  default     = "us-east-1"
}

variable "iam_role" {
  description = "The name of the IAM role to create for the EC2 instance."
  type        = string
  default     = "rooster-app-ec2-role"
}

variable "aws_account_id" {
  description = "Target AWS Account ID"
  type        = string
}

# variable "lifecycle_policy" {
#   type        = string
#   description = "the lifecycle policy to be applied to the ECR repo"
# }

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
}


# EC2 instance variables
variable "app_instance_name" {
  description = "Value of the EC2 instance's Name tag."
  type        = string
  default     = "rooster-app-server"
}

variable "app_instance_type" {
  description = "The EC2 instance's type."
  type        = string
  default     = "t2.micro"
}


# Database variables
variable "db_instance_name" {
  description = "The name of the database to create when the DB instance is created."
  type        = string
  default     = "roosterdb"
}

variable "db_instance_type" {
  description = "The type of the database instance."
  type        = string
  default     = "db.t3.micro"
}

variable "db_schema_name" {
  description = "The name for the database."
  type        = string
  default     = "roosterdb"
}

variable "db_username" {
  description = "The username for the database."
  type        = string
  default     = "roosteradmin"
}

variable "db_password" {
  description = "The password for the database."
  type        = string
  default     = "ChickenRun1"
}

variable "public_key_path" {
  description = "Path to the public key file."
  type        = string
}
