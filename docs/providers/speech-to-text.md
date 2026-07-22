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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.stt.SpeechToTextProvider
import com.koupper.container.app

@Export
val transcribeAudio: () -> String = {
    val stt = app.getInstance(SpeechToTextProvider::class, "local")
    val result = stt.transcribe(
        audioPath = "recordings/meeting.wav",
        model = "base"
    )
    "Transcription: ${result.text.take(100)}..."
}
```
