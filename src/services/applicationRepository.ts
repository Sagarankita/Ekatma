import { ApplicationId } from '@/domain/ids';
import { APP_SAMPLE } from '@/data/fixtures/data';

export const applicationRepository = {
  getApplication: (id: ApplicationId) => {
    return { ...APP_SAMPLE, id };
  },
  // Add other mock queries here to fulfill Phase 5 contract
  getTimeline: (id: ApplicationId) => [],
};
