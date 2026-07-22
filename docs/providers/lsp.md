# LSP Provider

Language Server Protocol bridge — hover, go-to-definition, and diagnostics via any LSP server.

## Contracts

| Contract | Implementation |
|---|---|
| `LspBridgeProvider` | `LocalLspBridge` |

## CLI Discovery

```bash
koupper provider info lsp
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.lsp.LspBridgeProvider
import com.koupper.container.app

@Export
val getDiagnostics: () -> String = {
    val lsp = app.getInstance(LspBridgeProvider::class)
    lsp.connect(serverCommand = listOf("kotlin-language-server"))
    val diag = lsp.diagnostics(filePath = "src/Main.kt")
    lsp.disconnect()
    "Found ${diag.size} issues"
}
```
