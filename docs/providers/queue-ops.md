# Queue Ops Provider

`queue-ops` manages pending, requeue, and dead-letter queue workflows with a local backend.

## Service provider

- `QueueOpsServiceProvider`

## Contract and implementations

- `QueueOpsProvider` -> `LocalQueueOpsProvider`

## Environment variables

- `QUEUE_OPS_STORE_FILE` (optional)

## CLI discovery

```bash
koupper provider info queue-ops
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.queueops.QueueOpsProvider
import com.koupper.container.app

@Export
val inspectQueues: () -> Map<String, Int> = {
    val queues = app.getInstance(QueueOpsProvider::class)
    
    mapOf(
        "pending" to queues.pendingCount("default"),
        "failed" to queues.failedCount("default"),
        "dead" to queues.deadLetterCount("default")
    )
}
```
