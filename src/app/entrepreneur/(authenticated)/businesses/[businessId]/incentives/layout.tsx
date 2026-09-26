import React from 'react';
import { IncentiveWorkspaceProvider } from '@/features/entrepreneur/incentives/workspace/state';

export default async function IncentivesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}) {
  const resolvedParams = await params;
  return (
    <IncentiveWorkspaceProvider businessId={resolvedParams.businessId}>
      {children}
    </IncentiveWorkspaceProvider>
  );
}
