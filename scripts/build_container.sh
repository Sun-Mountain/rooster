docker build -t rooster:latest .
docker push ${{ AWS_ACCOUNT_ID }}.dkr.ecr.${{ AWS_REGION }}.amazonaws.com/rooster:latest