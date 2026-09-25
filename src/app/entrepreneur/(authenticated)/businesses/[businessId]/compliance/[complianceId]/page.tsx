import { notFound } from 'next/navigation';
import { ComplianceRoute } from '@/features/entrepreneur/compliance/ComplianceRoute';
import { findComplianceForBusiness } from '@/features/entrepreneur/compliance/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function ComplianceDetailPage({ params }: { params: Promise<{ businessId: string; complianceId: string }> }) {
  const { businessId, complianceId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const obligation = findComplianceForBusiness(business.id, complianceId);
  const project = findBusinessProjectById(business.id);
  if (!obligation || !project) notFound();
  return <ComplianceRoute project={project} obligationId={obligation.id} />;
}
