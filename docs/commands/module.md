# `koupper module`

Inspect module structure and evolve existing projects.

## Usage

```bash
koupper module [moduleName]
koupper module add-scripts name="demo" [package="demo.app"] [--overwrite] <script import flags>
```

Run from the module root, or pass a module directory name when you are elsewhere in the workspace.

## Analyze a module

```bash
koupper module my-app
```

From the module directory:

```bash
cd my-app
koupper module
```

### What it reports

`koupper module` prints a module summary focused on V7 Gradle apps that use `@Export` scripts and `RuntimeRouter` DSL routes.

| Section | What you see |
| --- | --- |
| **Module metadata** | Target path, module type, version, base package |
| **Octopus / engine** | Detected from `build.gradle(.kts)` Maven coordinates **or** `libs/octopus-*.jar` |
| **Exports (`@Export`)** | Script entrypoints annotated with `@Export` (for example `init.kts`, worker scripts) |
| **Routes (V7)** | HTTP routes registered through `RuntimeRouter` / DSL (`GET /health`, `POST /newsletter`, etc.) |
| **Scripts / workers** | `.kts` artifacts under the module tree, including `init.kts`, extensions, and job scripts |
| **Legacy handlers** | Secondary scan for older `KHandler` and AWS `RequestHandler` classes under `handlers/` |

Example sections from a healthy V7 module:

```text
📦 Octopus dependency: octopus-7.2.0 (build.gradle)

📦 Module Setup Info:
  - Target        : /path/to/my-app
  - Version       : 1.0.0
  - Base package  : com.example.app
  - Octopus       : com.koupper:octopus:7.2.0 (build.gradle)

  - Routes (V7)  :
      GET  /health
      POST /newsletter

  - Exports (@Export):
      init.kts  (setup) -> Unit
      worker.kts (processJob) -> String

  - Legacy handlers: —
      • KHandler impls           : 0
      • AWS RequestHandler impls : 0
```

> **Tip:** After changing routes or compiled handlers, rebuild the module JAR (`./gradlew build` or your usual packaging step) so `koupper module` and runtime routing stay in sync.

### Legacy modules

Older modules may still expose Jersey controllers or handler classes instead of V7 router DSL routes. In that case you may see:

- **Legacy handlers** counts under `handlers/` source directories
- Jersey controller listings when `controllers.json` is present
- A note that `.http.json` / `.http.yml` contracts are optional for V7 `RuntimeRouter` apps

V7 route and export discovery is primary; legacy handler analysis is secondary and kept for backward compatibility.

### Script validation

During analysis, Koupper validates exported scripts (for example `init.kts`, worker scripts, and extension scripts). If a script depends on types that are not imported or not available in the current classpath, you will see `[ScriptingHost][ERROR]` diagnostics with line and column references.

When validation fails, Koupper prints the failing script filename before compiler diagnostics (for example: `[ScriptingHost][ERROR] Script failed: init.kts`).

Common case:

- `Unresolved reference: ModuleProcessor` in `init.kts` means the script uses `ModuleProcessor` without importing `com.koupper.octopus.process.ModuleProcessor`.

These diagnostics are script-validation feedback. They do not always block route or export discovery, but they indicate scripts that should be fixed before running jobs or setup flows.

**Troubleshooting:** when you see `[ScriptingHost][ERROR]`, verify missing imports and script-visible types in the failing `.kts` file first.

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

## Script import flags

| Flag | Mode | Behavior |
| --- | --- | --- |
| `-si`, `--script-inclusive` | inclusive | Keeps relative path under module `extensions/`. |
| `-se`, `--script-exclusive` | exclusive | Copies file into module `extensions/` root. |
| `-swi`, `--script-wildcard-inclusive` | inclusive wildcard | Imports all matching scripts preserving subfolders. |
| `-swe`, `--script-wildcard-exclusive` | exclusive wildcard | Imports all matching scripts flattened into root. |
