# Agentic Core Overview

Koupper has evolved from a powerful scripting runtime into an **AI-Native Automation Framework**. The **Agentic Core** is a built-in suite of providers and orchestration logic designed to run autonomous agents 100% locally, respecting your hardware constraints and providing a deterministic, type-safe development experience.

## The 3 Pillars of Koupper Agents

1. **Hardware Awareness**: Before thinking, Koupper "feels" the machine. It audits CPU instructions (AVX-512, AVX2), RAM, and GPU availability to calculate an elastic `AgentBudget`.
2. **Strict Boundaries**: We don't just "chat" with LLMs. Every agent task is governed by a Kotlin Data Class contract. If the model hallucinates or breaks the schema, the framework intercepts it at the boundary.
3. **Native Autonomy**: Agents aren't isolated. They have direct access to the entire suite of Koupper Service Providers (HTTP, DB, K8s, Docker) via the **ReAct loop** and **MCP integration**.

## High-Level Architecture

The Agentic Core consists of several interconnected components:

- **Environment Profiler**: The sensory system that detects physical limits.
- **Inference Bridge (Sidecar)**: The connection to local LLM binaries (like `llama.cpp`).
- **Agent Orchestrator**: The "brain" that manages task queues, state machines, and hardware semaphores.
- **Agent DSL**: A declarative Kotlin DSL for defining complex agent behaviors in a few lines of code.
- **Control Plane**: A built-in REST API with SSE support for remote monitoring and UI integration.

## Why Local-First Agents?

- **Privacy**: Your data never leaves your infrastructure.
- **Speed**: Zero latency from cloud providers.
- **Cost**: Leverage your existing hardware (optimized for modern CPUs with AVX-512).
- **Control**: Total ownership of the model and the execution lifecycle.

---

[Next: The Agent DSL](./agent-dsl)
