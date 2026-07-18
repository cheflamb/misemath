# MiseMath Handoff
_Last updated: 2026-07-15 — `@misemath/engine` v0.1.0 created, tested, pushed, tagged. Shared yield kernel is live and consumable; no consumer wired to it yet._

## 1. Status
- **Live: `@misemath/engine` v0.1.0 (2026-07-15).** The deterministic culinary yield kernel — pure, unit-tested functions shared by BanquetOS and AlaCarteOS. Extracted behavior-identical from `banquetos/src/model/`.
- **Tests green:** 24 vitest cases (`finishedToRaw`, units, `roundToPacks`, buffer). `tsc --noEmit` clean. `tsc` build emits `dist/` (`.js` + `.d.ts` + maps).
- **Repo:** `main` @ `8a108ad`, tag **`v0.1.0`**, pushed to origin, working tree clean.
- **Consumers wired: none yet.** Neither BanquetOS (E2) nor AlaCarteOS (E3) imports it. Until BanquetOS does, the yield math is still duplicated (the fork-of-truth the extraction exists to remove).
- **Scope: thin kernel by design.** Only the primitives both apps use. Demand forecasting, the recipe-tree (composed recipes), and app-specific coefficient *values* deliberately stay in the apps.

## 2. Wiring map
_Pure npm package distributed as a git dependency — no host, no data store, no runtime services._

| Asset | Repo @ branch | Host / URL | Data store | External services / IDs |
|---|---|---|---|---|
| `@misemath/engine` | **github.com/cheflamb/misemath** @ `main` (`8a108ad`), tag `v0.1.0` — **private** | n/a (package; not deployed) | n/a | consumed via git dep `github:cheflamb/misemath#v0.1.0`; `prepare` builds `dist/` on install |
| Local checkout | same | `F:\WORK\chef-life-media\projects\misemath` | n/a | `npm test` · `npm run build` · `npm run typecheck` |
| Provenance (source) | github.com/cheflamb/banquetos @ `main` | n/a | n/a | extracted from `src/model/{yield,units,buffer,lists}.ts` |

Git author: `cheflamb`. `gh` CLI authed. Repo private.

## 3. Open threads / next actions
1. **E2 — BanquetOS consumes the kernel (not started; touches the LIVE repo, needs owner go).** Add the git dep; replace local `finishedToRaw`/units/`roundToPacks`/newsvendor-core with imports; delete the moved code; keep the recipe-tree + the typed buffer wrapper (`bufferFraction` calls `newsvendorBuffer`). **All 210 BanquetOS tests must stay green** — that's the proof the move preserved behavior. ⚠️ Sequence after BanquetOS's open branches (`feat/prep-multiplier-print-help`, `feat/cloud-sync-phase-0-1`) merge to `main` — avoids a `src/model/` merge collision.
2. **E3 — AlaCarteOS consumes the kernel (not started).** Part of AlaCarteOS Phase 1; needs its app scaffold first. Golden fixtures already mirrored in AlaCarteOS `docs/TESTING.md`.
3. **Version-drift note.** Git-dep pins let the two apps sit on different tags. Fine now; bump the tag on any kernel change and update consumers deliberately. No registry/publish pipeline (git-dep by choice); graduate to GitHub Packages only if it grows.
4. **`prepare`-on-install caveat.** Consumers installing the git dep build via the `prepare` hook (needs devDeps: typescript). If a consumer's CI installs with `--omit=dev` in a way that skips `prepare`, ship built `dist/` on the tag instead. Watch for it when E2/E3 wire up.

## 4. Changelog (recent first)
- **2026-07-15:** `8a108ad` — `feat: MiseMath yield kernel v0.1.0`. Scaffolded package (TS + vitest + tsc build, ESM, exports map). Ported `units.ts` whole; lifted `finishedToRaw` (yield.ts), `roundToPacks` (lists.ts), newsvendor core (buffer.ts); added `zForServiceLevel` (Acklam inverse-normal). Generalized `toGrams`'s `Ingredient` param to structural `WeightSource`. 24 tests green. Tagged `v0.1.0`, pushed. Repo created private.

## 5. Pointers
- **What/why/how:** `README.md` (public surface + git-dep usage). **Extraction rationale + phases:** `alacarteos/docs/MISEMATH_EXTRACTION.md`.
- **Public API:** `src/index.ts`. **Golden fixtures:** `src/yield.test.ts`, `src/pack.test.ts` (Fidel's flank/chicken pools, pack rounding), `src/buffer.test.ts` (z-quantiles).
- **Provenance:** BanquetOS `src/model/{yield,units,buffer,lists}.ts`. Behavior identical; when BanquetOS wires E2, its 210 tests are the regression gate.
- **Sibling handoffs:** `alacarteos/HANDOFF.md`, `banquetos/HANDOFF.md`. Memory `[[alacarteos-sibling-app]]` (covers the kernel).
