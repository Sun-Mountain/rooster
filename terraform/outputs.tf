output "aws_ecr_repo_url" {
  value = aws_ecr_repository.repository.repository_url
}

output "aws_ecr_repo_arn" {
  value = aws_ecr_repository.repository.arn
}

output "aws_ec2_instance_id" {
  value = aws_instance.app_server.id
}

output "aws_ec2_instance_public_ip" {
  value = aws_instance.app_server.public_ip
}