# Command Overview

Koupper CLI commands are organized around one flow: scaffold, run, evolve, operate, and deploy.

## Core command groups

| Group | Command | Purpose |
| --- | --- | --- |
| Scaffold | [`koupper new`](/commands/new) | Create scripts or module templates. |
| Execute | [`koupper run`](/commands/run) | Run Kotlin scripts through Octopus runtime. |
| Module evolution | [`koupper module`](/commands/module) | Add scripts and inspect module metadata. |
| Background jobs | [`koupper job`](/commands/job) | List, run, and inspect queued worker jobs. |
| Deployment | [`koupper deploy`](/commands/deploy) | Package and deploy script/module artifacts. |
| Capability discovery | [`koupper provider`](/commands/provider) | List providers and inspect contracts + env requirements. |

## Typical lifecycle

```bash
koupper new module name="demo",version="1.0.0",package="demo.app",template="jobs"
cd demo
koupper run extensions/hello-world.kts
koupper job list
koupper deploy
```

## Tips

- Run commands from module root when using module/job/deploy flows.
- Use `--json-file` with `koupper run` for stable payload handling in CI shells.
- Use `koupper provider info <provider>` before wiring integrations to confirm required env vars.
