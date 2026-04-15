# Annotations Reference

Koupper annotations are organized around one root: `@Export`.

Use `@Export` as the execution entrypoint, then layer complementary annotations depending on your script type (jobs/scheduled/http/security).

## Hierarchy and intent

### 1) Core entrypoint (required for runtime scripts)

- `@Export`: declares what Octopus can execute.

### 2) Runtime behavior complements

- `@JobsListener`: worker listener behavior.
- `@Scheduled`: scheduled script behavior.
- `@Logger`: script-level logging configuration metadata.

### 3) Function-level orchestration complements

- `@Schedule`: run a function at explicit datetime.
- `@Timer`: repeat function execution by timer semantics.

### 4) Security and policy complements

- `@Auth`: marks auth-aware boundaries.
- `@Authorize`: applies explicit authorization policy class.

### 5) Eventing complements

- `@OnSuccess`: builds/emits domain events after successful request handling.

## Quick map

| Annotation | Typical target | Retention | Primary use |
| --- | --- | --- | --- |
| `@Export` | script property/function | `RUNTIME` | Root execution entrypoint |
| `@JobsListener` | script property | `SOURCE` | Worker loop listener configuration |
| `@Scheduled` | script property | `SOURCE` | Schedule configuration for script-level jobs |
| `@Logger` | script property | `SOURCE` | Logger setup metadata |
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
import com.koupper.octopus.annotations.Export

data class Input(val name: String)

@Export
val setup: (Input) -> Map<String, Any?> = { input ->
    mapOf("ok" to true, "hello" to input.name)
}
```

Rules:

- A runtime `.kts` script should expose exactly one active `@Export` entrypoint.
- Missing or multiple exported entrypoints produce execution errors.

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
- Main usage: configure scheduled script execution.

Parameters:

- `rate: Long = 0L`
- `cron: String = ""`
- `configId: String = ""`
- `debug: Boolean = false`
- `delay: Long = 0L`
- `at: String = ""`

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
