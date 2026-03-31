# AWS Dynamo Provider

`aws-dynamo` integrates DynamoDB clients for script and module data operations.

## Service provider

- `AwsServiceProvider`

## Contract and implementations

- `DynamoClient` -> `DynamoClientImpl`

## Environment variables

- `DYNAMO_REGION` (required)
- `DYNAMO_URL` (optional)
- `AWS_ACCESS_KEY_ID` (optional)
- `AWS_SECRET_ACCESS_KEY` (optional)
- `AWS_SESSION_TOKEN` (optional)

## CLI discovery

```bash
koupper provider info aws-dynamo
```
