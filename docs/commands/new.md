# `koupper new`

Create scripts or scaffolded modules.

## Usage forms

```bash
koupper new <script-name.kts>
koupper new file:init
koupper new module name="demo",version="1.0.0",package="demo.app" [template="default|http|jobs|pipelines"] [type="script|job|pipeline"]
```

## Create a script file

```bash
koupper new my-script.kts
```

## Create a module

```bash
koupper new module name="demo",version="1.0.0",package="demo.app"
```

## Template-aware module generation

```bash
koupper new module name="jobs-demo",version="1.0.0",package="demo.jobs" template="jobs"
koupper new module name="pipe-demo",version="1.0.0",package="demo.pipe" template="pipelines"
```

Type can be inferred from template, or provided explicitly.

Accepted types and aliases:

- `script` / `scripts`
- `job` / `jobs`
- `pipeline` / `pipelines`

## Required module parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `name` | yes | Target module directory name. |
| `version` | yes | Semantic version for generated module metadata. |
| `package` | yes | Base Kotlin package for generated sources. |
| `template` | no | `default`, `http`, `jobs`, `pipelines`. |
| `type` | no | `script`, `job`, `pipeline` (aliases supported). |

## Include scripts during scaffold

```bash
koupper new module name="demo",version="1.0.0",package="demo.app" --script-inclusive "extensions/sample.kts"
koupper new module name="demo",version="1.0.0",package="demo.app" --script-wildcard-inclusive "extensions/*.kts"
```

Flags:

- `-si`, `--script-inclusive`
- `-se`, `--script-exclusive`
- `-swi`, `--script-wildcard-inclusive`
- `-swe`, `--script-wildcard-exclusive`

## Notes

- `koupper new module` creates local Gradle scaffold and starter scripts.
- If `.env` does not exist in current directory, Koupper creates it automatically.
