# Files Provider

`files` centralizes file, text, JSON and YAML utilities.

## Service provider

- `FileServiceProvider`

## Contracts and implementations

- `FileHandler` -> `FileHandlerImpl`
- `TextFileHandler` -> `TextFileHandlerImpl`
- `JSONFileHandler` -> `JSONFileHandlerImpl`
- `YmlFileHandler` -> `YmlFileHandlerImpl`

## Environment variables

- none required

## CLI discovery

```bash
koupper provider info files
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.files.FileHandler
import com.koupper.providers.files.JSONFileHandler
import com.koupper.providers.files.YmlFileHandler
import com.koupper.container.app

@Export
val readConfig: () -> Map<String, Any?> = {
    val jsonHandler = app.getInstance(JSONFileHandler::class)
    val config = jsonHandler.read<Map<String, Any?>>("config.json")
    config
}

@Export
val writeLog: () -> Unit = {
    val fileHandler = app.getInstance(FileHandler::class)
    fileHandler.write("deploy.log", "Deployment completed at ${System.currentTimeMillis()}")
}
```
