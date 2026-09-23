# Kairn

Kairn is the safety and policy firewall for autonomous agents. It inspects an agent's proposed tool action before execution and returns an explainable `allow`, `pause`, or `reject` decision.

## MVP architecture

```text
Agent -> Kairn API -> normalize -> policy checks -> SERV reasoning -> decision
                                      |                         |
                                      +------ audit log --------+
```

The first vertical slice is intentionally dependency-free: it provides a local API and dashboard-ready decision model before adding the OpenServ SDK and MCP gateway.

## Run

```bash
npm run check
npm start
```

Open http://localhost:8787. Send a sample action with `POST /api/evaluate`.

## Roadmap

- Add SERV Reasoning adapter.
- Add MCP tool-call interception.
- Add persistent audit storage.
- Add signed approvals and wallet/payment policies.
