import { notFound } from 'next/navigation';
import { DependencyScreen } from '@/features/entrepreneur/journey/DependencyScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessDependenciesPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <DependencyScreen project={project} />;
}
