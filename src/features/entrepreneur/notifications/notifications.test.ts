import { describe, expect, it } from 'vitest';
import { findNotificationById, notificationDestination } from './data';

describe('notification destinations', () => {
  it('uses only an explicitly related bound record', () => {
    expect(notificationDestination(findNotificationById('N-001')!)).toBe('/entrepreneur/businesses/BP-001/grievances?applicationId=APP-MPCB-2026-4892&raise=1');
    expect(notificationDestination(findNotificationById('N-006')!)).toBe('/entrepreneur/businesses/BP-001/applications/APP-MIDC-2026-1190');
    expect(notificationDestination(findNotificationById('N-008')!)).toBe('/entrepreneur/businesses/BP-001/grievances?grievanceId=GRV-2026-0003');
    expect(notificationDestination(findNotificationById('N-002')!)).toBe('/entrepreneur/businesses/BP-001/applications/APP-FAC-2026-3371');
    expect(notificationDestination(findNotificationById('N-003')!)).toBe('/entrepreneur/businesses/BP-001/documents');
    expect(notificationDestination(findNotificationById('N-004')!)).toBe('/entrepreneur/businesses/BP-001/inspections');
    expect(notificationDestination(findNotificationById('N-005')!)).toBe('/entrepreneur/businesses/BP-001/compliance');
    expect(notificationDestination(findNotificationById('N-007')!)).toBe('/entrepreneur/businesses/BP-004/regulatory-changes');
    expect(findNotificationById('N-UNKNOWN')).toBeUndefined();
  });
});
