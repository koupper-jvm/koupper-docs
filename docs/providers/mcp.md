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
