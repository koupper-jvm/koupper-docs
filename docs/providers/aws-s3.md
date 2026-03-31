# AWS S3 Provider

`aws-s3` supports object uploads and presigned storage workflows.

## Service provider

- `AwsS3ServiceProvider`

## Contract and implementations

- `S3Client` -> `S3ClientImpl`

## Environment variables

- `QUIZZTEA_S3_BUCKET` (required)
- `AWS_REGION` (required)
- `S3_URL` (optional)
- `AWS_ACCESS_KEY_ID` (optional)
- `AWS_SECRET_ACCESS_KEY` (optional)
- `AWS_SESSION_TOKEN` (optional)

## CLI discovery

```bash
koupper provider info aws-s3
```
