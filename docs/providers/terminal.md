# Terminal Runtime

`terminal` exposes interactive prompt/print capabilities during script execution.

## Runtime type

- `TerminalIO` (runtime-backed via `TerminalContext`)

## What it does

- send prompt messages to CLI (`prompt`)
- print live messages back to CLI (`print`)

## Environment variables

- none required

## Example

```bash
koupper run examples/terminal-runtime-demo.kts
```

If your script receives a `name` in input JSON, the prompt can be skipped:

```bash
koupper run examples/terminal-runtime-demo.kts '{"name":"Jacob"}'
```

## CLI discovery

```bash
koupper provider info terminal
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.io.TerminalIO
import com.koupper.providers.io.TerminalContext

@Export
val interactivePrompt: () -> String = {
    val term = TerminalContext.get() ?: return@interactivePrompt "No terminal"
    term.print("Enter your name: ")
    val name = term.readLine() ?: "anonymous"
    "Hello, $name!"
}
```
