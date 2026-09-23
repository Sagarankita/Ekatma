'use client';

import { DecisionsDashboard } from '@/App';

export default function DecisionsPage() {
  return (
    <DecisionsDashboard 
      onOpenApp={() => console.log('Open app')}
      onOpenCompliance={() => console.log('Open compliance')}
      onOpenDependencyUpdate={() => console.log('Open dependency update')}
    />
  );
}
