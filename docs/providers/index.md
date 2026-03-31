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
| [`db`](/providers/db) | `DBServiceProvider` | Database connectors for PostgreSQL and SQLite sessions. |
| [`mailing`](/providers/mailing) | `SenderServiceProvider` | SMTP email sender utilities. |
| [`logger`](/providers/logger) | `LoggerServiceProvider` | Database-backed application logger. |
| [`http`](/providers/http) | `HttpServiceProvider` | HTTP invoker for outbound API requests. |
| [`files`](/providers/files) | `FileServiceProvider` | File, text, JSON and YAML handlers. |
| [`jwt`](/providers/jwt) | `JWTServiceProvider` | JWT signing and validation utilities. |
| [`crypto`](/providers/crypto) | `CryptoServiceProvider` | Symmetric encryption helpers. |
| [`aws-dynamo`](/providers/aws-dynamo) | `AwsServiceProvider` | DynamoDB data access provider. |
| [`aws-s3`](/providers/aws-s3) | `AwsS3ServiceProvider` | S3 storage provider for uploads and presigned flows. |
| [`hashing`](/providers/hashing) | `HasherServiceProvider` | Password hashing and verification utilities. |
| [`github`](/providers/github) | `GitHubServiceProvider` | GitHub API operations for issues, pull requests, checks and workflows. |
| [`ai`](/providers/ai) | `AIServiceProvider` | AI model integration provider (OpenAI by default). |
| [`templates`](/providers/templates) | `TemplateServiceProvider` | Template rendering provider. |
| [`rss`](/providers/rss) | `RSSServiceProvider` | RSS feed reader provider. |

## Deep dives

- [DB Provider](/providers/db)
- [Mailing Provider](/providers/mailing)
- [Logger Provider](/providers/logger)
- [HTTP Provider](/providers/http)
- [Files Provider](/providers/files)
- [JWT Provider](/providers/jwt)
- [Crypto Provider](/providers/crypto)
- [AWS Dynamo Provider](/providers/aws-dynamo)
- [AWS S3 Provider](/providers/aws-s3)
- [Hashing Provider](/providers/hashing)
- [GitHub Provider](/providers/github)
- [AI Provider](/providers/ai)
- [Templates Provider](/providers/templates)
- [RSS Provider](/providers/rss)
