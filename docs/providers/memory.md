# Memory Provider

High-level memory provider for agents: `remember(text)` persists data, `recall(query)` retrieves relevant memories.

## Contracts

| Contract | Implementation |
|---|---|
| `MemoryProvider` | `LocalMemoryProvider` |

## Usage

```kotlin
import com.koupper.providers.memory.MemoryProvider
import com.koupper.container.app

val memory = app.getInstance(MemoryProvider::class)
memory.remember("The deployment was successful at 3pm")
val relevant = memory.recall("deployment")
```

## CLI Discovery

```bash
koupper provider info memory
```
