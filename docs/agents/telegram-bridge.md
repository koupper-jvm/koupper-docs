# TelegramBridgeAgent

Connects your Telegram account to CORTEX. Send a message on Telegram, get the agent's response back — no terminal needed.

## How it works

```
You → Telegram message
  → TelegramBridgeAgent polls Bot API (long-polling)
  → writes to CommandBridge (commands/wizard/)
  → CortexAgent picks it up, runs LLM inference
  → TelegramBridgeAgent monitors cortex-session.log
  → sends response back to you on Telegram
```

## Setup

### 1. Create a Telegram bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Copy the token (format: `123456789:AAF...`)

### 2. Get your chat ID

Start a conversation with your bot (send any message), then open:

```
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
```

Find `"chat": {"id": 123456789}` in the response — that's your chat ID.

### 3. Configure

Create `~/.koupper/telegram.json`:

```json
{
  "token": "123456789:AAFxxxxxxxxxxxxxxxxxxxxxx",
  "allowedChatIds": [123456789]
}
```

Leave `allowedChatIds` empty to accept messages from anyone (not recommended).

Or use environment variables:

```bash
export KOUPPER_TELEGRAM_TOKEN="123456789:AAFxxxxxx"
export KOUPPER_TELEGRAM_CHAT_IDS="123456789,987654321"
```

### 4. Start CORTEX and the bridge

```bash
# Terminal 1 — start the full stack
koupper start

# Terminal 2 — start the Telegram bridge
koupper run ~/.koupper/agents/TelegramBridgeAgent.kts
```

Or add the bridge to `koupper start` by installing it in `~/.koupper/agents/` (it auto-launches if found).

## Usage

Once running, just message your bot on Telegram:

```
You: What agents do I have installed?
CORTEX: You have 6 agents deployed:
  - GreetingAgent
  - AgentCreatorAgent
  - RssFeedAgent
  - HeartbeatAgent
  - TelegramBridgeAgent
  - CortexWebUiAgent
```

```
You: Create an agent that monitors disk usage
CORTEX: [generates DiskMonitorAgent.kts and saves it]
  ✓ Agent saved → ~/.koupper/agents/DiskMonitorAgent.kts
```

## Security

- Set `allowedChatIds` to restrict access to your chat ID(s) only.
- Never commit `telegram.json` to version control.
- The bot only responds to messages from allowed chats.

## Providers used

| Provider | Purpose |
|---|---|
| `TelegramChannelProvider` | Long-polling Bot API, send messages |
| `CommandBridgeProvider` | Forward messages to CortexAgent |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `KOUPPER_TELEGRAM_TOKEN` | Yes | Bot API token from BotFather |
| `KOUPPER_TELEGRAM_CHAT_IDS` | No | Comma-separated allowed chat IDs |
| `CORTEX_JOBS_DIR` | No | Jobs directory (default: `~/.koupper/jobs`) |

## skill.json

```json
{
  "name": "TelegramBridgeAgent",
  "role": "Telegram ↔ CORTEX channel bridge",
  "triggers": ["manual", "koupper-start"],
  "persistent": true
}
```
