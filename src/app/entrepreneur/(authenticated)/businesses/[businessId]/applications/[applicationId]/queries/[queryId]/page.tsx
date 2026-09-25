import { notFound } from 'next/navigation';
import { QueryResponseScreen } from '@/features/entrepreneur/applications/QueryResponseScreen';
import { findQueryByAppId, findTrackerAppForBusiness } from '@/features/entrepreneur/applications/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireApplicationChildRouteParam, requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationQueryPage({
  params,
}: {
  params: Promise<{ businessId: string; applicationId: string; queryId: string }>;
}) {
  const { businessId, applicationId, queryId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  const app = findTrackerAppForBusiness(business.id, applicationId);
  if (!app) notFound();

  const query = findQueryByAppId(applicationId);
  if (!query || query.queryId !== queryId) notFound();
  requireApplicationChildRouteParam('query', business.id, applicationId, queryId);

  return <QueryResponseScreen project={project} applicationId={app.appId} queryId={query.queryId} />;
}
