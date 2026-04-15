# MCP Tool Server

Use `mcp` provider for local tool discovery/invocation workflows.

## Provider discovery

```bash
koupper provider info mcp
```

## Integration pattern

1. Register MCP tools through your module runtime startup.
2. Expose tool discovery endpoint.
3. Route invocation requests to script handlers.
4. Return structured results/errors for consumers.

## Why use it

- unify script capabilities as discoverable tools.
- keep local automation and tool-call flows in one runtime.

See architecture details: [Provider Runtime Contract](/architecture/provider-runtime-contract).
