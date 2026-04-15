# Architecture Overview

This section describes how Koupper behaves as a runtime platform, not only as a CLI.

## Recommended reading order

1. [Script Execution Contract](/architecture/script-execution-contract)
2. [Annotations Reference](/architecture/annotations-reference)
3. [Script Execution Lifecycle](/architecture/script-execution-lifecycle)
4. [Runtime Topology](/architecture/runtime-topology)
5. [Provider Runtime Contract](/architecture/provider-runtime-contract)
6. [Local-first Scaffolding](/architecture/local-first-scaffolding)

## Scope

- Runtime request flow from CLI to Octopus.
- Deployment and execution boundaries.
- How providers are registered and consumed in scripts.
- How module templates resolve in local-first mode.

## Architecture snapshot

```text
CLI Commands -> Octopus Runtime -> Module/Scripts -> Provider Contracts -> External Systems
```
