# Getting Started

This guide gets Koupper running quickly with the current local-first scaffolding flow.

## What you get with Koupper

- local-first scaffolding with Kotlin-native scripts
- runtime daemon model (Octopus) for consistent execution
- provider catalog for infra/API integrations (GitHub, Docker, SSH, n8n, MCP, and more)
- deploy + production hardening path without changing your script model

## 1) Clone and install

```bash
git clone https://github.com/koupper-jvm/koupper.git
cd koupper
kotlinc -script install.kts
```

Installer output provisions:

- `~/.koupper/bin`
- `~/.koupper/libs`
- `~/.koupper/templates/model-project`

## 2) Verify CLI

```bash
koupper --help
koupper run examples/hello-world.kts "Dev"
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
