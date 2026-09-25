import { notFound } from 'next/navigation';
import { IncentiveRoute } from '@/features/entrepreneur/incentives/IncentiveRoute';
import { findIncentiveForBusiness, listClaimsForBusiness } from '@/features/entrepreneur/incentives/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function IncentiveClaimsPage({ params, searchParams }: {
  params: Promise<{ businessId: string }>;
  searchParams: Promise<{ schemeId?: string }>;
}) {
  const { businessId } = await params;
  const { schemeId } = await searchParams;
  const business = requireBusinessRouteParam(businessId);
  const targetSchemeId = schemeId ?? 'PSI-2019';
  const scheme = findIncentiveForBusiness(business.id, targetSchemeId);
  const project = findBusinessProjectById(business.id);
  if (!scheme || !project || scheme.id !== 'PSI-2019' || listClaimsForBusiness(business.id, scheme.id).length === 0) notFound();
  return <IncentiveRoute project={project} schemeId={scheme.id} claims />;
}
