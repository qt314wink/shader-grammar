# Shader Grammar

**v0.1** — an ontology of shared optical primitives.

Materials are recipes. Recipes bind a closed catalog of operators
(thin-film interference, multilayer Bragg stacks, diffraction gratings,
dielectric and conductor Fresnel, microfacet scatter, Snell refraction,
caustic transport, volume scattering / absorption / emission) to typed
parameters and fields. They do not set `oilSlick: true`.

If oil slick, soap film, nacre, labradorite, butterfly structural color,
holographic foil, bismuth oxide, molten chrome, caustic water, cloud,
nebula, and opalescent glass can all be described without inventing a
one-off concept for each, the ontology is beginning to generalize rather
than cataloguing effects. That is the v0.1 acceptance test, and it passes.

The grammar is the language. **Nacre Atelier** is the lookdev studio that
consumes it: twelve living specimens, operator-driven fusion, and a coverage
matrix that proves reuse. See `docs/ATELIER.md`. The canvas is an evaluative
sketch — not a claim that Airy or Mie are implemented.

## Why this exists

Shader libraries accumulate named looks. Aether (archived) was an
iridescent GLSL gallery — beautiful, and a dead end as an ontology,
because each look was a product. Seed Loom's Visual Grammar Engine
extracts motifs and palettes; it does not know what a nanometer of
optical path is.

Shader Grammar sits under both. A renderer, a lookdev tool, or an agent
should be able to say *this is a two-interface film with thickness field
X and IOR stack (1.0, 1.47, 1.333)* and get oil-on-water without a
preset named oil.

## Package

```
schemas/
  parameter.schema.json
  field.schema.json
  operator.schema.json
  recipe.schema.json
  experiment-receipt.schema.json  governed post-run evidence and handoff contract
taxonomy/material-taxonomy.yaml
catalog/operators.json          closed set of 13 operators
recipes/*.json                  12 specimen recipes
examples/valid/                 positive control
examples/invalid/               named-effect trap (must fail)
examples/valid/minimal-experiment-receipt.json
examples/invalid/*receipt*.json receipt conditional-gate controls
examples/illustrative/          GLSL/WGSL thin-film reference snippets (not a renderer)
docs/ontology-gaps.md
reports/validation-report.md    generated
tools/validate.mjs
```

## The trap this version exists to refuse

```json
{ "id": "oil-slick", "oilSlick": true }
```

is illegal. The legal form binds `thin-film-interference` with a
thickness field and three real IORs, then reuses `caustic-transport`
for the water underneath — the same operators soap film, bismuth oxide,
and caustic water bind with different numbers.

## Validate

```sh
# Validation is read-only: it does not rewrite committed reports or parent-workspace artifacts.
node tools/validate.mjs

# Write timestamped repository reports only when a review or release needs them.
node tools/validate.mjs --write-report

# Emit the consumer bundle and public report into the parent workspace only on purpose.
node tools/validate.mjs --emit-workspace

# Full deterministic experiment sequence.
node tools/generate-controlled-thin-film-reference.mjs
node tools/run-controlled-thin-film-experiment.mjs
node tools/validate.mjs
```

`npm run validate` is intentionally read-only. `npm run validate:report` writes
the two timestamped files under `reports/`; `npm run emit:workspace` writes the
consumer bundle and public report outside this repository. Use those explicit
commands for a release, review artifact, or consumer refresh—not as a side
effect of ordinary validation. `npm run test:validate-read-only` verifies that
the default validator leaves every generated-output target unchanged.

The gate is stronger than schema-valid:

1. Every recipe validates against `recipe.schema.json`.
2. Every operator validates and declares `reusable: true`.
3. No material-named keys or effect booleans.
4. All twelve specimens are present.
5. **Every catalog operator is used by at least two specimens.**
6. The named-effect anti-example is rejected.
7. The minimal thin-film example is accepted.
8. The experiment receipt contract compiles under JSON Schema Draft 2020-12 and rejects an empty receipt.
9. The committed controlled thin-film reconstruction receipt validates after its deterministic experiment is rerun.

The receipt fixture gate also accepts the minimal bounded-observation receipt and
rejects unsupported transitions to `supported`, `canonical`, and `unlocked`
when their evidence or governance prerequisites are missing.

## Experiment receipts

`schemas/experiment-receipt.schema.json` governs the post-run boundary between
visual-mechanism experiments and downstream decisions. It records exact inputs,
actions, outputs, determinations, evidence, uncertainty, alternatives, deviations,
exceptions, measurements, timing, reproducibility, semantic QA, governance,
milestone gates, and handoff requirements.

`supported` is deliberately not equivalent to `canonical`. Canonical changes require
separate approval, verified reproducibility, explicit consequences, and a rollback
plan.

## Controlled reconstruction benchmark

`experiments/controlled-thin-film/` contains one deliberately narrow end-to-end
reconstruction experiment. It persists a normal-incidence reference spectrum,
fits a two-interface thin-film candidate across a preregistered thickness range,
tests that candidate against a least-squares flat-spectrum alternative, repeats
the deterministic fit, and emits `experiment-receipt.json`.

This is a benchmark of the receipt protocol and analytic evaluator—not a claim
that an external image has been reverse engineered, that a real material has
been identified, or that the WebGL atelier is physically validated. The receipt
unlocks only one capture-scoped external-reference experiment; bulk ingestion
and canonical grammar promotion remain forbidden.

## Lineage

- **aether** (archived) — iridescent GLSL product. Ancestor look, not ancestor ontology.
- **seed-loom** — signal-to-system pipeline and Visual Grammar Engine. Pointer lives in `docs/SHADER_GRAMMAR.md` there.
- **prism-loom / omni-loom** — fabrication and prismatic cousins; they consume looks, they should not define them.

Home: [qt314wink/shader-grammar](https://github.com/qt314wink/shader-grammar)

## License

MIT. Physical constants in the specimens are typical published values,
approximate, and documented in `notes` on each parameter.
