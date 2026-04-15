# Jobs Worker Flow

End-to-end local flow for job-driven module execution.

## 1) Scaffold jobs module

```bash
koupper new module name="jobs-demo",version="1.0.0",package="demo.jobs",template="jobs"
cd jobs-demo
```

## 2) Inspect queued work

```bash
koupper job list
```

## 3) Run worker

```bash
koupper job run-worker
```

## 4) Check status

```bash
koupper job status
```

## Optional targeted flags

```bash
koupper job list --configId=default
koupper job run-worker --jobId=<id>
```
