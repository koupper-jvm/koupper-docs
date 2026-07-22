# Logger Provider

`logger` persists application logs into a database-backed sink.

## Service provider

- `LoggerServiceProvider`

## Contract and implementations

- `Logger` -> `PSQLDBLogger`

## Environment variables

- `LOGGER_TABLE_NAME` (required)

## CLI discovery

```bash
koupper provider info logger
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.logger.Logger
import com.koupper.container.app

@Export
val logEvent: () -> String = {
    val logger = app.getInstance(Logger::class)
    logger.info("Deploy started", mapOf("version" to "2.3.1", "env" to "production"))
    "Event logged"
}
```
