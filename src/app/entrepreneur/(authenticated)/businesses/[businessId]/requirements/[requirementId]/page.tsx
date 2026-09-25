import { notFound } from 'next/navigation';
import { RequirementDetailScreen } from '@/features/entrepreneur/journey/RequirementDetailScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessEntityRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessRequirementDetailPage({
  params,
}: {
  params: Promise<{ businessId: string; requirementId: string }>;
}) {
  const { businessId, requirementId } = await params;
  const entity = requireBusinessEntityRouteParam('requirement', businessId, requirementId);
  const project = findBusinessProjectById(entity.businessId ?? businessId);
  if (!project) notFound();

  return <RequirementDetailScreen project={project} requirementId={entity.id} />;
}
