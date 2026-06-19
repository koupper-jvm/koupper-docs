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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.telegram.TelegramChannelProvider
import com.koupper.container.app

@Export
val sendAlert: () -> String = {
    val tg = app.getInstance(TelegramChannelProvider::class)
    tg.sendMessage(
        chatId = "-1001234567890",
        text = "Deploy completed: v2.3.1 in production"
    )
    "Alert sent to Telegram"
}
```
