# `koupper schedule`

Manage recurring agent schedules stored in `~/.koupper/schedules.json`.

Schedules are consumed by `koupper worker --enable-scheduling`, which enqueues jobs automatically when triggers fire.

## Subcommands

### add

```bash
koupper schedule add <agentFile> [--cron="..."] [--rate=ms] [--once="ISO8601"] [--id=<id>] [--queue=<queue>]
```

| Option | Description |
|---|---|
| `<agentFile>` | Agent script filename (e.g. `RssFeedAgent.kts`). Resolved from `~/.koupper/agents/`. |
| `--cron="..."` | 5-field cron expression: `min hour day month weekday`. |
| `--rate=ms` | Fixed interval in milliseconds. |
| `--once="ISO8601"` | Single one-time run at the given datetime (e.g. `2026-06-01T09:00:00`). |
| `--id=<id>` | Optional schedule ID. Auto-generated if omitted. |
| `--queue=<queue>` | Target queue (default: `default`). |

### list

```bash
koupper schedule list
```

Displays all schedules with id, trigger, agent, queue, and enabled state.

### remove

```bash
koupper schedule remove <id>
```

Deletes a schedule entry permanently.

### enable / disable

```bash
koupper schedule enable <id>
koupper schedule disable <id>
```

Toggle a schedule on or off without deleting it.

## Examples

### Run an agent every weekday at 8am

```bash
koupper schedule add RssFeedAgent.kts --cron="0 8 * * 1-5" --id=morning-digest
```

### Run every 5 minutes

```bash
koupper schedule add GreetingAgent.kts --rate=300000 --id=health-check
```

### Run once on a specific date

```bash
koupper schedule add ReportAgent.kts --once="2026-06-01T09:00:00" --id=quarterly-report
```

### List all schedules

```bash
koupper schedule list
```

### Disable a schedule temporarily

```bash
koupper schedule disable morning-digest
koupper schedule enable morning-digest
```

### Remove a schedule

```bash
koupper schedule remove morning-digest
```

## Activating schedules

Schedules have no effect unless the worker is started with `--enable-scheduling`:

```bash
koupper worker --enable-scheduling
```

## Cron expression format

5 fields: `minute hour day-of-month month day-of-week`

| Field | Values |
|---|---|
| minute | `0–59` |
| hour | `0–23` |
| day | `1–31` |
| month | `1–12` |
| weekday | `0–6` (0 = Sunday) |

Supported tokens: `*` (any), `N` (exact), `*/N` (every N), `N-M` (range), `N,M,...` (list).

| Expression | Meaning |
|---|---|
| `0 8 * * 1-5` | 8:00 AM every weekday |
| `*/15 * * * *` | Every 15 minutes |
| `0 0 1 * *` | First day of every month at midnight |

## Storage

Schedules are persisted in `~/.koupper/schedules.json`. You can inspect or edit this file directly.
