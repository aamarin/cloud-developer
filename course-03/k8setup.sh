#!/bin/bash

aws s3api create-bucket --bucket udagram629dev-k8-state-store --region us-east-1;
aws s3api put-bucket-versioning --bucket udagram629dev-k8-state-store  --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket udagram629dev-k8-state-store --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

kops create cluster --zones us-east-1a ${NAME}
kops update cluster ${NAME} --yes