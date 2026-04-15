# Runtime Router Provider

`runtime-router` exposes runtime HTTP endpoints backed by script handlers.

## Service provider

- `RuntimeRouterServiceProvider`

## Contract and implementations

- `RuntimeRouterProvider` -> `JdkRuntimeRouterProvider`

## Environment variables

- None required by default.

## CLI discovery

```bash
koupper provider info runtime-router
```

## Live endpoint script workflow

Use the runtime-router provider with `koupper run --serve` for local endpoint development:

```bash
koupper run examples/runtime-router-live-server.kts --serve
```

Then send requests from Postman/curl while the script is running.

When stopping (`Ctrl+C`), Koupper sends a cancellation signal to the active execution. Your script should call `router.stop()` in a `finally` block so the endpoint server closes cleanly.
