const fs = require('fs');
const path = require('path');
const pReadiness = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives', 'claim-readiness', 'page.tsx');
const codeReadiness = `import React from 'react';
import { ClaimReadinessScreen } from '@/features/entrepreneur/incentives/workspace/components/ClaimReadinessScreen';

export default function Page() {
  return <ClaimReadinessScreen />;
}
`;
fs.writeFileSync(pReadiness, codeReadiness);

const pTracker = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives', 'claims', '[claimId]', 'page.tsx');
const codeTracker = `import React from 'react';
import { ClaimTrackerScreen } from '@/features/entrepreneur/incentives/workspace/components/ClaimTrackerScreen';
import { notFound } from 'next/navigation';
import { getIncentiveClaims } from '@/features/entrepreneur/incentives/workspace/data';

export default async function Page({ params }: { params: Promise<{ businessId: string, claimId: string }> }) {
  const resolvedParams = await params;
  const claims = getIncentiveClaims(resolvedParams.businessId);
  const claim = claims.find(c => c.id === resolvedParams.claimId);
  if (!claim) {
    notFound();
  }
  return <ClaimTrackerScreen claimId={resolvedParams.claimId} />;
}
`;
fs.writeFileSync(pTracker, codeTracker);

console.log('done');
