import { S3Client } from '@aws-sdk/client-s3';
import { SNSClient } from '@aws-sdk/client-sns';
import dotenv from 'dotenv';

dotenv.config();

const { AWS_REGION } = process.env;

export const s3Client = new S3Client({
  region: AWS_REGION
});

export const snsClient = new SNSClient({
  region: AWS_REGION
});