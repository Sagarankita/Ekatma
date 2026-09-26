import { notFound, redirect } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';
import { findIncentiveForBusiness, listClaimsForBusiness } from '@/features/entrepreneur/incentives/data';

export default async function IncentiveClaimsPage({ params, searchParams }: {
  params: Promise<{ businessId: string }>;
  searchParams: Promise<{ schemeId?: string }>;
}) {
  const { businessId } = await params;
  const { schemeId } = await searchParams;
  const business = requireBusinessRouteParam(businessId);
  const targetSchemeId = schemeId ?? 'PSI-2019';
  const scheme = findIncentiveForBusiness(business.id, targetSchemeId);
  if (!scheme || listClaimsForBusiness(business.id, scheme.id).length === 0) notFound();
  redirect(ENTREPRENEUR_ROUTES.incentiveClaimList(business.id));
}
