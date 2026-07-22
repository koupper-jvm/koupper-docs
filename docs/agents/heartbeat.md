# CORTEX Heartbeat Conditions
# Each condition block defines when to dispatch an agent automatically.
# HeartbeatAgent evaluates these on every run (every 60 s via koupper-start.sh).

## Condition: morning-digest
- when: time_after
- target: 08:00
- agent: RssFeedAgent.kts
- queue: default
- cooldown: 720

## Condition: failed-jobs-alert
- when: queue_has_failed
- target: default
- agent: GreetingAgent.kts
- queue: default
- cooldown: 60

## Condition: nightly-cleanup
- when: time_after
- target: 23:00
- agent: DiskCleanerAgent.kts
- queue: default
- cooldown: 720
