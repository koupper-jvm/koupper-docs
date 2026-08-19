# Annotations Reference

Koupper annotations are organized around one root: `@Export`.

Use `@Export` as the execution entrypoint, then layer complementary annotations depending on your script type (jobs/scheduled/http/security).

## Hierarchy and intent

### 1) Core entrypoint (required for runtime scripts)

- `@Export`: declares what Octopus can execute.

### 2) Runtime behavior complements

- `@WebRoute`: HTTP endpoint binding for scripts (path + method).
- `@JobsListener`: worker listener behavior.
- `@Scheduled`: scheduled script behavior.
- `@Logger`: script-level logging configuration metadata.

### 3) Function-level orchestration complements

- `@Schedule`: run a function at explicit datetime.
- `@Timer`: repeat function execution by timer semantics.

### 4) Security and policy complements

- `@Auth`: marks auth-aware boundaries.
- `@Authorize`: applies explicit authorization policy class.
- `@Secret`: marks script parameters as sensitive — values are auto-redacted from stdout, logs, and TCP output.

### 5) Contract and compatibility

- `@KoupperVersion`: declares expected framework version. Script compilation fails if runtime version doesn't match.

### 5) Eventing complements

- `@OnSuccess`: builds/emits domain events after successful request handling.

## Quick map

| Annotation | Typical target | Retention | Primary use |
| --- | --- | --- | --- |
| `@Export` | script property/function | `RUNTIME` | Root execution entrypoint |
| `@WebRoute` | script property | `RUNTIME` | HTTP endpoint binding with path and method |
| `@JobsListener` | script property | `SOURCE` | Worker loop listener configuration |
| `@Scheduled` | script property | `SOURCE` | Schedule configuration for script-level jobs. Supports `chain` for pipeline chaining. |
| `@Logger` | script property | `SOURCE` | Logger setup metadata |
| `@Secret` | script property | `SOURCE` | Auto-redact sensitive parameter values from output |
| `@KoupperVersion` | script property | `SOURCE` | Declare expected framework version |
| `@Schedule` | function | `RUNTIME` | Function schedule at explicit datetime |
| `@Timer` | function | `RUNTIME` | Repeated/timer function execution |
| `@Auth` | class/function/property | `RUNTIME` | Mark auth-aware execution boundaries |
| `@Authorize` | class/function | `RUNTIME` | Attach explicit authorization policy class |
| `@OnSuccess` | class/function | `RUNTIME` | Emit domain events on successful request handling |

## Root annotation: `@Export`

- Target: value parameter, function, property, field.
- Retention: runtime.
- Main usage: define executable entrypoint for `koupper run` and runtime execution.

```kotlin
import com.koupper.shared.annotations.Export

data class Input(val name: String)

@Export
val setup: (Input) -> Map<String, Any?> = { input ->
    mapOf("ok" to true, "hello" to input.name)
}
```

Rules:

- A runtime `.kts` script should expose exactly one active `@Export` entrypoint.
- Missing or multiple exported entrypoints produce execution errors.

#### `@WebRoute`

- Target: property
- Retention: runtime
- Main usage: bind a script to an HTTP endpoint. Works alongside `@Export` to expose scripts as web handlers.

Parameters:

- `path: String = ""` — URL path (e.g., `"/api/users"`)
- `method: RouteMethod = RouteMethod.GET` — HTTP method

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.shared.annotations.WebRoute

@WebRoute(path = "/api/hello", method = RouteMethod.GET)
@Export
val hello: () -> Map<String, Any?> = {
    mapOf("status" to "ok", "message" to "hello from koupper")
}
```

## Complements for `@Export`

### Worker/scheduler complements

#### `@JobsListener`

- Target: property
- Retention: source
- Main usage: configure polling/listener behavior for jobs workers.

Parameters:

- `time: Long = 5000`
- `debug: Boolean = false`
- `configId: String = "DEFAULT"`

#### `@Scheduled`

- Target: property
- Retention: source
- Main usage: configure scheduled script execution. `@Scheduled` is a side-effect annotation — it does not block `@Export`, so a script can be both scheduled AND manually runnable.

Parameters:

- `rate: Long = 0L`
- `cron: String = ""`
- `configId: String = ""`
- `debug: Boolean = false`
- `delay: Long = 0L`
- `at: String = ""`
- `chain: String = ""` — pipeline chain (e.g., `"AgentB.kts > AgentC.kts"`). The worker automatically enqueues each stage after the previous one completes.

Pipeline example:
```kotlin
@Scheduled(cron = "0 8 * * *", chain = "SummarizerAgent.kts > TelegramNotifyAgent.kts")
@Export
val digest: () -> Unit = {
    // reads RSS feed — worker chains summarizer + telegram automatically
}
```

V7 in-process alternative (preferred for compiled modules): `::step.asJob(...).dispatchToQueue()` and `ScriptExecutor.runPipeline(...)`. See [`koupper job`](/commands/job) and [Pipelines](/architecture/pipelines).

### Function orchestration complements

#### `@Schedule`

- Target: function
- Retention: runtime
- Main usage: execute a function at an explicit datetime.

Parameter:

- `dateTime: String`

#### `@Timer`

- Target: function
- Retention: runtime
- Main usage: run function logic on timer semantics.

Parameters:

- `interval: String = ""`
- `at: String = ""`

#### `@Logger`

- Target: property
- Retention: source
- Main usage: logger configuration metadata in script context.

Parameters:

- `level: String = "INFO"`
- `destination: String = "console"`
- `stdoutLevel: String = "INFO"`
- `stderrLevel: String = "ERROR"`

### Security complements

#### `@Secret`

- Target: function, property
- Retention: source
- Main usage: mark script parameters as sensitive. When present, all input parameter values are automatically redacted (`***`) from stdout, stderr, logs, and TCP output.

```kotlin
import com.koupper.shared.annotations.Secret

@Secret
@Export
val setup: (String) -> String = { apiKey ->
    println("Using key: $apiKey")  // stdout: "Using key: ***"
    "authenticated"
}
```

#### `@KoupperVersion`

- Target: function, property
- Retention: source
- Main usage: declare the expected framework version. If the runtime version doesn't match the declared major.minor, compilation fails with a clear error message instead of cryptic `Unresolved reference` errors.

```kotlin
import com.koupper.shared.annotations.KoupperVersion

@KoupperVersion("6.5")
@Export
val setup: () -> String = { "runs only on 6.5.x" }
```

The runtime version is also available as a top-level val:
```kotlin
@Export
val setup: () -> String = { KOUPPER_VERSION }  // "6.5.3"
```

#### `@Auth`

- Target: class, function, property
- Retention: runtime
- Main usage: declare auth-aware execution contexts.

#### `@Authorize`

- Target: class, function
- Retention: runtime
- Main usage: enforce custom authorization policy type.

Parameter:

- `value: KClass<out AuthorizationPolicy>`

### Eventing complement

#### `@OnSuccess`

- Target: function, class
- Retention: runtime
- Main usage: publish/construct domain events for successful HTTP request responses.

Parameter:

- `builder: KClass<out SuccessEventBuilder<out DomainEvent>>`

## Related pages

- [Script Execution Contract](/architecture/script-execution-contract)
- [Script Execution Lifecycle](/architecture/script-execution-lifecycle)
- [Runtime Topology](/architecture/runtime-topology)
