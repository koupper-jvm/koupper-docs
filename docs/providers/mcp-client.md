# MCP Client Provider

Client for connecting to external Model Context Protocol (MCP) servers. Supports three transports: HTTP, stdio, and SSE.

## Contracts

| Contract | Implementation |
|---|---|
| `MCPClientProvider` | `LocalMCPClientProvider` |

## Transports

| Transport | Description |
|---|---|
| **HTTP** | POST JSON-RPC 2.0 to an HTTP endpoint |
| **stdio** | Spawn a subprocess and communicate via stdin/stdout |
| **SSE** | Server-Sent Events for streaming tool responses |

## CLI Discovery

```bash
koupper provider info mcp-client
```

## Related

- [MCP Server Provider](/providers/mcp)
- [MCP Tool Server Example](/examples/mcp-tool-server)

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.mcp.MCPClientProvider
import com.koupper.container.app

@Export
val callRemoteTool: () -> String = {
    val client = app.getInstance(MCPClientProvider::class)
    client.connectViaHttp("http://localhost:18082")
    val tools = client.listTools()
    val result = client.callTool("get_weather", mapOf("city" to "Madrid"))
    client.disconnect()
    "Tools: ${tools.size}, Weather result: $result"
}
```
