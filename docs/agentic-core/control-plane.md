# Control Plane (REST & SSE)

Koupper's Agentic Core is not a "black box". It exposes its internal state and execution engine via a built-in REST API, allowing you to build UIs or monitoring tools on top of it.

## The Global Bridge

To bypass ClassLoader isolation, Koupper uses a **Global Route Registry**. This ensures that endpoints registered within a script are immediately visible to the framework's native web server (Grizzly).

## Available Endpoints

### 1. Hardware Budget
`GET /api/v1/system/budget`

Returns a JSON representation of the current `AgentBudget`. Useful for showing system health and capacity in a dashboard.

**Example Response:**
```json
{
  "tier": "CPU_OPTIMIZED",
  "maxConcurrentAgents": 3,
  "telemetry": {
    "physicalCores": 4,
    "totalRamGb": 16.0,
    "freeRamGb": 8.5
  }
}
```

### 2. Run Agent
`POST /api/v1/agents/run`

Dispatches a new agent task to the orchestrator. This call is asynchronous; it returns an `accepted` status and a `taskId` immediately.

**Payload:**
```json
{
  "name": "researcher-01",
  "role": "Data Analyst",
  "goal": "Analyze recent logs",
  "prompt": "Check the last 10 lines of system.log"
}
```

### 3. Real-time Streaming (SSE)
`GET /api/v1/agents/stream/{taskId}`

A **Server-Sent Events (SSE)** endpoint. Once subscribed, you will receive tokens in real-time as the agent "thinks" and generates its response.

## Built-in SSE Support

Unlike standard Request-Response models, Koupper's web server supports **Suspended Responses**. This allows the framework to keep the HTTP connection open and push data fragments as they arrive from the `InferenceEngine`.

---

[Next: Autonomy (ReAct & MCP)](./autonomy-mcp)
