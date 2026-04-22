# Getting Started

This guide gets Koupper running quickly with the current local-first scaffolding flow.

## What you get with Koupper

- local-first scaffolding with Kotlin-native scripts
- runtime daemon model (Octopus) for consistent execution
- provider catalog for infra/API integrations (GitHub, Docker, SSH, n8n, MCP, and more)
- deploy + production hardening path without changing your script model

## 1) Clone and install

Prerequisites:

- Java 17 available on your `PATH`
- Kotlin compiler (`kotlinc`) available on your `PATH`
- Git available on your `PATH` (used by installer only when CLI cache is missing)

```bash
git clone https://github.com/koupper-jvm/koupper.git
cd koupper
kotlinc -script install.kts -- --force
```

Windows PowerShell:

```powershell
git clone https://github.com/koupper-jvm/koupper.git
cd koupper
kotlinc -script install.kts -- --force
```

Health check:

```bash
kotlinc -script install.kts -- --doctor
```

```powershell
kotlinc -script install.kts -- --doctor
```

If the doctor reports failures, run install again with `--force`.

On first install, if local `koupper-cli` source is not present, the installer automatically fetches it into `~/.koupper/cache/koupper-cli`.

Installer output provisions:

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
