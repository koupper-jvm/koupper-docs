# Providers

Koupper providers expose infrastructure and integration capabilities through the container.

Use the CLI to inspect what is available in your installation:

```bash
koupper provider list
```

For details on one provider:

```bash
koupper provider info <name>
```

## Current provider catalog

| Provider | Service Provider | Description |
| --- | --- | --- |
| [`ai`](/providers/ai) | `AIServiceProvider` | AI model integration provider (OpenAI by default). |
| [`ai-llm-ops`](/providers/ai-llm-ops) | `AILlmOpsServiceProvider` | LLM operations with structured output, embeddings and tool-call helpers. |
| [`aws-deploy`](/providers/aws-deploy) | `AwsDeployServiceProvider` | AWS deployment orchestration for preflight, Lambda, static sites, and API smoke tests. |
| [`aws-dynamo`](/providers/aws-dynamo) | `AwsServiceProvider` | DynamoDB data access provider. |
| [`aws-s3`](/providers/aws-s3) | `AwsS3ServiceProvider` | S3 storage provider for uploads and presigned flows. |
| [`command-runner`](/providers/command-runner) | `CommandRunnerServiceProvider` | Generic shell/binary command execution with timeout, dry-run, and masking support. |
| [`crypto`](/providers/crypto) | `CryptoServiceProvider` | Symmetric encryption helpers. |
| [`db`](/providers/db) | `DBServiceProvider` | Database connectors for PostgreSQL and SQLite sessions. |
| [`docker`](/providers/docker) | `DockerServiceProvider` | Docker CLI automation for image, container and compose workflows. |
| [`files`](/providers/files) | `FileServiceProvider` | File, text, JSON and YAML handlers. |
| [`git`](/providers/git) | `GitServiceProvider` | Local Git repository automation with safe commit defaults. |
| [`github`](/providers/github) | `GitHubServiceProvider` | GitHub API operations for issues, pull requests, checks and workflows. |
| [`hashing`](/providers/hashing) | `HasherServiceProvider` | Password hashing and verification utilities. |
| [`http`](/providers/http) | `HttpServiceProvider` | HTTP invoker for outbound API requests. |
| [`iac`](/providers/iac) | `IaCServiceProvider` | Terraform-based IaC planning/apply workflows with approval guardrails. |
| [`job-ops`](/providers/job-ops) | `JobOpsServiceProvider` | Typed job queue status/list/run/failed/retry operations. |
| [`jwt`](/providers/jwt) | `JWTServiceProvider` | JWT signing and validation utilities. |
| [`k8s`](/providers/k8s) | `K8sServiceProvider` | Kubernetes operations provider over kubectl. |
| [`logger`](/providers/logger) | `LoggerServiceProvider` | Database-backed application logger. |
| [`local-e2e`](/providers/local-e2e) | `LocalE2EServiceProvider` | Local E2E runner for process, HTTP, jobs and persistence checks. |
| [`mailing`](/providers/mailing) | `SenderServiceProvider` | SMTP email sender utilities. |
| [`mcp`](/providers/mcp) | `MCPServiceProvider` | Local MCP-style tool server endpoints for discovery and invocation. |
| [`n8n`](/providers/n8n) | `N8NServiceProvider` | Trigger n8n workflows and poll execution status. |
| [`notifications`](/providers/notifications) | `NotificationsServiceProvider` | Console or webhook operational notifications. |
| [`observability`](/providers/observability) | `ObservabilityServiceProvider` | Metrics, events and trace sink abstraction with local backend. |
| [`process-supervisor`](/providers/process-supervisor) | `ProcessSupervisorServiceProvider` | Local detached process management with persisted metadata, logs and health checks. |
| [`queue-ops`](/providers/queue-ops) | `QueueOpsServiceProvider` | Local pending/requeue/dead-letter queue operations. |
| [`rss`](/providers/rss) | `RSSServiceProvider` | RSS feed reader provider. |
| [`runtime-router`](/providers/runtime-router) | `RuntimeRouterServiceProvider` | Runtime HTTP route registration and serving provider. |
| [`secrets`](/providers/secrets) | `SecretsServiceProvider` | Secret retrieval from env and local JSON backends. |
| [`ssh`](/providers/ssh) | `SSHServiceProvider` | Remote SSH command execution and file transfer workflows. |
| [`templates`](/providers/templates) | `TemplateServiceProvider` | Template rendering provider. |
| [`terminal`](/providers/terminal) | `TerminalRuntime` | Interactive terminal IO bridge for prompt/print during script execution. |
| [`vector-db`](/providers/vector-db) | `VectorDbServiceProvider` | Vector storage and similarity query provider. |

## Deep dives

- [DB Provider](/providers/db)
- [Docker Provider](/providers/docker)
- [Git Provider](/providers/git)
- [Mailing Provider](/providers/mailing)
- [Logger Provider](/providers/logger)
- [HTTP Provider](/providers/http)
- [Files Provider](/providers/files)
- [JWT Provider](/providers/jwt)
- [Crypto Provider](/providers/crypto)
- [Secrets Provider](/providers/secrets)
- [Runtime Router Provider](/providers/runtime-router)
- [AWS Dynamo Provider](/providers/aws-dynamo)
- [AWS S3 Provider](/providers/aws-s3)
- [Command Runner Provider](/providers/command-runner)
- [Hashing Provider](/providers/hashing)
- [SSH Provider](/providers/ssh)
- [Terminal Runtime](/providers/terminal)
- [GitHub Provider](/providers/github)
- [AI Provider](/providers/ai)
- [AI LLM Ops Provider](/providers/ai-llm-ops)
- [AWS Deploy Provider](/providers/aws-deploy)
- [MCP Provider](/providers/mcp)
- [Notifications Provider](/providers/notifications)
- [Observability Provider](/providers/observability)
- [Process Supervisor Provider](/providers/process-supervisor)
- [Queue Ops Provider](/providers/queue-ops)
- [K8s Provider](/providers/k8s)
- [IaC Provider](/providers/iac)
- [Job Ops Provider](/providers/job-ops)
- [Local E2E Provider](/providers/local-e2e)
- [Vector DB Provider](/providers/vector-db)
- [n8n Provider](/providers/n8n)
- [Templates Provider](/providers/templates)
- [RSS Provider](/providers/rss)
