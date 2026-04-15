# Local-first Scaffolding

Koupper module generation uses a local-first template strategy so scaffold behavior stays deterministic in dev and CI.

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
- safer migration between module templates and runtime versions

## Optional explicit overrides

```bash
export MODEL_BACK_PROJECT_PATH="/abs/path/to/model-project"
export OPTIMIZED_PROCESS_MANAGER_PATH="/abs/path/to/octopus.jar"
```

## Validation checklist

- Run `koupper new module ...` without network access and confirm scaffold success.
- Verify generated module includes expected Gradle and source structure.
- Run `koupper run` from module context to validate runtime compatibility.

![Local-first scaffolding placeholder](https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80)

Prompt for final diagram image:

`Create a decision-tree diagram for Koupper local-first scaffolding resolution order. Branches: MODEL_BACK_PROJECT_PATH -> templates/model-project -> ~/.koupper/templates/model-project -> MODEL_BACK_PROJECT_URL. Second tree: OPTIMIZED_PROCESS_MANAGER_PATH -> local libs -> OPTIMIZED_PROCESS_MANAGER_URL. Add emphasis on deterministic CI/offline behavior.`
