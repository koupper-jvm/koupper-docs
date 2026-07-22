# Inference Engine (Sidecar)

The **Inference Engine** is the bridge between Koupper's Kotlin runtime and the high-performance C++ world of local LLMs. It uses a **Sidecar Pattern** to manage the lifecycle of external binaries like `llama.cpp`.

## The Sidecar Pattern

Instead of embedding the LLM directly into the JVM (which would be inefficient and unstable), Koupper launches a dedicated process manager. This manager is responsible for:
- Invoking the `llama-cli` or `llama-server` binary.
- Handling I/O pipes (stdout/stderr).
- Enforcing resource limits (OOM protection).
- Providing a clean shutdown signal.

## Direct Hardware Connection

The Sidecar dynamically builds the execution command based on your `AgentBudget`:
- **Threads (`-t`)**: Automatically mapped to the host's physical cores.
- **GPU Layers (`-ngl`)**: Configured based on the detected hardware tier.
- **Strict One-Shot**: Optimized for non-interactive execution to ensure deterministic results.

## Configuration

You can point Koupper to your local model and binary using environment variables or a `.env` file:

```bash
# Path to your llama.cpp CLI or Server binary
export KOUPPER_LLM_EXECUTABLE="/usr/local/bin/llama-cli"

# Path to your GGUF model file
export KOUPPER_LLM_MODEL_PATH="/models/qwen2.5-3b-instruct.gguf"
```

## Resilience

The Inference Engine is designed for stability:
- **Synchronous Execution**: Prevents deadlocks during script evaluation.
- **Timeouts**: Every inference task has a hard OS-level timeout. If the model hangs, Koupper kills the process and releases the hardware semaphore.
- **Buffered Output**: To avoid vertical logging noise, tokens are collected and streamed in blocks compatible with the Koupper logger.

---

[Next: Control Plane (API)](./control-plane)
