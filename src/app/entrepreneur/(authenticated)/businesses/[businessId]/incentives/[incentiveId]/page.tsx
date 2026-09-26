import { notFound, redirect } from 'next/navigation';
import { findIncentiveForBusiness } from '@/features/entrepreneur/incentives/data';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

export default async function IncentiveDetailPage({ params }: { params: Promise<{ businessId: string; incentiveId: string }> }) {
  const { businessId, incentiveId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const scheme = findIncentiveForBusiness(business.id, incentiveId);
  if (!scheme) notFound();
  redirect(ENTREPRENEUR_ROUTES.incentivePortfolioDetail(business.id, scheme.id));
}
