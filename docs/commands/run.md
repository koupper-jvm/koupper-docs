# `koupper run`

Execute Kotlin scripts through the Octopus runtime.

## Usage

```bash
koupper run path/to/script.kts
```

Run `init.kts` from current directory:

```bash
koupper run
```

With positional params:

```bash
koupper run examples/hello-world.kts "Developer"
```

## Options

| Option | Type | Description |
| --- | --- | --- |
| `--json-file <file.json>` | optional | Reads params payload from a JSON file instead of inline shell argument. |

## JSON payload modes

### Inline JSON

```bash
koupper run examples/cli-report-generator.kts '{"reportName":"Q3","region":"Global"}'
```

### JSON file (recommended when shell quoting is unstable)

```bash
koupper run examples/cli-report-generator.kts --json-file examples/cli-report-generator.input.json
```

## Runtime host/port overrides

```bash
export KOUPPER_OCTOPUS_HOST="127.0.0.1"
export KOUPPER_OCTOPUS_PORT="9998"
koupper run examples/hello-world.kts
```

JVM property equivalents:

```bash
export JAVA_TOOL_OPTIONS="-Dkoupper.octopus.host=127.0.0.1 -Dkoupper.octopus.port=9998"
koupper run examples/hello-world.kts
```

Auth token (optional, when daemon requires it):

```bash
export KOUPPER_OCTOPUS_TOKEN="your-daemon-token"
koupper run examples/hello-world.kts
```

## Execution logs and metrics

- Runtime/system logs are written under `~/.koupper/logs`.
- Script execution metrics are appended to `~/.koupper/logs/octopus-executions.jsonl`.
- `koupper run` does not create `~/.koupper/helpers/*.json` snapshots unless a command explicitly reports payloads.
