import type { Unit, UnitSystem, WeightSource } from './types';

export const OZ_G = 28.349523125;
export const LB_G = 453.59237;
export const KG_G = 1000;
export const TSP_ML = 4.92892159375;
export const TBSP_ML = 14.78676478;
export const CUP_ML = 236.5882365;
export const QT_ML = 946.352946;
export const GAL_ML = 3785.411784;
export const L_ML = 1000;

const WEIGHT_TO_G: Partial<Record<Unit, number>> = { g: 1, kg: KG_G, oz: OZ_G, lb: LB_G };
const VOLUME_TO_ML: Partial<Record<Unit, number>> = { ml: 1, l: L_ML, tsp: TSP_ML, tbsp: TBSP_ML, cup: CUP_ML };

/** Convert a quantity to grams (the internal unit). Pure.
 * Weight units resolve directly; volume/`each` units need `src` (density / gramsPerUnit). */
export function toGrams(qty: number, unit: Unit, src?: WeightSource): number {
  const w = WEIGHT_TO_G[unit];
  if (w !== undefined) return qty * w;

  const v = VOLUME_TO_ML[unit];
  if (v !== undefined) {
    const density = src?.densityGPerMl;
    if (density === undefined) {
      throw new Error(`toGrams: volume unit "${unit}" requires src.densityGPerMl`);
    }
    return qty * v * density;
  }

  if (unit === 'each') {
    const gpu = src?.gramsPerUnit;
    if (gpu === undefined) {
      throw new Error(`toGrams: "each" requires src.gramsPerUnit (piece item is count-based)`);
    }
    return qty * gpu;
  }

  throw new Error(`toGrams: unsupported unit "${unit}"`);
}

/** Grams → a target weight unit's numeric value (no formatting). Pure. */
export function fromGrams(grams: number, unit: Unit): number {
  const w = WEIGHT_TO_G[unit];
  if (w === undefined) throw new Error(`fromGrams: unsupported weight unit "${unit}"`);
  return grams / w;
}

/** System-aware weight display string. */
export function formatWeight(grams: number, system: UnitSystem): string {
  if (system === 'metric') {
    return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
  }
  return grams >= LB_G ? `${(grams / LB_G).toFixed(1)} lb` : `${(grams / OZ_G).toFixed(1)} oz`;
}

/**
 * Buyable/orderable weight — rounds UP to a whole purchasing unit (never under-buy). Used for the
 * actionable number on a purchase line; the exact raw stays visible beneath it.
 */
export function formatBuyable(grams: number, system: UnitSystem): string {
  if (system === 'metric') {
    if (grams >= 1000) return `${(Math.ceil(grams / 100) / 10).toFixed(1)} kg`; // up to nearest 100 g
    return `${Math.ceil(grams)} g`;
  }
  if (grams >= LB_G) return `${Math.ceil(grams / LB_G)} lb`;
  return `${Math.ceil(grams / OZ_G)} oz`;
}

/** System-aware volume display string (exact). */
export function formatVolume(ml: number, system: UnitSystem): string {
  if (system === 'metric') {
    return ml >= 1000 ? `${(ml / 1000).toFixed(2)} L` : `${Math.round(ml)} ml`;
  }
  if (ml >= GAL_ML) return `${(ml / GAL_ML).toFixed(2)} gal`;
  if (ml >= QT_ML) return `${(ml / QT_ML).toFixed(2)} qt`;
  if (ml >= CUP_ML) return `${(ml / CUP_ML).toFixed(2)} cup`;
  if (ml >= TBSP_ML) return `${(ml / TBSP_ML).toFixed(1)} tbsp`;
  return `${(ml / TSP_ML).toFixed(1)} tsp`;
}

/** Buyable volume — rounds UP to a whole purchasing unit (gallon/quart on US, litre on metric). */
export function formatBuyableVolume(ml: number, system: UnitSystem): string {
  if (system === 'metric') {
    if (ml >= 1000) return `${(Math.ceil(ml / 100) / 10).toFixed(1)} L`;
    return `${Math.ceil(ml)} ml`;
  }
  if (ml >= GAL_ML) return `${Math.ceil(ml / GAL_ML)} gal`;
  if (ml >= QT_ML) return `${Math.ceil(ml / QT_ML)} qt`;
  return `${Math.ceil(ml / CUP_ML)} cup`;
}
