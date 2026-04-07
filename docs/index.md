---
layout: home
title: Koupper Documentation
titleTemplate: Koupper Docs

hero:
  name: "Koupper"
  text: "Production scripting for Kotlin teams"
  tagline: "Ship automation, workers, and runtime routes with a local-first CLI, an Octopus daemon, and a provider catalog designed for real operations."
  image:
    src: /koupper-logo.svg
    alt: Koupper logo
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Command Reference
      link: /commands/
    - theme: alt
      text: Provider Catalog
      link: /providers/
    - theme: alt
      text: GitHub
      link: https://github.com/koupper-jvm/koupper

features:
  - title: Local-first scaffolding
    details: Create scripts and modules without mandatory remote template downloads. Resolve versioned templates locally for reproducible project bootstrap.
  - title: Runtime/CLI split
    details: Keep command UX fast while Octopus handles execution, correlation IDs, auth, and protocol compatibility behind the scenes.
  - title: Provider-first integrations
    details: Use built-in providers for data, infra, AI, GitHub, Docker, SSH, notifications, secrets, and runtime routing from the same script runtime.
  - title: Production guardrails
    details: Deploy with auth + checksum verification, size limits, CI-aware release routines, and explicit hardening playbooks.
  - title: Operations visibility
    details: Collect execution logs and JSONL metrics, inspect workers/jobs, and wire observability + queue operations for safer iterative delivery.
  - title: Kotlin-native ergonomics
    details: Keep code expressive and type-safe while still moving quickly through `new`, `run`, `job`, `module`, and `deploy` workflows.
---

## The documentation path

- Start with [Getting Started](/getting-started) and validate your environment with [Quick Smoke](/examples/quick-smoke).
- Learn core command workflows in [Command Overview](/commands/) and then jump into specific command pages.
- Explore integration capabilities in [Providers](/providers/) and wire only the providers your module needs.
- Move to [Production Hardening](/production/hardening) and [Release Workflow](/production/release-workflow) when you prepare CI and deployment.

## Typical journey

```bash
koupper new module name="ops-demo",version="1.0.0",package="demo.ops",template="jobs"
cd ops-demo
koupper run extensions/hello-world.kts
koupper provider list
koupper deploy
```
