# Build Provider

Runs Gradle/npm builds and parses compiler output into structured errors for agent compile/fix/compile feedback loops.

## Contracts

| Contract | Implementation |
|---|---|
| `BuildProvider` | `GradleBuildProvider` |

## CLI Discovery

```bash
koupper provider info build
```
