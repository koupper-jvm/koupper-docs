# Troubleshooting

## `new module` fails with missing `settings.gradle`

Symptoms:

- `FileNotFoundException: <module>/settings.gradle`

Fix:

```bash
kotlinc -script install.kts -- --force
kotlinc -script install.kts -- --doctor
```

Windows PowerShell:

```powershell
kotlinc -script install.kts -- --force
kotlinc -script install.kts -- --doctor
```

This refreshes local jars/templates and validates installation health.

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
kotlinc -script install.kts -- --doctor
```

Windows PowerShell:

```powershell
kotlinc -script install.kts -- --doctor
```

`doctor` checks jars, bin shims, and local scaffolding template provisioning.
