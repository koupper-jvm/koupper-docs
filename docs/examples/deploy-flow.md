# Deploy Flow

Secure remote deployment flow with checksum and token auth.

## 1) Set token

```bash
export KOUPPER_OCTOPUS_TOKEN="your-remote-daemon-token"
```

## 2) Deploy script

```bash
koupper deploy examples/hello-world.kts "10.0.0.50"
```

## 3) Alternative destination formats

```bash
koupper deploy examples/hello-world.kts "10.0.0.50:9999"
koupper deploy examples/hello-world.kts "user@10.0.0.50:9999"
```

## Notes

- deploy validates auth token + payload checksum.
- daemon can enforce max deploy payload size.
- pass additional args after destination to forward execution params.
