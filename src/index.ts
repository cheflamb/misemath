/**
 * @misemath/engine — the deterministic culinary yield kernel.
 *
 * Pure, unit-tested functions shared by every demand adapter (BanquetOS, AlaCarteOS).
 * The kernel knows nothing about demand — it answers "given N finished portions, how much
 * raw?" and the unit/pack/buffer arithmetic around that. Demand adapters own the forecast
 * and call in here for the conversion.
 */
export { finishedToRaw } from './yield.js';
export {
  toGrams,
  fromGrams,
  formatWeight,
  formatBuyable,
  formatVolume,
  formatBuyableVolume,
  OZ_G,
  LB_G,
  KG_G,
  TSP_ML,
  TBSP_ML,
  CUP_ML,
  QT_ML,
  GAL_ML,
  L_ML,
} from './units.js';
export { roundToPacks } from './pack.js';
export { newsvendorBuffer, zForServiceLevel } from './buffer.js';
export type { Unit, UnitSystem, WeightSource, PackRounding } from './types.js';
