# `command-runner` Provider

`command-runner` executes shell or binary commands through a single provider contract, so scripts avoid ad-hoc `ProcessBuilder` duplication.

Service provider class: `CommandRunnerServiceProvider`  
Contract: `CommandRunner`

## Capabilities

- Execute shell commands (`shellCommand`) cross-platform.
- Execute binary + args (`executable` + `args`).
- Dry-run mode with safe command preview.
- Timeout control per request.
- Optional value masking in printed command text.

## Environment variables

- `COMMAND_RUNNER_TIMEOUT_SECONDS` (optional, default `300`)
- `COMMAND_RUNNER_SHELL_WINDOWS` (optional, default `pwsh`)
- `COMMAND_RUNNER_SHELL_UNIX` (optional, default `bash`)

## Resolve from container

```kotlin
import com.koupper.container.app
import com.koupper.providers.command.CommandRunner

val runner = app.getInstance(CommandRunner::class)
```

## Shell command example

```kotlin
import com.koupper.providers.command.CommandRunRequest

val result = runner.run(
    CommandRunRequest(
        shellCommand = "echo hello",
        timeoutSeconds = 30
    )
)
```

## Binary command example

```kotlin
val result = runner.runChecked(
    CommandRunRequest(
        executable = "git",
        args = listOf("status", "--short"),
        workingDirectory = "."
    )
)
```

## Request rules

- Provide exactly one command mode:
  - `shellCommand`, or
  - `executable` + `args`
- `runChecked` throws if exit code is non-zero.

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.command.CommandRunner
import com.koupper.container.app

@Export
val runBuild: () -> String = {
    val runner = app.getInstance(CommandRunner::class)
    
    val result = runner.shellCommand(
        command = "npm run build",
        workingDir = "/path/to/project",
        timeoutSeconds = 120,
        dryRun = false
    )
    
    if (result.exitCode != 0) "[ERR] Build failed: ${result.stderr}"
    else "Build succeeded in ${result.durationMs}ms"
}
```
