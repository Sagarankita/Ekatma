import React from 'react';
import { IncentivePortfolioDetailScreen } from '@/features/entrepreneur/incentives/workspace/components/IncentivePortfolioDetailScreen';
import { notFound } from 'next/navigation';
import { getIncentiveDetailSchemes } from '@/features/entrepreneur/incentives/workspace/data';

export default async function Page({ params }: { params: Promise<{ businessId: string, incentiveId: string }> }) {
  const resolvedParams = await params;
  const schemes = getIncentiveDetailSchemes(resolvedParams.businessId);
  const scheme = schemes.find(s => s.id === resolvedParams.incentiveId);
  if (!scheme) {
    notFound();
  }
  return <IncentivePortfolioDetailScreen schemeId={resolvedParams.incentiveId} />;
}
