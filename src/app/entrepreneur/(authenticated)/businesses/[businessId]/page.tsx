import { notFound } from 'next/navigation';
import { BusinessOverviewPage } from '@/features/entrepreneur/businesses/BusinessPortfolio';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessOverview({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();
  return <BusinessOverviewPage project={project} />;
}
