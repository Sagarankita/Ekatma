import { notFound, redirect } from 'next/navigation';
import { findTrackerAppForBusiness } from '@/features/entrepreneur/applications/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { ENTREPRENEUR_ENTITY_IDENTITIES } from '@/features/entrepreneur/identity/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

export default async function BusinessApplicationResubmissionPage({
  params,
}: {
  params: Promise<{ businessId: string; applicationId: string }>;
}) {
  const { businessId, applicationId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  const app = findTrackerAppForBusiness(business.id, applicationId);
  if (!app) notFound();

  const resubmission = ENTREPRENEUR_ENTITY_IDENTITIES.find(entity =>
    entity.kind === 'resubmission' && entity.businessId === business.id && entity.parentId === app.appId,
  );
  if (!resubmission) notFound();
  redirect(ENTREPRENEUR_ROUTES.applicationResubmission(business.id, app.appId, resubmission.id));
}
