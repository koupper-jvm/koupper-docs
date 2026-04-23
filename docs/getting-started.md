# Getting Started

This guide gets Koupper running quickly with the current local-first scaffolding flow.

## What you get with Koupper

- local-first scaffolding with Kotlin-native scripts
- runtime daemon model (Octopus) for consistent execution
- provider catalog for infra/API integrations (GitHub, Docker, SSH, n8n, MCP, and more)
- deploy + production hardening path without changing your script model

## 1) Install Koupper

Prerequisites:

- Java 17 available on your `PATH`
- Kotlin compiler (`kotlinc`) available on your `PATH`

### Option A: End users (standalone, no repo clone)

```bash
curl -L -o install-standalone.kts https://github.com/koupper-jvm/koupper/releases/latest/download/install-standalone.kts
kotlinc -script install-standalone.kts -- --force
```

Windows PowerShell:

```powershell
Invoke-WebRequest -Uri "https://github.com/koupper-jvm/koupper/releases/latest/download/install-standalone.kts" -OutFile "install-standalone.kts"
kotlinc -script .\install-standalone.kts -- --force
```

Health check:

```bash
kotlinc -script install-standalone.kts -- --doctor
```

```powershell
kotlinc -script .\install-standalone.kts -- --doctor
```

### Option B: Developers/maintainers (full workspace)

Use this when you maintain release automation, docs, and CLI/runtime together.

```bash
git clone https://github.com/koupper-jvm/koupper-workspace.git "koupper workspace"
cd "koupper workspace"
bash ./scripts/setup/workspace-bootstrap.sh --workspace "$(pwd)" --pull
```

```powershell
git clone https://github.com/koupper-jvm/koupper-workspace.git "koupper workspace"
cd "koupper workspace"
./scripts/setup/workspace-bootstrap.ps1 -Workspace (Get-Location).Path -Pull
```

The bootstrap script clones/updates all required repositories (`koupper-workspace`, `koupper`, `koupper-cli`, `koupper-document`) and runs install + doctor automatically.

Health check:

```bash
kotlinc -script install.kts -- --doctor
```

```powershell
kotlinc -script .\install.kts -- --doctor
```

If the doctor reports failures, run install again with `--force`.

Both installers provision:

- `~/.koupper/bin`
- `~/.koupper/libs`
- `~/.koupper/templates/model-project`
- `~/.koupper/catalog/providers.json`

## 2) Verify CLI

```bash
koupper -v
koupper --help
koupper provider list
```

## 3) Generate your first module

```bash
koupper new module name="demo-script",version="1.0.0",package="demo.script"
```

Then inspect module details:

```bash
koupper module demo-script
```

Run jobs and deploy flows later from the same command surface:

```bash
koupper job list
koupper deploy examples/hello-world.kts "10.0.0.50"
```

## 4) Add scripts later without destructive overwrite

```bash
koupper module add-scripts name="demo-script" --script-inclusive "extensions/sample.kts"
```

Use `--overwrite` only when you intentionally want to replace existing files.

## 5) Optional runtime overrides

```bash
export KOUPPER_OCTOPUS_HOST="127.0.0.1"
export KOUPPER_OCTOPUS_PORT="9998"
export KOUPPER_OCTOPUS_TOKEN="your-token"
```

## Next

- [Quick Smoke](/examples/quick-smoke)
- [Examples Hub](/examples/)
- [`run` command](/commands/run)
- [`new` command](/commands/new)
- [`module` command](/commands/module)
- [Architecture Overview](/architecture/)
- [Provider Catalog](/providers/)
