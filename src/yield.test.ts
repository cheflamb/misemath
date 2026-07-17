import { describe, it, expect } from 'vitest';
import { finishedToRaw } from './yield';

describe('finishedToRaw', () => {
  it('undoes cook then cut loss: finished ÷ cook ÷ cut', () => {
    // 3000 finished, braise cook 0.60, trim 0.78 → ≈ 6410 raw
    expect(finishedToRaw(3000, 0.6, 0.78)).toBeCloseTo(6410.26, 1);
  });

  it('handles cookYield > 1 (rice gains water ≈ 3.0)', () => {
    expect(finishedToRaw(3000, 3.0, 1.0)).toBeCloseTo(1000, 5);
    expect(finishedToRaw(1000, 3.0, 1.0)).toBeCloseTo(333.333, 3);
  });

  it('is identity when both yields are 1', () => {
    expect(finishedToRaw(500, 1, 1)).toBe(500);
  });

  // AlaCarteOS golden fixture (SEED_DATA.md): Fidel's flank pool, 500 covers
  it('flank pool: 23,740 g finished (cook 0.70, cut 0.85) → ≈ 39,899 g raw', () => {
    const flankFinished = 500 * 0.24 * 113 + 500 * 0.12 * 113 + 500 * 0.08 * 85;
    expect(flankFinished).toBeCloseTo(23740, 0);
    expect(finishedToRaw(flankFinished, 0.7, 0.85)).toBeCloseTo(39899, -1);
  });

  it('chicken pool: 16,340 g finished (cook 0.70, cut 0.72) → ≈ 32,421 g raw', () => {
    const chickenFinished = 500 * 0.1 * 140 + 500 * 0.06 * 85 + 500 * 0.1 * 113 + 500 * 0.04 * 57;
    expect(chickenFinished).toBeCloseTo(16340, 0);
    expect(finishedToRaw(chickenFinished, 0.7, 0.72)).toBeCloseTo(32421, -1);
  });
});
