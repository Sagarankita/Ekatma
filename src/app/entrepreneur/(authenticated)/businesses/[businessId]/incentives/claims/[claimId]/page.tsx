import React from 'react';
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
