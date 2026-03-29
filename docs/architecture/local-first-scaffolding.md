# Local-first Scaffolding

Koupper module generation now follows a local-first template strategy.

## Resolution order

Template source priority:

1. `MODEL_BACK_PROJECT_PATH` (explicit)
2. `templates/model-project` (repo-local)
3. `~/.koupper/templates/model-project` (installer-provisioned)
4. `MODEL_BACK_PROJECT_URL` (remote fallback)

Process manager jar priority:

1. `OPTIMIZED_PROCESS_MANAGER_PATH` (explicit)
2. local jars in `~/.koupper/libs` / project libs
3. `OPTIMIZED_PROCESS_MANAGER_URL` (remote fallback)

## Why this matters

- predictable scaffolding in offline and CI environments
- fewer remote dependencies in the core generation path
- versioned template evolution tracked in source control

## Optional explicit overrides

```bash
export MODEL_BACK_PROJECT_PATH="/abs/path/to/model-project"
export OPTIMIZED_PROCESS_MANAGER_PATH="/abs/path/to/octopus.jar"
```
