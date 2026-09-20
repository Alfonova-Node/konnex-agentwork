# Architecture

AI Agent -> Task API -> Task Store -> Worker/Robot -> Proof -> Validator -> Reward + Reputation -> future Konnex settlement.

The simulator is intentionally untrusted. The validator recomputes a SHA-256 digest and checks task identity, worker identity, and completion. Production should add signed proofs, authenticated identities, replay protection, sensor attestations, durable storage, and on-chain finality.
