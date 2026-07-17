import { describe, it, expect } from 'vitest';
import { roundToPacks } from './pack';

describe('roundToPacks', () => {
  it('rounds up once to whole packs', () => {
    // chicken 10-lb case (4536 g): 26,725 g → ceil(5.89) = 6 cases
    expect(roundToPacks(26725, 4536)).toEqual({ packs: 6, orderPacksG: 27216 });
  });

  it('never zero when some is needed', () => {
    expect(roundToPacks(1, 4536).packs).toBe(1);
  });

  it('zero when nothing is needed', () => {
    expect(roundToPacks(0, 4536)).toEqual({ packs: 0, orderPacksG: 0 });
    expect(roundToPacks(-5, 4536).packs).toBe(0);
  });

  // AlaCarteOS golden fixture (SEED_DATA.md)
  it('flank 39,899 g at 20-lb primal (9072 g) → 5 primals', () => {
    expect(roundToPacks(39899, 9072)).toEqual({ packs: 5, orderPacksG: 45360 });
  });

  it('chicken 32,421 g at 10-lb case (4536 g) → 8 cases', () => {
    expect(roundToPacks(32421, 4536).packs).toBe(8);
  });
});
