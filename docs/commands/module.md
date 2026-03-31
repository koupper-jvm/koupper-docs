# `koupper module`

Inspect module structure and evolve existing projects.

## Analyze module

```bash
koupper module demo-script
```

This reports module details, script artifacts, and detected runtime dependencies.

Handler analysis includes both `KHandler` implementations and AWS `RequestHandler` implementations found under `handlers` source directories, with separate counts in the module summary.

During analysis, Koupper also validates exported scripts (for example `init.kts`, worker scripts, and extension scripts). If a script depends on types that are not imported or not available in the current classpath, you will see `[ScriptingHost][ERROR]` diagnostics with line and column references.

Common case:

- `Unresolved reference: ModuleProcessor` in `init.kts` means the script is using `ModuleProcessor` without importing `com.koupper.octopus.process.ModuleProcessor`.

These diagnostics are script-validation feedback. They do not always block controller discovery, but they indicate scripts that should be fixed before running jobs or setup flows.

## Add scripts to existing module

```bash
koupper module add-scripts name="demo-script" --script-inclusive "extensions/sample.kts"
```

Wildcard import:

```bash
koupper module add-scripts name="demo-script" --script-wildcard-inclusive "extensions/*.kts"
```

Overwrite behavior:

- default: existing files are skipped
- explicit replace: add `--overwrite`

```bash
koupper module add-scripts name="demo-script" --script-inclusive "extensions/sample.kts" --overwrite
```
