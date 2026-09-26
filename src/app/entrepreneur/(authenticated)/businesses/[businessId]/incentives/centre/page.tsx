import { redirect } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function Page({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  redirect(ENTREPRENEUR_ROUTES.incentives(business.id));
}
