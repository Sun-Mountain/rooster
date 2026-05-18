output "aws_ecr_repo_url" {
  value = aws_ecr_repository.repository.repository_url
}

output "aws_ec2_instance_public_ip" {
  value = aws_instance.app_server.public_ip
}

# output "aws_private_key" {
#   value = tls_private_key.dev_key.private_key_pem
#   sensitive = true
# }

# output "aws_public_key" {
#   value = tls_private_key.dev_key.public_key_openssh
# }