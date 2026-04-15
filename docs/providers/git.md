# Git Provider

`git` provides local repository automation with safe defaults.

## Service provider

- `GitServiceProvider`

## Contract and implementations

- `GitClient` -> `GitCliClient`

## Result contract

All operations return `GitCommandResult`. Never throws on timeout or launch failure.

```kotlin
data class GitCommandResult(
    val command: String,
    val exitCode: Int,
    val stdout: String,
    val stderr: String,
    val timedOut: Boolean = false  // true when the process exceeded GIT_TIMEOUT_SECONDS
)
```

Check `timedOut` instead of catching exceptions:

```kotlin
val result = git.status("/path/to/repo")
if (result.timedOut) { /* handle timeout */ }
if (result.exitCode != 0) { /* handle failure */ }
```

## Environment variables

- `GIT_COMMAND` (optional)
- `GIT_TIMEOUT_SECONDS` (optional)

## CLI discovery

```bash
koupper provider info git
```
