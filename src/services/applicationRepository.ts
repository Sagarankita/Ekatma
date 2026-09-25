import { ApplicationId } from '@/domain/ids';
import { getApplicationContext } from '@/data/fixtures/application-contexts';

export const applicationRepository = {
  getApplication: (id: ApplicationId) => {
    return getApplicationContext(id);
  },
  // Add other mock queries here to fulfill Phase 5 contract
  getTimeline: (id: ApplicationId) => [],
};
