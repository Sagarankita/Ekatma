import { notFound } from 'next/navigation';
import { DocumentDetailScreen } from '@/features/entrepreneur/documents/DocumentDetailScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessEntityRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessDocumentDetailPage({
  params,
}: {
  params: Promise<{ businessId: string; documentId: string }>;
}) {
  const { businessId, documentId } = await params;
  const entity = requireBusinessEntityRouteParam('document', businessId, documentId);
  const project = findBusinessProjectById(entity.businessId ?? businessId);
  if (!project) notFound();

  return <DocumentDetailScreen project={project} documentId={entity.id} />;
}
