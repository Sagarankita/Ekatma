import { redirect } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { getIncentiveClaims } from '@/features/entrepreneur/incentives/workspace/data';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function Page({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const claim = getIncentiveClaims(business.id).find(item => item.status === 'query-raised')
    ?? getIncentiveClaims(business.id).find(item => item.status !== 'received');
  redirect(claim
    ? ENTREPRENEUR_ROUTES.incentiveClaim(business.id, claim.id)
    : ENTREPRENEUR_ROUTES.incentives(business.id));
}
