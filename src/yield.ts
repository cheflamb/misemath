/**
 * The two-loss chain: finished edible grams → raw as-purchased grams.
 *
 *   raw = finishedG ÷ cookYield ÷ cutYield
 *
 * `cookYield` undoes the cooking shrink (rawFromCooked); `cutYield` undoes the
 * fabrication/trim loss (apNeeded). Handles cookYield > 1 (e.g. rice gaining
 * water ≈ 3.0). Pure — the heart of the kernel, shared by every demand adapter.
 */
export function finishedToRaw(finishedG: number, cookYield: number, cutYield: number): number {
  return finishedG / cookYield / cutYield;
}
