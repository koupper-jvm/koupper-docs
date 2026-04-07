# Docker Provider

`docker` exposes Docker CLI workflows from scripts.

## Service provider

- `DockerServiceProvider`

## Contract and implementations

- `DockerClient` -> `DockerCliClient`

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
