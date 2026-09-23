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

To connect a live SERV reasoning endpoint, provide `SERV_REASONING_URL` and
`SERV_API_KEY`. Without them, Kairn uses its deterministic local policy engine.

## Judging-focused demo

Use `POST /api/intercept` to demonstrate the core wedge: an agent proposes a tool action, Kairn inspects the payment, recipient, and requested data, then either forwards, pauses, or rejects it. Use `POST /api/approval` to resolve a paused action. This directly demonstrates user-readiness and an enterprise revenue path: per-agent policy enforcement and audit API.

## Backend environment

Required: `KAIRN_API_SECRET`. Optional: `MCP_TARGET_URL`, `SERV_REASONING_URL`, `SERV_API_KEY`, `KAIRN_MAX_PAYMENT`, and `KAIRN_AUDIT_FILE`.

Health check: `GET /api/health`. Protected routes require the `x-kairn-secret` header. The MCP target is intentionally configured by deployment rather than hardcoded.

## Roadmap

- Add SERV Reasoning adapter.
- Add MCP tool-call interception.
- Add persistent audit storage.
- Add signed approvals and wallet/payment policies.
