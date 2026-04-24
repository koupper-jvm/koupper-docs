# Web & API Production Architecture

Koupper is not just a scripting engine; it is a high-performance runtime for production-grade HTTP APIs.

## The Production Stack

When you deploy a Koupper module for web traffic, the runtime utilizes a professional-grade stack:

- **Grizzly NIO Engine**: A high-concurrency, non-blocking I/O server.
- **Jersey Integration**: Standardized JAX-RS capabilities for routing and filtering.
- **Octopus Orchestrator**: Manages the execution of scripts with full traceability.

## Declarative Security & Operations

One of Koupper's strongest advantages is the ability to attach production behavior directly to your logic using annotations. These annotations are interpreted by specialized filters at runtime.

### 1. Authorization Framework

By using `@Auth` and `@Authorize`, you move security logic out of your scripts and into the infrastructure.

- **`AuthorizationFilter`**: Automatically intercepts requests to scripts or controllers marked with these annotations.
- **Session Management**: It populates an `AuthSession` object in the request context, which you can consume in your logic.

```kotlin
@Export
@Auth
@Authorize(AdminPolicy::class)
val deleteUser: (UserRequest) -> ScriptResult = { ... }
```

### 2. Side Effects & Domain Events

The `@OnSuccess` annotation allows your API to be reactive without adding complexity to the script.

- **`OnSuccessResponseFilter`**: If the script returns a successful code (e.g., 201), this filter triggers a domain event builder.
- **Async Execution**: Events are processed outside the main request-response loop, keeping your API fast.

## Unifying Scripts and APIs

Koupper allows you to use the same code for a CLI task and a Web endpoint. 

| Feature | Script (CLI) | API (Web) |
| --- | --- | --- |
| Entrypoint | `@Export` | `@Export` |
| Security | Manual/Token | `@Auth` Filter |
| Logging | `@Logger` | `@Logger` + Logback |
| Side Effects | Direct | `@OnSuccess` Filter |

## Performance Considerations

By using the **Grizzly Engine**, Koupper handles thousands of concurrent connections with minimal memory footprint. Unlike traditional MVC frameworks, Koupper's "Script-First" approach avoids deep reflection chains, resulting in lower latency and faster Cold Starts in serverless environments.
