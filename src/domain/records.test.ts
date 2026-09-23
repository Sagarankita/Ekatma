import { describe, it, expect } from 'vitest';
import * as Ids from './ids';
import type * as Records from './records';
import * as States from './states';

describe('Domain Contracts', () => {
  it('creates branded IDs correctly', () => {
    const appId = Ids.createApplicationId('APP-123');
    expect(appId).toBe('APP-123');
  });

  it('can typecheck a mock application record', () => {
    const mockApp: Records.ApplicationRecord = {
      id: Ids.createApplicationId('APP-123'),
      projectId: Ids.createProjectId('PROJ-999'),
      serviceId: Ids.createServiceId('SRV-1'),
      businessDnaVersion: Ids.createBusinessDnaVersion('DNA-V2'),
      state: 'under_scrutiny',
      updatedAt: '2026-09-23T00:00:00Z',
    };

    expect(mockApp.id).toBe('APP-123');
    expect(mockApp.state).toBe('under_scrutiny');
  });
});
