# Script Execution Lifecycle

Koupper script execution follows one lifecycle regardless of whether it starts from local CLI, worker, or deployed runtime.

## Lifecycle stages

1. **Invocation**: command entry (`koupper run`, worker loop, or runtime route).
2. **Transport**: request is sent through the Octopus protocol (socket/runtime call).
3. **Resolution**: target script and exported symbol are validated.
4. **Binding**: params are normalized and mapped into expected call shape.
5. **Execution**: script runs with container-managed dependencies/providers.
6. **Response**: result/error is returned with consistent protocol semantics.

## Why this matters

- Same execution model between local dev and production-like flows.
- Lower migration cost from script prototypes to module deployments.
- Predictable error surfaces for troubleshooting and tests.

## Observability points

- execution logs in `~/.koupper/logs`
- execution metrics in `~/.koupper/logs/octopus-executions.jsonl`
- module analysis snapshots under `~/.koupper/helpers` when a command explicitly emits them

## Sequence sketch

```text
CLI/Worker/Route
  -> Octopus transport
  -> script + @Export resolution
  -> input binding (args/json)
  -> execution with providers
  -> response + logs + metrics
```
