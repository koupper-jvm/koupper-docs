# Script Execution Checklist

Use this checklist to validate core script behavior before release.

## Prerequisites

```bash
kotlinc -script install.kts -- --doctor
koupper help
```

## Core execution checks

```bash
koupper help run
koupper run examples/hello-world.kts "Checklist"
koupper run examples/cli-report-generator.kts --json-file examples/cli-report-generator.input.json
koupper provider list
```

## Module and job checks

```bash
koupper new module name="smoke-script",version="1.0.1",package="smoke.script",template="default"
koupper module smoke-script
koupper new module name="smoke-jobs",version="2.0.0",package="smoke.jobs",template="jobs"
```

Then validate worker/job lifecycle in your module environment with:

- `koupper job init`
- `koupper job list`
- `koupper job run-worker`
- `koupper job status`

## Release recommendation

- Run this checklist before tagging releases.
- If any step fails, fix root cause before merge.
- Keep checks aligned with current examples and command docs.

## Full maintainer checklist

The full extended checklist used by maintainers lives in the core repo at `docs/CLI_COMMAND_CHECKLIST.md`.
