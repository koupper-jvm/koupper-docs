# `koupper deploy`

Push local scripts to a remote Octopus daemon.

## Basic usage

```bash
koupper deploy examples/hello-world.kts "127.0.0.1:9998"
```

## Required security context

```bash
export KOUPPER_OCTOPUS_TOKEN="your-daemon-token"
```

Deploy protections include:

- auth token validation
- payload checksum (`contentSha256`)
- max payload-size guardrails

## Runtime host/port overrides

```bash
export KOUPPER_OCTOPUS_HOST="127.0.0.1"
export KOUPPER_OCTOPUS_PORT="9998"
```

JVM property alternatives are also supported (`koupper.octopus.host`, `koupper.octopus.port`, `koupper.octopus.token`).
