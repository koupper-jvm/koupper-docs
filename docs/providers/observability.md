# Observability Provider

`observability` collects metrics, events, and traces using a local JSONL sink backend.

## Service provider

- `ObservabilityServiceProvider`

## Contract and implementations

- `ObservabilityProvider` -> `LocalObservabilityProvider`

## Environment variables

- `OBSERVABILITY_SINK_FILE` (optional)

## CLI discovery

```bash
koupper provider info observability
```
