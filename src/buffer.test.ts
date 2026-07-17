import { describe, it, expect } from 'vitest';
import { newsvendorBuffer, zForServiceLevel } from './buffer';

describe('newsvendorBuffer', () => {
  it('is z × cv', () => {
    expect(newsvendorBuffer(1.645, 0.1)).toBeCloseTo(0.1645, 4);
  });
  it('a volatile line buffers more than a steady one at the same service level', () => {
    const z = zForServiceLevel(0.9);
    expect(newsvendorBuffer(z, 0.4)).toBeGreaterThan(newsvendorBuffer(z, 0.05));
  });
  // matches BanquetOS priors: protein × never-run-out = z(0.95) × CV(0.10) ≈ 0.1645
  it('reproduces the BanquetOS protein/never-run-out figure', () => {
    expect(newsvendorBuffer(zForServiceLevel(0.95), 0.1)).toBeCloseTo(0.16449, 4);
  });
});

describe('zForServiceLevel', () => {
  it('matches known standard-normal quantiles', () => {
    expect(zForServiceLevel(0.5)).toBeCloseTo(0, 6);
    expect(zForServiceLevel(0.95)).toBeCloseTo(1.6449, 3); // BanquetOS z-table uses 1.645
    expect(zForServiceLevel(0.975)).toBeCloseTo(1.95996, 3);
    expect(zForServiceLevel(0.99)).toBeCloseTo(2.32635, 3);
  });
  it('is symmetric about 0.5', () => {
    expect(zForServiceLevel(0.16)).toBeCloseTo(-zForServiceLevel(0.84), 4);
  });
  it('rejects out-of-range service levels', () => {
    expect(() => zForServiceLevel(0)).toThrow();
    expect(() => zForServiceLevel(1)).toThrow();
  });
});
