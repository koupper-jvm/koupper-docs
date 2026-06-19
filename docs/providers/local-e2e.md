# `local-e2e` Provider

`local-e2e` coordinates local end-to-end checks across process runtime, HTTP surfaces, jobs execution, and persistence verification.

Service provider class: `LocalE2EServiceProvider`  
Contract: `LocalE2E`

## Capabilities

- Validate process runtime state through `process-supervisor` (`runAll` process stage).
- Run HTTP checks with expected status sets (`runHttpChecks`).
- Execute one job cycle with before/after metrics (`runJobCycle`).
- Verify Dynamo local persistence with minimum count assertions (`verifyPersistence`).
- Run all stages in one flow and return a single pass/fail aggregate (`runAll`).

## Resolve from container

```kotlin
import com.koupper.container.app
import com.koupper.providers.locale2e.HttpCheck
import com.koupper.providers.locale2e.LocalE2E
import com.koupper.providers.locale2e.PersistenceCheck

val e2e = app.getInstance(LocalE2E::class)
```

## Run full local flow

```kotlin
val result = e2e.runAll(
    processNames = listOf("api-dev", "worker-dev"),
    httpChecks = listOf(
        HttpCheck(name = "health", url = "http://localhost:8080/health", acceptedStatusCodes = setOf(200))
    ),
    context = ".",
    configId = "default",
    persistenceChecks = listOf(
        PersistenceCheck(table = "users", expectedMinCount = 1)
    )
)
```

## Script example

- `scripts/local-e2e-demo.kts`


## CLI discovery

```bash
koupper provider info local-e2e
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.locale2e.LocalE2E
import com.koupper.container.app

@Export
val runHealthCheck: () -> String = {
    val e2e = app.getInstance(LocalE2E::class)
    
    val httpOk = e2e.checkHttp("http://localhost:8080/health")
    val jobsOk = e2e.checkJobs(queue = "default", maxPending = 10)
    
    if (httpOk && jobsOk) "All checks passed" else "Health check failed"
}
```
