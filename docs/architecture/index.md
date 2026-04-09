# Architecture Overview

This section describes how Koupper behaves as a runtime platform, not only as a CLI.

## Recommended reading order

1. [Script Execution Lifecycle](/architecture/script-execution-lifecycle)
2. [Script Execution Contract](/architecture/script-execution-contract)
3. [Runtime Topology](/architecture/runtime-topology)
4. [Provider Runtime Contract](/architecture/provider-runtime-contract)
5. [Local-first Scaffolding](/architecture/local-first-scaffolding)

## Scope

- Runtime request flow from CLI to Octopus.
- Deployment and execution boundaries.
- How providers are registered and consumed in scripts.
- How module templates resolve in local-first mode.

![Architecture map placeholder](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80)

Prompt for final diagram image:

`Create a clean technical architecture diagram for Koupper with five layers: CLI Commands, Octopus Runtime, Module Runtime, Provider Contracts, External Systems. Use directional arrows, soft blue palette, dark/light friendly background, no vendor logos, and labels: run/new/module/job/deploy/provider, request correlation, auth/checksum, provider bindings, and outbound integrations.`
