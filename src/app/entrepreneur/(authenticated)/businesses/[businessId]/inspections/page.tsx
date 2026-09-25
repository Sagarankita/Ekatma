import { notFound } from 'next/navigation';
import { InspectionCentreScreen } from '@/features/entrepreneur/applications/InspectionCentreScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessInspectionsPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <InspectionCentreScreen project={project} />;
}
