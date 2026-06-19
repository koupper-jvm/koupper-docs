# Speech-to-Text Provider

Audio transcription with two backends: local whisper-cpp CLI or OpenAI/Groq Whisper API.

## Contracts

| Contract | Implementation |
|---|---|
| `SpeechToTextProvider` | `WhisperCliProvider` (tag: `local`), `OpenAIWhisperProvider` (tag: `api`) |

## Environment

| Variable | Required | Description |
|---|---|---|
| `WHISPER_MODEL_PATH` | No | Path to whisper model for local transcription |
| `OPENAI_API_KEY` | No | API key for OpenAI Whisper mode |

## CLI Discovery

```bash
koupper provider info speech-to-text
```
