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

variable "db_username" {
    description = "The username for the database."
    type        = string
    default     = "roosteradmin"
}

variable "db_password" {
    description = "The password for the database."
    type        = string
    default     = "ChickenRun#1"
}
