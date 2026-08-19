# Runtime architecture (v7 Engine)

From 7.0.0 onward, Octopus isolates script failures, streams logs, and reloads providers without restarting the daemon. The current community release is **7.2.1** (Runtime Router CORS DSL, compiled jobs, and `koupper module` DX).

## 1. Process sandboxing

Before v7, a script that called `System.exit(1)` could take down the whole Octopus daemon.

With `koupper.sandbox.enabled=true` (default in hardened installs), Octopus runs the entrypoint in a child JVM (`ProcessBuilder`) and captures stdout/stderr. If that JVM crashes or exits, the sandbox cancels the script and reports a sandbox failure. The parent daemon stays up for the next request.

## 2. Server-Sent Events (SSE)

The embedded Grizzly HTTP server streams logs in real time at `POST /api/v1/run-stream`.

`println(...)` from a long-running script is bridged onto the HTTP connection via `SessionStdoutBridge`, so UIs and CLI clients can follow the job as it runs instead of waiting for the final result.

## 3. Hot-reload of providers

`ServiceProviderManager` uses a process-wide `URLClassLoader`. Drop a new `.jar` into `~/.koupper/providers` and run `koupper reload` to rebuild the DI container. The daemon does not restart.

## 4. Hybrid metadata (KSP + reflection)

Compiled modules use **KSP** to emit `koupper-exports.json` at build time. That is the primary `@Export` source of truth.

Raw `.kts` files have no KSP metadata. For `koupper run` on an uncompiled script, Octopus compiles in memory and reads `KClass.functions` to find `@Export`. Regex is a fallback for dynamic scripts, not the primary path for compiled modules.
