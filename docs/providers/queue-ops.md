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
