# MCP Provider

`mcp` provides local MCP-style tool server capabilities with discovery and invocation endpoints.

## Service provider

- `MCPServiceProvider`

## Contract and implementations

- `MCPServerProvider` -> `LocalMCPServerProvider`

`LocalMCPServerProvider` uses a standard `ServerSocket`-based HTTP server with no external dependencies. It exposes two endpoints:

- `GET /mcp/tools` — list registered tools
- `POST /mcp/call` — invoke a tool by name

## Environment variables

- None required by default.

## Typical use cases

- expose script-backed tools for local assistants/agents
- register runtime tool endpoints for internal automation
- keep discovery + execution inside the same runtime boundary

## CLI discovery

```bash
koupper provider info mcp
```

## Example guide

- [MCP Tool Server Example](/examples/mcp-tool-server)

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.mcp.MCPServerProvider
import com.koupper.container.app

@Export
val registerTool: () -> String = {
    val mcp = app.getInstance(MCPServerProvider::class)
    mcp.registerTool(
        name = "get_weather",
        description = "Get current weather for a city",
        handler = { params ->
            val city = params["city"] as? String ?: "unknown"
            mapOf("city" to city, "temp" to 22, "condition" to "sunny")
        }
    )
    mcp.start()
    "MCP server with tool 'get_weather' running"
}
```
