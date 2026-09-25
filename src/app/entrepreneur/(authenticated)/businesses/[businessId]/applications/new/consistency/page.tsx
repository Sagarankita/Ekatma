import { notFound } from 'next/navigation';
import { ConsistencyScreen } from '@/features/entrepreneur/applications/ConsistencyScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireDeepScreenBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessConsistencyPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireDeepScreenBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <ConsistencyScreen project={project} />;
}
