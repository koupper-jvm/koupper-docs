# Telegram Provider

Bidirectional Telegram Bot API channel for agent communication via long-polling.

## Contracts

| Contract | Implementation |
|---|---|
| `TelegramChannelProvider` | `TelegramChannelProviderImpl` |

## Environment

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram Bot API token |

## CLI Discovery

```bash
koupper provider info telegram
```

## Related

- [Telegram Bridge Agent](/agents/telegram-bridge)
