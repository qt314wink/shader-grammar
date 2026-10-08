# Changelog

## Unreleased

- `npm run validate` is now read-only. Timestamped reports require
  `npm run validate:report`; parent-workspace bundle/public output requires
  `npm run emit:workspace`.
- Added a regression test that proves default validation leaves generated-output
  targets unchanged.
- Added two scoped v0.2 build orders: typed graph ports first, then calibrated
  spectral/dispersion data.

## 0.1.1 — 2026-09-01

Nacre Atelier as the living explorer.

- `docs/ATELIER.md` describes Look / Fuse / Proof.
- The atelier drives one shader from operator weights. Fusion mixes two recipes.
- No schema changes. v0.1 catalog unchanged.

## 0.1.0 — 2026-08-31

First closed catalog.

- Four JSON Schemas: parameter, field, operator, recipe.
- `taxonomy/material-taxonomy.yaml` classifies by optical mechanism.
- Thirteen reusable operators. No specimen-named operators.
- Twelve specimen recipes composed from those operators.
- Validator rejects `oilSlick: true` and requires ≥2-specimen reuse.
- Ontology-gap register for polarization, photonic crystals, inelastic scatter, BSSRDF, spectral metal IOR.
