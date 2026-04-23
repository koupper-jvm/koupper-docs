# Troubleshooting

## `new module` fails with missing `settings.gradle`

Symptoms:

- `FileNotFoundException: <module>/settings.gradle`

Fix:

```bash
kotlinc -script install-standalone.kts -- --force
kotlinc -script install-standalone.kts -- --doctor
```

Windows PowerShell:

```powershell
kotlinc -script .\install-standalone.kts -- --force
kotlinc -script .\install-standalone.kts -- --doctor
```

This refreshes local jars/templates and validates installation health.
If you are using source/developer install from a cloned repo, use `install.kts` instead.

## `module` fails with `.../.koupper/helpers/list.kts`

Symptoms:

- `FileNotFoundException: C:\Users\<user>\.koupper\helpers\list.kts`

Cause:

- Your local `~/.koupper/helpers` directory is missing while running an older installed CLI/runtime layout.

Fix now:

```bash
mkdir -p "$HOME/.koupper/helpers" "$HOME/.koupper/logs"
koupper module demo-script
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.koupper\helpers" | Out-Null
New-Item -ItemType Directory -Force "$env:USERPROFILE\.koupper\logs" | Out-Null
koupper module demo-script
```

Then reinstall with force so future local state is complete:

```bash
kotlinc -script install-standalone.kts -- --force
kotlinc -script install-standalone.kts -- --doctor
```

## `job run-worker` shows `argument type mismatch`

Fix checklist:

1. Update and reinstall latest local binaries.
2. Run worker from module root.
3. Ensure queued task source points to current script path.

```bash
git checkout develop && git pull --ff-only origin develop
kotlinc -script install.kts -- --force
cd demo-jobs
koupper job run-worker
```

## JSON parsing issues in terminal

Prefer file mode:

```bash
koupper run examples/cli-report-generator.kts --json-file examples/cli-report-generator.input.json
```

## Verify local install quickly

```bash
kotlinc -script install-standalone.kts -- --doctor
```

Windows PowerShell:

```powershell
kotlinc -script .\install-standalone.kts -- --doctor
```

`doctor` checks jars, bin shims, helpers/logs directories, and local scaffolding template provisioning.
