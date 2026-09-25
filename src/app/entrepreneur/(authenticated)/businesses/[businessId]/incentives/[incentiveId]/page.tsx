import { notFound } from 'next/navigation';
import { IncentiveRoute } from '@/features/entrepreneur/incentives/IncentiveRoute';
import { findIncentiveForBusiness } from '@/features/entrepreneur/incentives/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function IncentiveDetailPage({ params }: { params: Promise<{ businessId: string; incentiveId: string }> }) {
  const { businessId, incentiveId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const scheme = findIncentiveForBusiness(business.id, incentiveId);
  const project = findBusinessProjectById(business.id);
  if (!scheme || !project) notFound();
  return <IncentiveRoute project={project} schemeId={scheme.id} />;
}
