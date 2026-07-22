
# Runtime Router Provider

`runtime-router` exposes high-performance HTTP endpoints backed by script handlers.

## Service provider

- `RuntimeRouterServiceProvider`

## Contract and implementations

- `RuntimeRouterProvider` -> **`GrizzlyRuntimeRouterProvider`** (Production Grade)

## Performance & Robustness

Powered by the **Grizzly NIO Engine**, Koupper's router is designed for high-concurrency production environments:

- **Non-blocking I/O**: Handles thousands of connections with a minimal thread pool.
- **CORS & OPTIONS**: Built-in cross-origin support with multi-origin allow lists (see [CORS](#cors); **7.2.0+**).
- **Zero-Burocracy**: Automatically extracts `body` from `ScriptResult` objects.

## CORS

Configure allowed origins on the router inside `registerRouter { ... }` (list form supported; **Octopus 7.2.0+**):

```kotlin
router.registerRouter {
    cors {
        allowedOrigins = listOf(
            "http://localhost:5173",
            "https://app.example.com"
        )
    }

    get {
        path { "/api/health" }
        script { { mapOf("status" to "UP") } }
    }
}
```

**Behavior:** if the request `Origin` header matches an allowed entry, the response echoes **that** origin in `Access-Control-Allow-Origin`. Browsers reject a comma-joined allow list, so Koupper never joins multiple origins into one header. Use `allowedOrigins = listOf("*")` only when intentionally wide-open.

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
        script { { mapOf("status" to "UP") } }
    }
}
```

## Extracting Path Variables

When using path variables (e.g. `(?<slug>[^/]+)` or `{id}`), Koupper automatically extracts them and populates the `pathParams` map inside the globally available `RequestContext`.

```kotlin
import com.koupper.shared.runtime.GlobalRouteRegistry
import com.koupper.providers.runtime.router.RequestContext

router.registerRouter {
    get {
        path { "/api/v1/blog/posts/(?<slug>[^/]+)" }
        script {
            { 
                val reqCtx = GlobalRouteRegistry.currentRequest.get() as RequestContext
                val slug = reqCtx.pathParams["slug"] ?: ""
                
                mapOf("article_slug" to slug) 
            }
        }
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

