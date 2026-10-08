# Build orders — Shader Grammar v0.2 foundation

These are bounded build orders, not claims that the listed physics has already
been implemented. Each one must preserve the v0.1 rule: material names belong
in specimens and taxonomy aliases, never in operator IDs or effect booleans.

## Build order 01 — deterministic validation and explicit artifact emission

**State:** delivered locally; awaiting review and normal repository handoff.

**Purpose:** Separate validation evidence from generated artifacts. A passing
validation command must not create an accidental report-only commit or mutate a
neighboring consumer workspace.

**Delivered contract:**

- `npm run validate` reads and validates only.
- `npm run validate:report` is the explicit timestamped-report action.
- `npm run emit:workspace` is the explicit parent-workspace artifact action.
- `npm run test:validate-read-only` hashes generated-output targets before and
  after ordinary validation, then fails if any changed.

**Acceptance evidence:** default validation and the read-only regression test
pass while `git diff --exit-code` remains clean.

## Build order 02 — typed ports and graph integrity

**Purpose:** Make an operator graph enforceable rather than merely descriptive.

**Scope:**

- Replace the current broad field-reference convention with named input/output
  ports carrying a declared value kind, domain, and unit dimension.
- Require every operator input to resolve to one compatible producer or an
  allowed recipe input.
- Reject missing inputs, dangling references, incompatible port kinds/domains,
  duplicate output names, and cycles unless an explicitly declared feedback
  operator permits them.
- Keep the thirteen v0.1 operator identities; introduce no material-named
  operators and no renderer claim.

**Fixtures and gates:**

- One valid migration fixture for each of the twelve specimens.
- Negative controls for an unknown port, a `float` to `spectrum` mismatch, a
  domain/unit mismatch, a missing required input, and a cycle.
- Validator output records graph integrity separately from schema validity.

**Done means:** all existing recipes migrate, every negative control fails for
the intended reason, and no graph rule is silently downgraded to a warning.

## Build order 03 — spectral tables and dispersion with provenance

**Purpose:** Make `spectral` parameters usable for calibrated data without
turning arbitrary numbers into unsupported physical claims.

**Scope:**

- Define a reusable spectral-table shape: wavelength unit, strictly increasing
  samples, value kind (`n`, `k`, IOR, absorption, or emission), interpolation,
  source identity, and confidence/provenance status.
- Bind spectral complex-IOR data to `fresnel-conductor` and wavelength-varying
  IOR data to refraction/dispersion consumers.
- Add at least two mechanism-sharing fixtures (for example, a conductor and a
  dispersive dielectric) so the table is a grammar primitive, not a bismuth- or
  rainbow-only exception.
- Preserve the distinction between an analytic evaluator and a renderer. No
  visual-fidelity claim is accepted without calibrated measurement evidence.

**Fixtures and gates:**

- Positive tables with monotonic wavelengths and declared source metadata.
- Negative controls for duplicate/descending wavelengths, incompatible value
  kinds, missing units, and unsupported promotion of unverified source data.
- A deterministic analytic comparison with stated wavelength samples and error
  metric; the receipt records its scope and provenance.

**Done means:** spectral data validates structurally and semantically, at least
two recipes reuse the primitive, invalid/provenance-poor data is rejected, and
the report states exactly what was measured rather than implying renderer
fidelity.
