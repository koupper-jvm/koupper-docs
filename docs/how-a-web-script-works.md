---
title: How a Web Script Works?
description: Learn how Koupper executes scripts through Octopus in local and service contexts.
---

Koupper scripts execute through the same runtime contract whether they are called locally or through a service host.

## Execution flow overview

![Web Script Diagram](/hawsw.svg)

- A script encapsulates business behavior behind an exported function.
- The runtime validates and resolves exported symbols.
- Inputs are normalized and mapped into the script call shape.
- Output is returned through a consistent response contract.

This keeps behavior stable across local runs and hosted environments.

## Octopus role

Octopus is the runtime engine behind script execution and socket processing. It provides:

- argument parsing and payload normalization,
- request/response protocol handling,
- auth checks for protected flows,
- deploy guardrails (hash and payload-size validation),
- process and session isolation behavior.

Octopus can run as:

- a daemon for CLI socket workflows,
- a dependency in generated module projects.

![Web Script Diagram](/octopus-diagram.svg)

Because the runtime path is shared, script behavior remains consistent between:

- `koupper run` local execution,
- module-level `createDefaultConfiguration()` calls,
- deployed execution contexts.

## Why this matters for microservice teams

Koupper lets teams evolve from script-first prototypes to production-ready modules without rewriting core logic. That reduces migration friction while preserving Kotlin-native type safety and explicit control over execution boundaries.
