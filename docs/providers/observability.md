# Observability Provider

`observability` collects metrics, events, and traces using a local JSONL sink backend.

## Service provider

- `ObservabilityServiceProvider`

## Contract and implementations

- `ObservabilityProvider` -> `LocalObservabilityProvider`

## Runtime integration

`ObservabilityProvider` is wired into the Octopus execution monitor chain. Every script execution automatically emits:

- `script.execution` trace with `exportId`, `kind`, `scriptPath`, `status`, and `durationMs`
- `script.execution.durationMs` metric tagged by `kind` and `status`
- `script.execution.failed` event with `error` and `durationMs` on failure

This happens without any configuration in the script itself. If the provider is not bound in the container, the monitor is a no-op.

## Environment variables

- `OBSERVABILITY_SINK_FILE` (optional)

## CLI discovery

```bash
koupper provider info observability
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.observability.ObservabilityProvider
import com.koupper.container.app

@Export
val trackDeploy: () -> String = {
    val obs = app.getInstance(ObservabilityProvider::class)
    
    obs.emitEvent("deploy.started", mapOf("version" to "2.3.1"))
    // ... deployment logic ...
    obs.emitMetric("deploy.duration", 45000, mapOf("status" to "ok"))
    obs.emitEvent("deploy.completed", mapOf("version" to "2.3.1"))
    
    "Metrics emitted"
}
```
