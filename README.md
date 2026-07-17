# @misemath/engine

The deterministic culinary **yield kernel** shared by [BanquetOS](https://banquetos.cheflifemedia.com) and AlaCarteOS.

One question, every product: *given N finished portions of a protein at a given size, how much raw do I buy?* This package answers the conversion — and the unit, pack, and buffer arithmetic around it — as **pure, unit-tested functions**. It knows nothing about demand. Each app owns its own forecast (headcount × take-rate for BanquetOS; covers × sales-mix for AlaCarteOS) and calls in here for the math, so the two apps can never fork the truth.

## Public surface (v0.1)
```ts
import { finishedToRaw, toGrams, roundToPacks, newsvendorBuffer } from '@misemath/engine';

// the two-loss chain: finished edible grams → raw as-purchased grams
finishedToRaw(23740, 0.70, 0.85);        // ≈ 39,899 g  (÷ cook ÷ cut; handles cook > 1)

// unit math (grams are the internal source of truth)
toGrams(4, 'oz');                        // 113.4
roundToPacks(39899, 9072);               // { packs: 5, orderPacksG: 45360 }

// newsvendor safety buffer: B* = z(SL) × CV
newsvendorBuffer(zForServiceLevel(0.95), 0.10); // ≈ 0.1645
```
Also exports: `fromGrams`, `formatWeight`, `formatBuyable`, `formatVolume`, `formatBuyableVolume`, `zForServiceLevel`, unit constants, and types `Unit` / `UnitSystem` / `WeightSource` / `PackRounding`.

## Scope
This is the **thin kernel** — only the primitives both apps use. Demand forecasting, the recipe-tree (composed recipes), and app-specific coefficient values live in the apps, not here. See `alacarteos/docs/MISEMATH_EXTRACTION.md` for the extraction rationale.

## Use (git dependency)
```jsonc
// package.json
"dependencies": { "@misemath/engine": "github:cheflamb/misemath#v0.1.0" }
```
Installing from git runs `prepare` (tsc build), so `dist/` is available to the consumer's bundler.

## Develop
```
npm install
npm test        # vitest — 24 cases
npm run build   # tsc → dist/ (.js + .d.ts)
npm run typecheck
```

## Provenance
Extracted from `banquetos/src/model/` (`yield.ts`, `units.ts`, `buffer.ts`, `lists.ts`). Behavior is identical to the BanquetOS originals; the golden fixtures (Fidel's flank/chicken pools, pack rounding) are pinned in the tests.
