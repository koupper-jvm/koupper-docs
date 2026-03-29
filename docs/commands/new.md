# `koupper new`

Create scripts or scaffolded modules.

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
