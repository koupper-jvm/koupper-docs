# Script Execution Contract

Koupper scripts follow a runtime contract to keep behavior predictable across local and production execution.

## Entrypoint rule

- A `.kts` runtime script must declare exactly one `@Export` entrypoint.
- Recommended entrypoint name: `setup`.
- If no `@Export` is found, execution fails.
- If multiple `@Export` declarations are found, execution fails with a clear error.
- For complementary annotations around `@Export`, see [Annotations Reference](/architecture/annotations-reference).

## Recommended shape

```kotlin
@Export
val setup: (Input) -> Map<String, Any?> = { input ->
    mapOf("ok" to true)
}
```

## Pipeline usage

- Run pipeline orchestration inside `setup`.
- Use `dependsOn(...)` with property references (`::stepA`).
- Use `async = false` for dependency-driven sequencing.

## Provider-first execution

- Runtime integrations should be resolved from container providers when available.
- Avoid direct SDK/CLI integrations in scripts for capabilities that already exist as providers.
- Keep local build commands project-local (Gradle/npm), separate from cloud action orchestration.

## Why this contract matters

- stable behavior between `koupper run`, workers, and deployed runtime routes,
- lower migration friction from script prototypes to module services,
- explicit and testable failure modes.
