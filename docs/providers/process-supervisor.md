# `process-supervisor` Provider

`process-supervisor` manages local long-running processes (dev servers/workers) from Koupper scripts with persisted metadata, logs and optional health checks.

Service provider class: `ProcessSupervisorServiceProvider`  
Contract: `ProcessSupervisor`

## Capabilities

- Start detached/background processes (`start`) by `shellCommand` or `executable + args`.
- Prevent duplicate start by `name` when a process is already running.
- Query process state (`status`) with optional HTTP health check.
- List registered processes (`list`) across sessions.
- Stop by `name` or `pid` (`stop`) with optional force mode.
- Read process logs (`logs`) with tail support.
- Remove orphan metadata records (`cleanup`).

## Persistence

Metadata is stored locally and survives terminal/session restarts.

Persisted fields:

- `name`
- `pid`
- `command`
- `workingDirectory`
- `envKeys` (keys only, values are never persisted)
- `startedAt`
- `logPath`
- `healthUrl` (optional)

Default store path: `~/.koupper/processes.json`  
Default logs directory: `~/.koupper/process-logs`

## Environment variables

- `PROCESS_SUPERVISOR_STORE_PATH` (optional)
- `PROCESS_SUPERVISOR_LOG_DIR` (optional)
- `PROCESS_SUPERVISOR_SHELL_WINDOWS` (optional, default `pwsh`)
- `PROCESS_SUPERVISOR_SHELL_UNIX` (optional, default `bash`)

## Resolve from container

```kotlin
import com.koupper.container.app
import com.koupper.providers.process.ProcessSupervisor

val supervisor = app.getInstance(ProcessSupervisor::class)
```

## Start example

```kotlin
import com.koupper.providers.process.ProcessStartRequest

val started = supervisor.start(
    ProcessStartRequest(
        name = "frontend-dev",
        shellCommand = "npm run dev",
        workingDirectory = "./frontend",
        healthUrl = "http://localhost:5173"
    )
)
```

## Status + health example

```kotlin
import com.koupper.providers.process.ProcessStatusRequest

val status = supervisor.status(
    ProcessStatusRequest(
        name = "frontend-dev",
        healthTimeoutMs = 1200
    )
)
```

## Stop + logs example

```kotlin
import com.koupper.providers.process.ProcessLogsRequest
import com.koupper.providers.process.ProcessStopRequest

val stop = supervisor.stop(ProcessStopRequest(name = "frontend-dev", force = true))
val logs = supervisor.logs(ProcessLogsRequest(name = "frontend-dev", tailLines = 80))
```

## Script examples

- `scripts/local-up.kts`
- `scripts/local-status.kts`
- `scripts/local-down.kts`
- `scripts/local-logs.kts`
