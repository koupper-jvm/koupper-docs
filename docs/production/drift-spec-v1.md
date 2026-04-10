# Drift Spec v1

Versioned preflight/drift contract for `koupper infra drift`.

## Version

- `version`: `"1"`

## Modes

- `required_only`: all expected checks must exist in observed state.
- `exact_match`: expected checks must exist and no extras are allowed.

## Shape

```json
{
  "version": "1",
  "mode": "required_only",
  "checks": {
    "dynamo": {
      "tables": [
        { "name": "users", "gsis": ["email-index"] }
      ]
    },
    "api": {
      "routes": [
        { "path": "/health", "method": "GET", "stage": "prod" }
      ]
    },
    "lambda": {
      "aliases": [
        { "function": "worker", "name": "live", "env": { "RUNTIME": "prod" } }
      ]
    },
    "sqs": {
      "queues": [
        { "name": "jobs", "dlq": "jobs-dlq", "redrive": "maxReceive=5", "policy": "default" }
      ]
    },
    "workers": {
      "health": [
        { "name": "jobs-worker", "url": "https://example.com/health", "eventSourceMapping": "jobs" }
      ]
    }
  }
}
```

## Usage

```bash
koupper infra drift --dir=infra --spec=drift-spec.json --observed-file=observed.json --json
```
