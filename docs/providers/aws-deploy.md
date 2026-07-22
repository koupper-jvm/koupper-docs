# `aws-deploy` Provider

`aws-deploy` exposes deployment-focused AWS operations through the container so scripts can stay provider-first.

Service provider class: `AwsDeployServiceProvider`  
Contract: `AwsDeployProvider`

## What it covers

- CLI preflight checks (`aws --version`, identity, target resources).
- Lambda deployment with waiter + alias update + rollback support.
- Static site rollout to S3 + CloudFront invalidation + backup strategy controls.
- API smoke tests for API Gateway/base URL endpoints.
- Retry/backoff hardening for transient AWS failures.
- Structured action-level result envelopes for automation.

## Environment variables

- `AWS_COMMAND` (optional, default `aws`)
- `AWS_REGION` (optional, default `us-east-1`)
- `AWS_DEPLOY_TIMEOUT_SECONDS` (optional, default `300`)
- `AWS_DEPLOY_RETRY_COUNT` (optional, default `2`)
- `AWS_DEPLOY_RETRY_BACKOFF_MS` (optional, default `500`)
- `AWS_FRONTEND_BACKUP_MODE` (optional, default `incremental`, allowed: `full|incremental|disabled`)
- `AWS_ACCESS_KEY_ID` (optional, runtime auth)
- `AWS_SECRET_ACCESS_KEY` (optional, runtime auth)
- `AWS_SESSION_TOKEN` (optional, temporary credentials)

## Production-safe defaults

- Timeouts default to `300s`, with longer operation defaults internally for heavy S3/CloudFront actions.
- Retry defaults: `2` attempts with `500ms` base backoff for transient failures.
- Frontend backup defaults to `incremental` to preserve rollback artifacts without forcing full sync on every deploy.

## Structured action result contract

Deploy operations expose `actions` entries with this shape:

```json
{
  "ok": true,
  "action": "lambda-publish-version",
  "exitCode": 0,
  "durationMs": 1432,
  "attempts": 2,
  "warnings": [],
  "errors": [],
  "nextAction": null
}
```

## Tuning guidance

- Small artifacts / single distribution:
  - timeout `300-600s`, retries `2`, backoff `500ms`, backup `incremental`.
- Medium-large artifacts or multiple distributions:
  - timeout `900-1800s`, retries `3-4`, backoff `800-1200ms`, backup `incremental`.
- High-risk releases requiring full rollback snapshots:
  - backup mode `full` and timeout `>=1200s`.

## Troubleshooting transient AWS failures

| Error pattern | Likely cause | Recommended action |
| --- | --- | --- |
| `ResourceConflictException` | Lambda state race between update/publish/alias | Keep waiter enabled, increase retry count/backoff. |
| `ThrottlingException` / `TooManyRequests` | API pressure / account limits | Increase backoff and retries, reduce concurrent deploy pressure. |
| `RequestTimeout` / connection reset | Network or endpoint transient failures | Increase timeout and retry settings; validate network path. |
| S3/CloudFront command timeout | Large artifact or distribution churn | Increase `AWS_DEPLOY_TIMEOUT_SECONDS` and use incremental backup. |

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


## CLI discovery

```bash
koupper provider info aws-deploy
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.aws.deploy.AwsDeployProvider
import com.koupper.container.app

@Export
val deployLambda: () -> String = {
    val deploy = app.getInstance(AwsDeployProvider::class)
    
    val preflight = deploy.preflight()
    if (!preflight.ok) return@deployLambda "Preflight failed: ${preflight.errors}"
    
    val result = deploy.deployLambda(
        functionName = "my-api",
        zipPath = "build/lambda.zip",
        timeoutSeconds = 120
    )
    if (result.ok) "Deployed in ${result.durationMs}ms" else "Deploy failed"
}
```
