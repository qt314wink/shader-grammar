#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(ROOT, "experiments/controlled-thin-film/reference-spectrum.json");
const wavelengthsNm = Array.from({ length: 31 }, (_, index) => 400 + index * 10);
const parameters = { nIncident: 1.0, nFilm: 1.4, nExit: 1.5, thicknessNm: 250 };

function reflectance({ nIncident, nFilm, nExit, thicknessNm }, wavelengthNm) {
  const r01 = (nIncident - nFilm) / (nIncident + nFilm);
  const r12 = (nFilm - nExit) / (nFilm + nExit);
  const phase = (4 * Math.PI * nFilm * thicknessNm) / wavelengthNm;
  const numerator = r01 ** 2 + r12 ** 2 + 2 * r01 * r12 * Math.cos(phase);
  const denominator = 1 + (r01 * r12) ** 2 + 2 * r01 * r12 * Math.cos(phase);
  return numerator / denominator;
}

const payload = {
  artifact_id: "evidence-controlled-thin-film-spectrum-001",
  kind: "controlled_reference_spectrum",
  method: "normal-incidence two-interface dielectric-film reflectance",
  wavelength_unit: "nm",
  samples: wavelengthsNm.map((wavelength_nm) => ({ wavelength_nm, reflectance: reflectance(parameters, wavelength_nm) })),
  provenance: {
    source: "deterministic controlled benchmark",
    generation_parameters_disclosed_for_audit: parameters,
    caution: "This is a controlled benchmark, not a photograph or a claim about real-world material identity."
  }
};
payload.sha256 = crypto.createHash("sha256").update(JSON.stringify(payload.samples)).digest("hex");
fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${out}`);
