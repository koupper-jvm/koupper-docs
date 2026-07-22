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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.aws.s3.S3Client
import com.koupper.container.app

@Export
val uploadArtifact: () -> String = {
    val s3 = app.getInstance(S3Client::class)
    val bucket = System.getenv("QUIZZTEA_S3_BUCKET")
    
    s3.upload(
        bucket = bucket,
        key = "builds/app-${System.currentTimeMillis()}.jar",
        file = java.io.File("build/libs/app.jar")
    )
    "Uploaded to s3://$bucket/builds/"
}

@Export
val getPresignedUrl: () -> String = {
    val s3 = app.getInstance(S3Client::class)
    s3.presignedUrl(
        bucket = System.getenv("QUIZZTEA_S3_BUCKET"),
        key = "reports/summary.pdf",
        expirationMinutes = 60
    )
}
```
