# Command Bridge Provider

Bidirectional file-based command channel for interactive agents. Watches for `*.response` files written by CLI or web UI.

## Contracts

| Contract | Implementation |
|---|---|
| `CommandBridgeProvider` | `LocalCommandBridgeProvider` |

## Environment

| Variable | Required | Description |
|---|---|---|
| `KOUPPER_COMMAND_DIR` | No | Directory for command/response files (default: `~/.koupper/commands`) |

## CLI Discovery

```bash
koupper provider info command-bridge
```
