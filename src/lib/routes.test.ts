import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ROUTES, DEPARTMENT_DESTINATIONS, departmentActiveItem, departmentNotificationRoute, departmentScrutinyRoute } from './routes';

const department = ROUTES.department;
const recordBuilders = Object.entries(department).filter(
  (entry): entry is [string, (applicationId: string, childId: string) => string] =>
    typeof entry[1] === 'function' && entry[0] !== 'searchQuery',
);

describe('Department route contract', () => {
  it('covers every existing Department page and points only to existing pages', () => {
    const pageRoutes = readdirSync('src/app/department', { recursive: true })
      .map(String)
      .filter(file => file.endsWith('page.tsx'))
      .map(file => '/department/' + file.split('/').filter(part => !part.startsWith('(')).join('/'))
      .map(path => path.replace(/\/page\.tsx$/, '').replace(/\[[^\]]+\]/g, ':id'));
    const contractRoutes = Object.entries(department)
      .filter(([name]) => name !== 'searchQuery')
      .map(([, route]) => typeof route === 'string' ? route : route('record-id', 'record-id'))
      .map(path => path.replace(/record-id/g, ':id'));

    expect(new Set(contractRoutes)).toEqual(new Set(pageRoutes));
    expect(contractRoutes.length).toBe(pageRoutes.length);
  });

  it.each(recordBuilders)('%s encodes raw IDs once without changing path structure', (_name, build) => {
    const applicationId = 'APP /?#% मराठी';
    const childId = 'CHILD /?#% मराठी';
    const path = build(applicationId, childId);
    const segments = path.split('/');
    expect(segments[3]).toBe(encodeURIComponent(applicationId));
    expect(decodeURIComponent(segments[3])).toBe(applicationId);
    expect(path).not.toMatch(/[?#]/);
    if (build.length === 2) {
      expect(segments[5]).toBe(encodeURIComponent(childId));
      expect(decodeURIComponent(segments[5])).toBe(childId);
    }
  });

  it('preserves literal percent sequences in IDs rather than decoding them twice', () => {
    const path = department.application('APP%2F123');
    expect(decodeURIComponent(path.split('/')[3])).toBe('APP%2F123');
  });

  it.each(['', '.', '..'])('rejects the invalid dynamic segment %j', id => {
    expect(() => department.application(id)).toThrow();
    expect(() => department.inspectionPlan('APP-2', id)).toThrow();
  });

  it('encodes search text and uses the bare Search route for empty submissions', () => {
    const query = 'A&B / मराठी? 100%';
    const url = new URL(department.searchQuery(query), 'https://example.test');
    expect(url.pathname).toBe(department.search);
    expect(url.searchParams.get('q')).toBe(query);
    expect(department.searchQuery('   ')).toBe(department.search);
  });

  it.each(Object.entries(DEPARTMENT_DESTINATIONS))('keeps %s in the existing sidebar IA', (id, route) => {
    const parent = id === 'dept-regimpact' ? 'dept-regchng' : id === 'dept-bottleneck' ? 'dept-analytics' : id;
    expect(departmentActiveItem(route)).toBe(parent);
    expect(departmentActiveItem(route + '/')).toBe(parent);
  });

  it.each(recordBuilders)('%s never highlights Department Home', (_name, build) => {
    expect(departmentActiveItem(build('APP-2', 'CHILD-2'))).toBe('dept-apps');
  });

  it('does not highlight Home for an unknown route', () => {
    expect(departmentActiveItem('/department/missing')).toBe('');
  });

  it.each([
    ['decision-workspace', '/decision-workspace'],
    ['delta-rescrutiny', '/delta-rescrutiny'],
    ['query-history', '/query-history'],
    ['inspection-queue', '/inspections'],
    ['dna', '/dna'],
  ] as const)('preserves notification application identity for %s', (link, suffix) => {
    expect(departmentNotificationRoute(link, 'APP-SECOND')).toBe(`/department/applications/APP-SECOND${suffix}`);
  });

  it('maps oversight notification screen IDs deterministically', () => {
    expect(departmentNotificationRoute('sla', 'APP-2')).toBe(department.sla);
    expect(departmentNotificationRoute('grievance', 'APP-2')).toBe(department.grievances);
  });

  it.each([
    ['overview', ''], ['dna', '/dna'], ['timeline', '/timeline'], ['precheck', '/precheck'],
    ['scrutiny-route', '/scrutiny-route'], ['scrutiny-workbench', '/scrutiny-workbench'],
    ['bldg-scrutiny', '/building-scrutiny'], ['water-scrutiny', '/water-scrutiny'],
    ['consistency', '/consistency'], ['dependency-view', '/dependency-view'],
    ['query-builder', '/query-builder'], ['query-history', '/query-history'],
    ['delta-rescrutiny', '/delta-rescrutiny'], ['inspection-queue', '/inspections'],
    ['doc-review', '/document/default'],
  ])('maps scrutiny destination %s without losing application identity', (destination, suffix) => {
    expect(departmentScrutinyRoute('APP-SECOND', destination)).toBe(`/department/applications/APP-SECOND${suffix}`);
  });
});
