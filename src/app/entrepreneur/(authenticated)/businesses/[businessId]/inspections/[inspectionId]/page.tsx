import { notFound } from 'next/navigation';
import { InspectionCentreScreen } from '@/features/entrepreneur/applications/InspectionCentreScreen';
import { findInspectionById } from '@/features/entrepreneur/applications/data';
import { findBusinessEntity } from '@/features/entrepreneur/identity/catalog';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessInspectionDetailPage({
  params,
}: {
  params: Promise<{ businessId: string; inspectionId: string }>;
}) {
  const { businessId, inspectionId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  const inspection = findInspectionById(inspectionId);
  if (!inspection || !findBusinessEntity('inspection', business.id, inspection.id)) notFound();

  return <InspectionCentreScreen project={project} initialInspectionId={inspection.id} />;
}
