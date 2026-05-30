# Hardware Profiler & Budgeting

Local-first AI demands a deep understanding of the underlying hardware. Koupper doesn't just blindly launch LLMs; it performs a surgical audit of the host machine to ensure stability and performance.

## Universal Telemetry

The **Environment Profiler** probes the Linux kernel (`/proc` and `/sys`) to detect:
- **Physical Cores vs. Logical Processors**: Crucial for mapping the optimal number of inference threads.
- **RAM Performance**: Detects total and free RAM to calculate safe concurrency limits.
- **Instruction Sets**: Specifically looks for **AVX-512 VNNI** and **AVX2**, which drastically speed up CPU-based inference.
- **Fast Storage**: Detects **NVMe** drives to prioritize fast model loading.
- **GPU Availability**: Checks for NVIDIA drivers and `nvidia-smi` to scale into high-performance tiers.

## The Agent Budget

Based on the detected telemetry, Koupper calculates an elastic `AgentBudget`. This budget acts as a global semaphore for the entire framework.

### Hardware Tiers
1. **LOW_END**: Basic machines (e.g., Raspberry Pi or old laptops). Limited to 1 agent.
2. **CPU_OPTIMIZED**: Modern workstations with AVX-512. Scales concurrency based on available RAM.
3. **GPU_ACCELERATED**: High-end servers with dedicated graphics. Offloads the heavy lifting to CUDA.

### Concurrency Heuristics
By default, Koupper reserves **70% of the free RAM** for agents, assuming a baseline of **3GB per 3B model instance**. This ensures that the operating system and the Koupper runtime itself remain responsive during heavy inference loads.

## The "Kill Switch"

To prevent system crashes, Koupper will refuse to initialize the Agentic Core if the environment is too hostile.
- **Minimum RAM**: 4GB.
- **Minimum Support**: Must have at least AVX2 or a compatible GPU.

If these requirements are not met, the framework will throw an explicit `IllegalStateException` during bootstrap, notifying the user of the hardware limitation.

---

[Next: Inference Engine (Sidecar)](./inference-engine)
