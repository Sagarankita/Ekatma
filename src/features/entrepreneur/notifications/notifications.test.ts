import { describe, expect, it } from 'vitest';
import { findNotificationById, notificationDestination } from './data';

describe('notification destinations', () => {
  it('uses only an explicitly related bound record', () => {
    expect(notificationDestination(findNotificationById('N-001')!)).toBe('/entrepreneur/businesses/BP-001/grievances?applicationId=APP-MPCB-2026-4892&raise=1');
    expect(notificationDestination(findNotificationById('N-006')!)).toBe('/entrepreneur/businesses/BP-001/applications/APP-MIDC-2026-1190');
    expect(notificationDestination(findNotificationById('N-008')!)).toBe('/entrepreneur/businesses/BP-001/grievances?grievanceId=GRV-2026-0003');
    expect(notificationDestination(findNotificationById('N-002')!)).toBeUndefined();
    expect(notificationDestination(findNotificationById('N-003')!)).toBeUndefined();
    expect(notificationDestination(findNotificationById('N-007')!)).toBeUndefined();
    expect(findNotificationById('N-UNKNOWN')).toBeUndefined();
  });
});
