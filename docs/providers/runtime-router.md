# Runtime Router Provider

`runtime-router` exposes high-performance HTTP endpoints backed by script handlers.

## Service provider

- `RuntimeRouterServiceProvider`

## Contract and implementations

- `RuntimeRouterProvider` -> **`GrizzlyRuntimeRouterProvider`** (Production Grade)

## Performance & Robustness

Powered by the **Grizzly NIO Engine**, Koupper's router is designed for high-concurrency production environments:

- **Non-blocking I/O**: Handles thousands of connections with a minimal thread pool.
- **CORS & OPTIONS**: Built-in support for cross-origin requests.
- **Zero-Burocracy**: Automatically extracts `body` from `ScriptResult` objects.

## Usage: Auto-Discovery (Recommended)

This is the "Zero-Config" way to build APIs. Annotate your scripts and let Koupper find them.

### 1. Annotate your Script
```kotlin
@Export
@WebRoute(path = "/api/v1/hello", method = RouteMethod.GET)
val helloScript: (Unit) -> ScriptResult = {
    ScriptResult.Ok(200, "HELLO_WORLD", mapOf("message" to "Hi from Koupper!"))
}
```

### 2. Boot the Router
```kotlin
fun main() {
    val router = app.getInstance(RuntimeRouterProvider::class)
    
    // Automatically finds all @WebRoute annotated scripts in the package
    router.autoDiscover("com.myproject.extensions")
    
    router.start(port = 3000)
}
```

## Usage: Manual Routing (DSL)

If you need fine-grained control, use the Routing DSL:

```kotlin
val router = app.getInstance(RuntimeRouterProvider::class)

router.registerRouter {
    path { "/api/v1" }
    
    get {
        path { "/health" }
        script { ::healthCheckScript }
    }
}
```

## Middleware Integration

Register custom middlewares (e.g., Auth) that are automatically triggered by the `@Auth` annotation:

```kotlin
router.registerMiddleware("auth") { context ->
    // Your security logic here
    MiddlewareResult(allowed = true)
}
```
