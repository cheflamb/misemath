import { describe, it, expect } from 'vitest';
import { toGrams, fromGrams, formatWeight, formatBuyable, formatVolume, LB_G, OZ_G } from './units';

describe('toGrams', () => {
  it('converts weight units directly', () => {
    expect(toGrams(1, 'lb')).toBeCloseTo(453.59237, 5);
    expect(toGrams(16, 'oz')).toBeCloseTo(453.59237, 4);
    expect(toGrams(2, 'kg')).toBe(2000);
    expect(toGrams(500, 'g')).toBe(500);
  });

  it('needs density for volume units (structural WeightSource)', () => {
    expect(toGrams(1, 'cup', { densityGPerMl: 1 })).toBeCloseTo(236.588, 2);
    expect(() => toGrams(1, 'cup')).toThrow(/densityGPerMl/);
  });

  it('needs gramsPerUnit for "each"', () => {
    expect(toGrams(3, 'each', { gramsPerUnit: 50 })).toBe(150);
    expect(() => toGrams(1, 'each')).toThrow(/gramsPerUnit/);
  });
});

describe('fromGrams', () => {
  it('inverts weight conversion', () => {
    expect(fromGrams(LB_G, 'lb')).toBeCloseTo(1, 6);
    expect(fromGrams(OZ_G, 'oz')).toBeCloseTo(1, 6);
  });
  it('rejects non-weight units', () => {
    expect(() => fromGrams(100, 'cup')).toThrow();
  });
});

describe('formatting', () => {
  it('formatWeight US switches lb/oz at a pound', () => {
    expect(formatWeight(2 * LB_G, 'us')).toBe('2.0 lb');
    expect(formatWeight(2 * OZ_G, 'us')).toBe('2.0 oz');
  });
  it('formatBuyable rounds up to whole units', () => {
    expect(formatBuyable(1.1 * LB_G, 'us')).toBe('2 lb');
    expect(formatBuyable(2000, 'metric')).toBe('2.0 kg');
  });
  it('formatVolume US steps through gal/qt/cup', () => {
    expect(formatVolume(4000, 'us')).toMatch(/gal/);
  });
});
