# agent Provider

The **agent** provider is the primary interface for Koupper's Agentic Core. It provides the DSL, orchestration, and hardware-aware inference capabilities needed to build autonomous local agents.

## Usage

To use the agent provider, you typically use the `agent { ... }` DSL in your scripts.

```kotlin
import com.koupper.providers.agent.*

@Export
fun setup() = agent {
    name = "my-agent"
    // ... config
    task<MyResult> {
        prompt = "Do something useful"
    }
}
```

## Key Components

### EnvironmentProfiler
Automatically audits the host hardware (CPU, RAM, AVX-512) to calculate the execution budget.

### AgentOrchestrator
Manages the lifecycle of agents, ensuring they stay within hardware limits and handling the ReAct (Reason, Act, Observe) loop.

### InferenceEngine (Sidecar)
Manages local LLM execution via `llama.cpp` binaries, providing reactive token streaming and OOM protection.

## Configuration

The provider can be configured via environment variables:

- `KOUPPER_LLM_EXECUTABLE`: Path to the `llama-cli` or `llama-server` binary.
- `KOUPPER_LLM_MODEL_PATH`: Path to the `.gguf` model file.

## Why it matters
The agent provider allows you to move from simple automation scripts to complex, decision-making autonomous workers without leaving the Koupper ecosystem or relying on external cloud APIs.

---

[Back to Catalog](./)
