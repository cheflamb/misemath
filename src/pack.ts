import type { PackRounding } from './types';

/**
 * Round a raw weight UP to whole buyable packs (never under-buy). `packs` is 0 when nothing is
 * needed, else `ceil(grams / packSizeG)`. `orderPacksG` is the weight you actually end up buying.
 * Pure.
 */
export function roundToPacks(grams: number, packSizeG: number): PackRounding {
  const packs = grams <= 0 ? 0 : Math.ceil(grams / packSizeG);
  return { packs, orderPacksG: packs * packSizeG };
}
