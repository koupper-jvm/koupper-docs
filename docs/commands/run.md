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
| `--serve` | optional | Live mode for long-running scripts (servers/listeners). Keeps session attached until stopped. |

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

## Live serve mode

Use `--serve` when your script intentionally stays alive (for example, HTTP endpoint listeners):

```bash
koupper run examples/runtime-router-live-server.kts --serve
```

In serve mode:

- CLI stays attached and prints runtime logs.
- `Ctrl+C` sends a cancellation request to the daemon for the active execution.
- Your script should handle interruption and release resources in `finally`.

## Execution logs and metrics

- Runtime/system logs are written under `~/.koupper/logs`.
- Script execution metrics are appended to `~/.koupper/logs/octopus-executions.jsonl`.
- `koupper run` does not create `~/.koupper/helpers/*.json` snapshots unless a command explicitly reports payloads.
