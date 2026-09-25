import { notFound } from 'next/navigation';
import { ComplianceRoute } from '@/features/entrepreneur/compliance/ComplianceRoute';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function CompliancePage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();
  return <ComplianceRoute project={project} />;
}
