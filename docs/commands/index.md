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
| Infrastructure | [`koupper infra`](/commands/infra) | Run Terraform lifecycle commands with stable JSON output. |
| Reconcile | [`koupper reconcile`](/commands/reconcile) | Orchestrate infra, preflight, deploy, smoke, and rollback stages. |
| Capability discovery | [`koupper provider`](/commands/provider) | List providers and inspect contracts + env requirements. |
| Build | [`koupper build`](/commands/build) | Run the module's init.kts build script. |
| Project watcher | [`koupper watch`](/commands/watch) | Auto-detect providers and sync Gradle dependencies. |

## Agent runtime commands

| Command | Purpose |
| --- | --- |
| [`koupper agent`](/commands/agent) | Manage installed agents: list, info, install, remove. |
| [`koupper worker`](/commands/worker) | Background job worker daemon — polls queues, executes agent scripts. |
| [`koupper worker --status`](/commands/worker#snapshot-queue-status-without-starting-the-daemon) | Print queue snapshot (pending/processing/failed/dead) and exit. |
| [`koupper schedule`](/commands/schedule) | Manage recurring agent schedules (cron, rate, once). |
| [`koupper doctor`](/commands/doctor) | Diagnose the runtime: env vars, ports, queues, agents, schedules. |

## Typical lifecycle

```bash
koupper new module name="demo",version="1.0.0",package="demo.app",template="jobs"
cd demo
koupper run extensions/hello-world.kts
koupper job list
koupper deploy
koupper infra plan --dir=infra --var-file=env/dev.tfvars --json
koupper reconcile run --dir=infra --auto-approve --stages=infra,preflight,deploy,smoke --json
```

## Tips

- Run commands from module root when using module/job/deploy flows.
- Use `--json-file` with `koupper run` for stable payload handling in CI shells.
- Use `koupper provider info <provider>` before wiring integrations to confirm required env vars.
