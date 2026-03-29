---
layout: home
title: Koupper Documentation
titleTemplate: Koupper Docs

hero:
  name: "Koupper"
  text: "Production-ready Kotlin scripting runtime"
  tagline: "Build, run, deploy, and evolve script-driven services with a local-first CLI + Octopus runtime architecture."
  image:
    src: /koupper-logo.svg
    alt: Koupper logo
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Command Reference
      link: /commands/run
    - theme: alt
      text: GitHub
      link: https://github.com/koupper-jvm/koupper

features:
  - title: Local-first Module Scaffolding
    details: Create modules without mandatory remote template downloads. Versioned templates are resolved locally and remain reproducible.
  - title: Octopus Runtime + CLI Split
    details: Keep command UX fast while running scripts through a hardened daemon with request correlation, auth, and protocol stability.
  - title: Script-to-Production Flow
    details: Move from `new` to `run` to `deploy`, then evolve existing modules with `module add-scripts` and smoke-tested workflows.
  - title: Security by Default
    details: Token-gated deploy, payload checksum validation, size guardrails, and production hardening guidance are first-class.
  - title: Observable and Testable
    details: Socket integration tests, protocol tests, and release discipline keep reliability high across iterative feature delivery.
  - title: Kotlin-native Experience
    details: Keep scripts expressive, type-safe, and composable while integrating jobs, pipelines, and module-based architectures.
---

## Why Koupper

Koupper is built for teams that want to keep Kotlin scripting simple in development and predictable in production.

- Use `koupper new module` to scaffold projects quickly.
- Run scripts through a socket protocol with request correlation and fallback compatibility.
- Deploy with auth + checksum safeguards.
- Keep modules maintainable with explicit add-scripts workflows and non-destructive defaults.

Start with the [Getting Started](/getting-started) guide and then run the [Quick Smoke](/examples/quick-smoke) checklist.
