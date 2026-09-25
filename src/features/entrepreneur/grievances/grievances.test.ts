import { describe, expect, it } from 'vitest';
import { listGrievancesForBusiness, findGrievanceForBusiness } from './data';

describe('grievance business identity', () => {
  it('keeps three BP-001 grievances tied to their real application IDs', () => {
    expect(listGrievancesForBusiness('BP-001').map(g => g.id)).toEqual([
      'GRV-2026-0014', 'GRV-2026-0009', 'GRV-2026-0003',
    ]);
    expect(listGrievancesForBusiness('BP-002')).toEqual([]);
    expect(findGrievanceForBusiness('BP-001', 'GRV-2026-0014')?.applicationId).toBe('APP-MPCB-2026-4892');
    expect(findGrievanceForBusiness('BP-002', 'GRV-2026-0014')).toBeUndefined();
    expect(findGrievanceForBusiness('BP-001', 'GRV-UNKNOWN')).toBeUndefined();
  });
});
