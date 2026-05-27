# Agent DSL

Defining an agent in Koupper is as simple as writing a standard Kotlin script. The framework provides a declarative, type-safe DSL that abstracts away the complexity of hardware management and inference.

## Basic Structure

Every agent definition starts with the `agent { ... }` block, typically wrapped in a function annotated with `@Export`.

```kotlin
import com.koupper.providers.agent.*

data class ResearchResult(
    val summary: String,
    val confidence: Double
)

@Export
fun setup() = agent {
    name = "my-researcher"
    
    role {
        identity = "System Analyst"
        goal = "Analyze host performance"
        instructions = "Be concise and technical."
    }

    tools {
        use("file-handler")
        use("http")
    }

    task<ResearchResult> {
        prompt = "Read /proc/cpuinfo and summarize its potential."
        
        onToken { token -> print(token) }
        
        onHallucination { error, rawOutput ->
            println("The model produced an invalid JSON: $rawOutput")
        }
    }
}
```

## DSL Components

### `role { ... }`
Defines the agent's personality and boundaries.
- `identity`: Who the agent is.
- `goal`: What the agent is trying to achieve.
- `instructions`: Specific rules the agent must follow.

### `tools { ... }`
Grants the agent access to Koupper's native Service Providers.
- `use("provider-name")`: Registers a tool in the agent's local catalog. Common tools include `http`, `file-handler`, `command-runner`, and `db`.

### `task<T> { ... }`
The meat of the agent's execution.
- **Strong Typing**: By passing a generic type `T` (e.g., `task<MyDataClass>`), you force the LLM to output a valid JSON matching that structure.
- `prompt`: The specific assignment for the agent.
- `onToken { ... }`: A reactive callback that receives tokens in real-time as they are generated.
- `onHallucination { ... }`: Triggered if the model fails to produce a valid JSON matching the schema of `T`.

## Best Practices

1. **Use Specific Data Classes**: Instead of returning raw strings, define a data class for every task. This makes your agents much easier to integrate into larger pipelines.
2. **Handle Hallucinations**: Always provide an `onHallucination` block to manage errors gracefully, especially when running on smaller, quantized models.
3. **Be Specific in Instructions**: Clear system instructions in the `role` block significantly reduce the chance of tool-calling errors.

---

[Next: Hardware Profiler](./hardware-profiler)
