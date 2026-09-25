import { notFound } from 'next/navigation';
import { ApplicationDetailScreen } from '@/features/entrepreneur/applications/ApplicationDetailScreen';
import { findTrackerAppForBusiness } from '@/features/entrepreneur/applications/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationDetailPage({
  params,
}: {
  params: Promise<{ businessId: string; applicationId: string }>;
}) {
  const { businessId, applicationId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  // Validate exact application ID - NO FIRST-RECORD FALLBACK
  const app = findTrackerAppForBusiness(business.id, applicationId);
  if (!app) notFound();

  return <ApplicationDetailScreen project={project} applicationId={app.appId} />;
}
