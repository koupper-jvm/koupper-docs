# `aws-dynamo` Provider

`aws-dynamo` integrates DynamoDB clients for app data operations and local Dynamo table admin helpers.

Service provider class: `AwsServiceProvider`

## Contracts and implementations

- `DynamoClient` -> `DynamoClientImpl`
- `DynamoLocalAdmin` -> `DynamoLocalAdminImpl`

## Local admin capabilities (`DynamoLocalAdmin`)

- Ensure table exists (`ensureTable`) from key and attribute definitions.
- Check table presence (`tableExists`) and list tables (`listTables`).
- Truncate table by key schema (`truncateTable`).
- Quick count helpers (`scanCount`, `countByEmail`).

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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.aws.dynamo.DynamoClient
import com.koupper.container.app

@Export
val queryUsers: () -> List<Map<String, Any?>> = {
    val dynamo = app.getInstance(DynamoClient::class)
    dynamo.query(
        tableName = "users",
        keyCondition = "active = :val",
        values = mapOf(":val" to "true")
    )
}

@Export
val insertLog: () -> String = {
    val dynamo = app.getInstance(DynamoClient::class)
    dynamo.put(
        tableName = "deploy_logs",
        item = mapOf(
            "id" to java.util.UUID.randomUUID().toString(),
            "timestamp" to System.currentTimeMillis(),
            "status" to "deployed"
        )
    )
    "Log saved"
}
```
