# Build Provider

Runs Gradle/npm builds and parses compiler output into structured errors for agent compile/fix/compile feedback loops.

## Contracts

| Contract | Implementation |
|---|---|
| `BuildProvider` | `GradleBuildProvider` |

## CLI Discovery

```bash
koupper provider info build
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.buildops.BuildProvider
import com.koupper.container.app

@Export
val compileAndFix: () -> String = {
    val build = app.getInstance(BuildProvider::class)
    val result = build.runBuild(workingDir = "./myapp")
    
    if (result.success) return@compileAndFix "Build passed"
    
    val errors = result.errors.take(3).joinToString("\n") { "${it.file}:${it.line} — ${it.message}" }
    "Build failed:\n$errors"
}
```
