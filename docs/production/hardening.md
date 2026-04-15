# Production Hardening

Use these defaults when exposing Octopus-backed workflows beyond local development.

## Baseline

- require daemon token auth
- keep loopback binding unless remote access is intentional
- apply firewall restrictions to Octopus port
- keep deploy payload guardrails enabled

## Key environment variables

```bash
export KOUPPER_OCTOPUS_TOKEN="replace-with-strong-token"
export KOUPPER_OCTOPUS_HOST="127.0.0.1"
export KOUPPER_OCTOPUS_PORT="9998"
export KOUPPER_OCTOPUS_DEPLOY_MAX_BYTES="262144"
```

## Deploy safeguards

- checksum validation (`contentSha256`)
- payload max-size validation
- script name safety checks

## Operational recommendations

- run daemon with a service manager (systemd or equivalent)
- rotate tokens regularly
- monitor auth rejections and deploy failures
- validate with smoke commands after each release

For full hardening details in the main repository, also review:

- `docs/PRODUCTION_HARDENING.md`
