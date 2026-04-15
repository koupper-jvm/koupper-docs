# `koupper deploy`

Push local scripts to a remote Octopus daemon.

## Usage

```bash
koupper deploy <script.kts> <host[:port]>
```

Examples:

```bash
koupper deploy examples/hello-world.kts "127.0.0.1:9998"
koupper deploy examples/hello-world.kts "user@10.0.0.50:9999"
```

## Required security context

```bash
export KOUPPER_OCTOPUS_TOKEN="your-daemon-token"
```

Deploy protections include:

- auth token validation
- payload checksum (`contentSha256`)
- max payload-size guardrails

## Destination format

- `host` -> defaults to port `9998`
- `host:port`
- `user@host`
- `user@host:port`

## Additional params

Any extra arguments after destination are forwarded as execution params for deployed script:

```bash
koupper deploy examples/hello-world.kts "10.0.0.50" '{"source":"deploy"}'
```

## Runtime host/port/token overrides

```bash
export KOUPPER_OCTOPUS_HOST="127.0.0.1"
export KOUPPER_OCTOPUS_PORT="9998"
export KOUPPER_OCTOPUS_TOKEN="your-daemon-token"
```

JVM property alternatives are also supported (`koupper.octopus.host`, `koupper.octopus.port`, `koupper.octopus.token`).
