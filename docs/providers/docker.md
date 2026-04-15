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
