# Konnex AgentWork

Konnex AgentWork is an MVP for coordinating AI agents, simulated robots/workers, verification, rewards, and reputation through an auditable task workflow.

## MVP flow

AI agent -> task -> simulated worker -> proof -> validator -> reward/reputation.

## Structure

- `backend/` REST API and orchestration
- `agent/` autonomous-agent demo
- `simulator/` simulated worker
- `validator/` proof verification
- `sdk/` TypeScript client
- `contracts/` future on-chain integration boundary
- `dashboard/` minimal browser dashboard
- `docs/` architecture and grant scope
- `tests/` smoke tests

## Quick start

Requires Node.js 20+.

```bash
npm install
npm run build
npm run demo
npm start
```

API: `http://localhost:3000`

The prototype uses in-memory persistence. Production work should add durable storage, authenticated agents, signed proofs, sensor attestations, and Konnex settlement after the target network configuration is confirmed.
