/** Units the kernel understands. Weights and volumes; grams are the internal source of truth. */
export type Unit = 'g' | 'kg' | 'oz' | 'lb' | 'each' | 'ml' | 'l' | 'cup' | 'tbsp' | 'tsp';

/** Display preference only — grams stay internal. */
export type UnitSystem = 'us' | 'metric';

/**
 * Minimal structural shape `toGrams` needs to resolve volume- or count-based units.
 * BanquetOS's `Ingredient` satisfies this, so callers pass their existing object unchanged.
 * Weight units (g/kg/oz/lb) never touch it.
 */
export interface WeightSource {
  densityGPerMl?: number; // for volume-measured items (ml/l/cup/tbsp/tsp)
  gramsPerUnit?: number;  // for count-based items ('each')
}

/** Result of rounding a raw weight up to whole buyable packs. */
export interface PackRounding {
  packs: number;
  orderPacksG: number;
}
