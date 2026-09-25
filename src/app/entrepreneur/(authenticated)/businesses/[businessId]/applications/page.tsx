import { notFound } from 'next/navigation';
import { ApplicationTrackerScreen } from '@/features/entrepreneur/applications/ApplicationTrackerScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationsPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <ApplicationTrackerScreen project={project} />;
}
