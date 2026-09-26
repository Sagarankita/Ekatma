import { notFound } from 'next/navigation';
import { IncentiveCentreScreen } from '@/features/entrepreneur/incentives/workspace/components/IncentiveCentreScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function IncentivesPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();
  return <IncentiveCentreScreen />;
}
