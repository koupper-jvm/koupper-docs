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

- `db` - Database connectors for PostgreSQL and SQLite sessions.
- `mailing` - SMTP email sender utilities.
- `logger` - Database-backed application logger.
- `http` - HTTP invoker for outbound API requests.
- `files` - File, text, JSON and YAML handlers.
- `jwt` - JWT signing and validation utilities.
- `crypto` - Symmetric encryption helpers.
- `aws-dynamo` - DynamoDB data access provider.
- `aws-s3` - S3 storage provider for uploads and presigned flows.
- `hashing` - Password hashing and verification utilities.
- `github` - GitHub API operations for issues, pull requests, checks and workflows.
- `ai` - AI model integration provider (OpenAI by default).
- `templates` - Template rendering provider.
- `rss` - RSS feed reader provider.

## Deep dives

- [GitHub Provider](/providers/github)
