# Secrets Provider

`secrets` resolves secret values from environment variables or local JSON storage.

## Service provider

- `SecretsServiceProvider`

## Contract and implementations

- `SecretsClient` -> `LocalSecretsClient`

## Interface

```kotlin
fun get(key: String): String
fun getOrNull(key: String): String?
fun getJson(key: String): Map<String, Any?>
fun put(key: String, value: String)
fun exists(key: String): Boolean
fun delete(key: String): Boolean   // returns true if key existed and was removed
fun list(): Set<String>            // returns all known keys from the active backend
```

## Environment variables

- `SECRETS_FILE` (optional)
- `SECRETS_ENV_PREFIX` (optional) — prefix filter for env-based resolution
- `SECRETS_PERSIST_WRITES` (optional) — persist `put` and `delete` operations to the JSON file
- `SECRETS_REQUIRE_FILE` (optional)

## CLI discovery

```bash
koupper provider info secrets
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.secrets.SecretsClient
import com.koupper.container.app

@Export
val useSecrets: () -> String = {
    val secrets = app.getInstance(SecretsClient::class)
    
    val apiKey = secrets.getOrNull("API_KEY") ?: return@useSecrets "API_KEY not configured"
    val config = secrets.getJson("deploy_config")
    val env = config["environment"] as? String ?: "unknown"
    
    "Using key for $env: ${apiKey.take(4)}***"
}
```
