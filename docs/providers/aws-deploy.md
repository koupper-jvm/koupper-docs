# `aws-deploy` Provider

`aws-deploy` exposes deployment-focused AWS operations through the container so scripts can stay provider-first.

Service provider class: `AwsDeployServiceProvider`  
Contract: `AwsDeployProvider`

## What it covers

- CLI preflight checks (`aws --version`, identity, target resources).
- Lambda deployment with alias update and rollback support.
- Static site rollout to S3 + CloudFront invalidation + rollback path.
- API smoke tests for API Gateway/base URL endpoints.

## Environment variables

- `AWS_COMMAND` (optional, default `aws`)
- `AWS_REGION` (optional, default `us-east-1`)
- `AWS_DEPLOY_TIMEOUT_SECONDS` (optional, default `300`)
- `AWS_ACCESS_KEY_ID` (optional, runtime auth)
- `AWS_SECRET_ACCESS_KEY` (optional, runtime auth)
- `AWS_SESSION_TOKEN` (optional, temporary credentials)

## Example: resolve from container

```kotlin
import com.koupper.container.app
import com.koupper.providers.aws.deploy.AwsDeployProvider

val deploy = app.getInstance(AwsDeployProvider::class)
```

## Example: preflight + smoke in one script

```kotlin
import com.koupper.providers.aws.deploy.AwsApiSmokeEndpoint
import com.koupper.providers.aws.deploy.AwsApiSmokeTestRequest
import com.koupper.providers.aws.deploy.AwsPreflightRequest

val preflight = deploy.preflight(
    AwsPreflightRequest(
        region = "us-east-1",
        lambdas = listOf("my-handler"),
        buckets = listOf("my-site-bucket"),
        cloudFrontDistributions = listOf("E1234567890"),
        dryRun = true,
        strict = false
    )
)

val smoke = deploy.smokeTestApis(
    AwsApiSmokeTestRequest(
        region = "us-east-1",
        dryRun = true,
        endpoints = listOf(
            AwsApiSmokeEndpoint(
                name = "health",
                apiGatewayId = "abc123",
                stage = "dev",
                path = "/health",
                expectedStatusCodes = setOf(200)
            )
        )
    )
)
```

## Recommended workflow

1. Run provider preflight with `dryRun=true` first.
2. Build artifacts locally (Gradle/npm).
3. Deploy via provider APIs, not direct AWS CLI calls in scripts.
4. Execute smoke checks before marking rollout complete.
