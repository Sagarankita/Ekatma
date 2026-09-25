import { notFound } from 'next/navigation';
import { DocumentCentreScreen } from '@/features/entrepreneur/documents/DocumentCentreScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireDeepScreenBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessDocumentCentrePage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireDeepScreenBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <DocumentCentreScreen project={project} />;
}
