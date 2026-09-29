import { notFound } from 'next/navigation';
import { DeltaResubmissionScreen } from '@/features/entrepreneur/applications/DeltaResubmissionScreen';
import { findTrackerAppForBusiness } from '@/features/entrepreneur/applications/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireApplicationChildRouteParam, requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationExactResubmissionPage({
  params,
}: {
  params: Promise<{ businessId: string; applicationId: string; resubmissionId: string }>;
}) {
  const { businessId, applicationId, resubmissionId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  const app = findTrackerAppForBusiness(business.id, applicationId);
  if (!app) notFound();
  requireApplicationChildRouteParam('resubmission', business.id, applicationId, resubmissionId);

  return <DeltaResubmissionScreen project={project} applicationId={app.appId} resubmissionId={resubmissionId} />;
}
