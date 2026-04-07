# Runtime Topology

Koupper is split into command surface and runtime engine.

## Topology components

- **CLI Layer**: user-facing command surface (`new`, `run`, `module`, `job`, `deploy`, `provider`).
- **Octopus Runtime**: request router, execution coordinator, and protocol boundary.
- **Module Runtime**: generated project structure and script handlers.
- **Provider Layer**: infrastructure/service integrations resolved through provider contracts.
- **External Systems**: databases, queues, cloud APIs, GitHub, SSH targets, etc.

## Boundaries and responsibilities

- CLI handles command parsing and local command intent.
- Octopus enforces execution protocol, auth-aware flows, and deploy guardrails.
- Modules keep business scripts and runtime-specific code.
- Providers isolate integration logic and env-based configuration.

## Operational implications

- You can evolve command UX without rewriting runtime internals.
- You can replace provider implementations without changing call sites.
- You can harden deploy/runtime paths independently from module business logic.

![Runtime topology placeholder](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80)

Prompt for final diagram image:

`Design a runtime topology diagram for Koupper with components: CLI Layer, Octopus Runtime, Module Runtime, Provider Layer, External Systems. Add clear boundaries, arrows for request/response flow, and labels for auth-aware deploy, provider resolution, and environment-based configuration.`
