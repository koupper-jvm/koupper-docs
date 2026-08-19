# Getting Started

> Current community release: **v7.2.1** ([GitHub Release](https://github.com/koupper-jvm/koupper/releases/tag/v7.2.1)).
> Install publishes `com.koupper:octopus-api` to **mavenLocal** for Gradle modules. Re-run with `--force` to upgrade.
>
> **Distribution:** GitHub Releases + mavenLocal. Koupper is **not** on Maven Central.

This guide gets Koupper running quickly with the current local-first scaffolding flow.

## What you get with Koupper

- local-first scaffolding with Kotlin-native scripts
- runtime daemon model (Octopus) for consistent execution
- provider catalog for infra/API integrations (GitHub, Docker, SSH, n8n, MCP, and more)
- deploy + production hardening path without changing your script model

## 1) Install Koupper

### Prerequisites

- **Java 17+** (`java -version`)
- **Kotlin compiler** (`kotlinc -version`) — required to run `install-standalone.kts`
- ~350 MB free disk for `octopus.jar`

### Option A: End users (standalone, no repo clone)

Same command for **first install** and **upgrade** — `--force` replaces runtime jars and republishes `octopus-api` to mavenLocal:

```bash
curl -L -o install-standalone.kts https://github.com/koupper-jvm/koupper/releases/latest/download/install-standalone.kts
kotlinc -script install-standalone.kts -- --force
```

Windows PowerShell:

```powershell
Invoke-WebRequest -Uri "https://github.com/koupper-jvm/koupper/releases/latest/download/install-standalone.kts" -OutFile "install-standalone.kts"
kotlinc -script .\install-standalone.kts -- --force
```

Then verify:

```bash
koupper -v
kotlinc -script install-standalone.kts -- --doctor
```

```powershell
koupper -v
kotlinc -script .\install-standalone.kts -- --doctor
```

If you are on an older release and `koupper module <name>` fails with
`FileNotFoundException: .../.koupper/helpers/list.kts`, create missing runtime folders once:

```bash
mkdir -p "$HOME/.koupper/helpers" "$HOME/.koupper/logs"
```

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.koupper\helpers" | Out-Null
New-Item -ItemType Directory -Force "$env:USERPROFILE\.koupper\logs" | Out-Null
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

The bootstrap script clones/updates all required repositories (`koupper`, `koupper-cli`, `koupper-docs`) and runs install + doctor automatically.

Health check (from workspace root):

```bash
kotlinc -script install-workspace.kts -- --doctor
```

```powershell
kotlinc -script .\install-workspace.kts -- --doctor
```

If the doctor reports failures, run install again with `--force`.

Both installers provision:

- `~/.koupper/bin`
- `~/.koupper/libs` — fat **runtime** `octopus.jar` (daemon / `koupper run`)
- `~/.koupper/helpers`
- `~/.koupper/logs`
- `~/.koupper/templates/model-project`
- `~/.koupper/catalog/providers.json`
- **mavenLocal** — light **`com.koupper:octopus-api:<version>`** for compiling modules (not the fat jar)

### Using Octopus from a Gradle module

After install (v7.2.1+):

```gradle
repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation("com.koupper:octopus-api:7.2.1")
}
```

Do **not** put `~/.koupper/libs/octopus.jar` on the compile classpath — that fat jar is only for the OS-level daemon.

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

## Contributing

Want to improve the framework or the docs?

| Change | Branch from | Merge path | How it ships |
|--------|-------------|------------|--------------|
| Engine / CLI | `develop` | PR → `develop` | Maintainer tags `vX.Y.Z` on [koupper](https://github.com/koupper-jvm/koupper) |
| Docs (this site) | `develop` | PR → `develop`, then `develop` → `main` | Push to `main` auto-deploys here |

Full guide: [CONTRIBUTING.md](https://github.com/koupper-jvm/koupper/blob/develop/CONTRIBUTING.md) in the engine repo.
