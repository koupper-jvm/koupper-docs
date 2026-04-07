# Quick Smoke

Run this checklist after install or upgrade.

## 1) CLI responds

```bash
koupper --help
```

## 2) Basic run

```bash
koupper run examples/hello-world.kts "Smoke"
```

## 3) JSON inline

```bash
koupper run examples/cli-report-generator.kts '{"reportName":"Q3","region":"Global","items":[{"name":"License","value":99.0}]}'
```

## 4) JSON file mode

```bash
koupper run examples/cli-report-generator.kts --json-file examples/cli-report-generator.input.json
```

## 5) New module scaffold

```bash
koupper new module name="smoke-module",version="1.0.0",package="smoke.module"
```

## 6) Add scripts into existing module

```bash
koupper module add-scripts name="smoke-module" --script-inclusive "extensions/sample.kts"
```

## 7) Provider discovery

```bash
koupper provider list
koupper provider info mcp
koupper provider info n8n
```

## 8) Job subsystem baseline

```bash
koupper new module name="smoke-jobs",version="1.0.0",package="smoke.jobs",template="jobs"
cd smoke-jobs
koupper job list
```
