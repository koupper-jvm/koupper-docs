# Script Basics

Minimal run flow for local script execution.

## 1) Create a script

```bash
koupper new hello-demo.kts
```

## 2) Run script

```bash
koupper run hello-demo.kts
```

## 3) Run with params

```bash
koupper run examples/hello-world.kts "Koupper"
```

## 4) Run with JSON payload

```bash
koupper run examples/cli-report-generator.kts --json-file examples/cli-report-generator.input.json
```

## Troubleshooting

- If payload quoting fails in shell, use `--json-file`.
- If runtime host/port differs, set `KOUPPER_OCTOPUS_HOST` and `KOUPPER_OCTOPUS_PORT`.
- If daemon requires auth, set `KOUPPER_OCTOPUS_TOKEN`.
