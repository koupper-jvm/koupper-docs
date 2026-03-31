# `koupper module`

Inspect module structure and evolve existing projects.

## Analyze module

```bash
koupper module demo-script
```

This reports module details, script artifacts, and detected runtime dependencies.

Handler analysis includes both `KHandler` implementations and AWS `RequestHandler` implementations found under `handlers` source directories, with separate counts in the module summary.

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
