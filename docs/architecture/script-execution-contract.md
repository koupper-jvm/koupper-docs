# Script Execution Contract

Koupper scripts follow a strict runtime contract to keep behavior predictable across local and production execution.

## Entrypoint Rule

- A `.kts` or `.kt` script must declare exactly one **`@Export`** entrypoint.
- The entrypoint is a function or a property holding a lambda.

## Web Integration Contract

To expose a script as a production-grade HTTP endpoint, use the **`@WebRoute`** annotation alongside `@Export`:

```kotlin
@Export
@WebRoute(path = "/my/route", method = RouteMethod.POST)
val myScript = { input: MyRequest -> ... }
```

### Automatic Metadata Processing
When used in a Web context, the Koupper Runtime:
1.  **Auto-discovers** scripts in the classpath.
2.  **Analyzes** metadata (Auth, WebRoute).
3.  **Binds** the script to the Grizzly NIO Engine.

## Why this contract matters

- **Portability**: The same code works in `koupper run`, scheduled jobs, and high-performance APIs.
- **Predictability**: Stable behavior between local and production execution.
- **Maintenance**: Low friction when migrating from a simple script to a production service.
