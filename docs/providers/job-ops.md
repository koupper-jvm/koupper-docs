# `job-ops` Provider

`job-ops` exposes typed job orchestration operations so scripts can inspect and run queues without shelling out to `koupper job ...`.

Service provider class: `JobOpsServiceProvider`  
Contract: `JobOps`

## Capabilities

- Read queue metrics per config (`status`).
- List pending jobs (`listPending`) with function and params metadata.
- Run worker cycle (`runWorker`) and collect per-job outcome details.
- Read failed jobs for file-based queues (`failed`).
- Retry failed file-based jobs by id (`retry`).

## Resolve from container

```kotlin
import com.koupper.container.app
import com.koupper.providers.jobops.JobOps

val jobs = app.getInstance(JobOps::class)
```

## Status and pending examples

```kotlin
val status = jobs.status(context = ".")
val pending = jobs.listPending(context = ".", configId = "default")
```

## Worker run and retry examples

```kotlin
val run = jobs.runWorker(context = ".", configId = "default")
val failed = jobs.failed(context = ".", configId = "default")

if (failed.isNotEmpty()) {
    jobs.retry(context = ".", configId = "default", jobId = failed.first().id)
}
```


## CLI discovery

```bash
koupper provider info job-ops
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.jobops.JobOps
import com.koupper.container.app

@Export
val retryFailed: () -> String = {
    val jobs = app.getInstance(JobOps::class)
    
    val failed = jobs.listFailed(queue = "default")
    failed.forEach { job -> jobs.retry(job.id) }
    
    "Retried ${failed.size} failed jobs"
}
```
