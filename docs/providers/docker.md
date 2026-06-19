# Docker Provider

`docker` exposes Docker CLI workflows from scripts.

## Service provider

- `DockerServiceProvider`

## Contract and implementations

- `DockerClient` -> `DockerCliClient`

## Result contract

All operations return `DockerCommandResult`. Never throws on timeout or launch failure.

```kotlin
data class DockerCommandResult(
    val command: String,
    val exitCode: Int,
    val stdout: String,
    val stderr: String
)
// exitCode 124 = timeout, exitCode 127 = docker binary not found
```

## Environment variables

- `DOCKER_COMMAND` (optional)
- `DOCKER_HOST` (optional)
- `DOCKER_CONTEXT` (optional)
- `DOCKER_TIMEOUT_SECONDS` (optional)
- `DOCKER_WORKDIR` (optional)

## CLI discovery

```bash
koupper provider info docker
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.docker.DockerClient
import com.koupper.container.app

@Export
val buildAndRun: () -> String = {
    val docker = app.getInstance(DockerClient::class)
    
    // Build an image
    docker.build("myapp:latest", contextDir = ".")
    
    // Run a container
    val result = docker.run(
        image = "myapp:latest",
        containerName = "myapp-prod",
        ports = mapOf(8080 to 8080),
        env = mapOf("NODE_ENV" to "production")
    )
    "Container ${result.containerId} started"
}

@Export
val checkContainers: () -> List<String> = {
    val docker = app.getInstance(DockerClient::class)
    docker.listContainers(showAll = true)
        .map { "${it.name} — ${it.status}" }
}
```
