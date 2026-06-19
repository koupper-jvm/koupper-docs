# `process-supervisor` Provider

`process-supervisor` manages local long-running processes (dev servers/workers) from Koupper scripts with persisted metadata, logs and optional health checks.

Service provider class: `ProcessSupervisorServiceProvider`  
Contract: `ProcessSupervisor`

## Capabilities

- Start detached/background processes (`start`) by `shellCommand` or `executable + args`.
- Prevent duplicate start by `name` when a process is already running (idempotent by name).
- Run startup health validation (`ensureHealthyOnStart`) with retry/timeouts.
- Query process state (`status`/`statusMany`) with flexible health policy.
- List registered processes (`list`) across sessions with stale auto-prune.
- Stop by `name` or `pid` (`stop`/`stopMany`) with optional force mode.
- Read process logs (`logs`) with tail support, byte caps, and ANSI stripping.
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
import com.koupper.providers.process.ProcessHealthPolicy
import com.koupper.providers.process.ProcessStatusRequest

val status = supervisor.status(
    ProcessStatusRequest(
        name = "frontend-dev",
        healthPolicy = ProcessHealthPolicy(
            acceptedStatusCodes = setOf(200, 204),
            retries = 2,
            retryDelayMs = 200,
            timeoutMs = 1200
        )
    )
)
```

## Batch operations example

```kotlin
import com.koupper.providers.process.ProcessStatusManyRequest
import com.koupper.providers.process.ProcessStopManyRequest

val statuses = supervisor.statusMany(
    ProcessStatusManyRequest(names = listOf("frontend-dev", "backend-dev"))
)

val stopped = supervisor.stopMany(
    ProcessStopManyRequest(names = listOf("frontend-dev", "backend-dev"), force = true)
)
```

## Stop + logs example

```kotlin
import com.koupper.providers.process.ProcessLogsRequest
import com.koupper.providers.process.ProcessStopRequest

val stop = supervisor.stop(ProcessStopRequest(name = "frontend-dev", force = true))
val logs = supervisor.logs(
    ProcessLogsRequest(
        name = "frontend-dev",
        tailLines = 80,
        maxBytes = 64 * 1024,
        stripAnsi = true
    )
)
```

## Script examples

- `scripts/local-up.kts`
- `scripts/local-status.kts`
- `scripts/local-down.kts`
- `scripts/local-logs.kts`

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.process.ProcessSupervisor
import com.koupper.container.app

@Export
val startService: () -> String = {
    val supervisor = app.getInstance(ProcessSupervisor::class)
    
    val process = supervisor.start(
        name = "my-api",
        command = listOf("java", "-jar", "app.jar"),
        workingDir = "/opt/myapp",
        env = mapOf("PORT" to "8080")
    )
    
    if (supervisor.isRunning("my-api")) "Service running (PID: ${process.pid})"
    else "Service failed to start"
}
```
