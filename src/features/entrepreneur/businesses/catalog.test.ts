import { describe, expect, it } from 'vitest';
import { ENTREPRENEUR_BUSINESSES } from '../identity/catalog';
import { SAMPLE_PROJECTS, findBusinessProjectById } from './catalog';

describe('Entrepreneur portfolio records', () => {
  it('uses the canonical BP identities and only bound application counts', () => {
    expect(SAMPLE_PROJECTS.map(project => [project.id, project.name, project.stage, project.activeApplications])).toEqual([
      ['BP-001', 'ABC Pharma Pvt Ltd', 'Pre-Establishment', 3],
      ['BP-002', 'Konkan Feeds', 'Construction', 0],
      ['BP-003', 'Sahyadri Electronics Pvt Ltd', 'Operational', 0],
      ['BP-004', 'Sahyadri Bio-Pharma Pvt Ltd', 'Trial Production', 4],
    ]);
    expect(SAMPLE_PROJECTS.map(project => project.id)).toEqual(ENTREPRENEUR_BUSINESSES.map(business => business.id));
  });

  it('does not fall back to another business for an unknown ID or legacy alias', () => {
    expect(findBusinessProjectById('BP-002')?.name).toBe('Konkan Feeds');
    expect(findBusinessProjectById('BP-999')).toBeUndefined();
    expect(findBusinessProjectById('abc-pharma')).toBeUndefined();
    expect(findBusinessProjectById('pune-auto')).toBeUndefined();
  });
});
