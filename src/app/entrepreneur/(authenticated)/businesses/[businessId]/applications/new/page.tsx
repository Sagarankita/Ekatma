import { notFound } from 'next/navigation';
import { ApplicationWorkspaceScreen } from '@/features/entrepreneur/applications/ApplicationWorkspaceScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationWorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ businessId: string }>;
  searchParams?: Promise<{ reqId?: string }>;
}) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const reqId = resolvedSearchParams?.reqId;

  return <ApplicationWorkspaceScreen project={project} reqId={reqId} />;
}
