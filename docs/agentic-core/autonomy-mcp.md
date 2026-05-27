# Autonomy (ReAct & MCP)

Koupper agents are not just chat bots; they are **Autonomous Workers**. They can interact with the real world using Koupper's entire ecosystem of Service Providers via the **ReAct (Reason, Act, Observe) loop**.

## The ReAct Loop

When an agent needs more information or needs to perform an action, it enters a multi-turn cycle:

1. **Reason**: The LLM decides which tool it needs (e.g., "I need to read a file").
2. **Act**: The **Agent Orchestrator** pauses the inference, executes the tool, and captures the result.
3. **Observe**: The result is re-injected into the LLM's conversation history as an "Observation".
4. **Repeat**: The LLM continues reasoning based on the new data until it reaches a final conclusion.

## Model Context Protocol (MCP)

Koupper integrates the **MCP standard** to manage tools. Any Service Provider registered in Koupper's global tool catalog is automatically usable by the agents.

### Key Benefits
- **Dynamic Discovery**: Agents automatically "learn" about new tools added to the framework.
- **Strict Typing**: MCP tools provide JSON Schemas, ensuring the LLM calls them with the correct arguments.
- **Safety**: Tools execute with the same permissions and context as any other Koupper script.

## Example: Native Tool-Calling

```kotlin
val agentDef = agent {
    name = "auditor"
    
    tools {
        use("file-handler") // Registers the file-handler tool in MCP
    }

    task<Report> {
        prompt = "Read the config.json file and tell me if the DB port is open."
    }
}
```

In this example, the orchestrator will:
1. Detect that the LLM wants to use `file-handler`.
2. Map the request to the `FileHandlerImpl` native provider.
3. Pass the file contents back to the LLM.
4. Return the final `Report` once the LLM finishes analyzing the data.

---

[Home: Agentic Core Overview](./)
