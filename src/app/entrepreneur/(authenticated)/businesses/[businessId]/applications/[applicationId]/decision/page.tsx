import { notFound, redirect } from 'next/navigation';
import { findDecisionByAppId, findTrackerAppForBusiness } from '@/features/entrepreneur/applications/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireApplicationChildRouteParam, requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

export default async function BusinessApplicationDecisionPage({
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

  const decision = findDecisionByAppId(applicationId);
  if (!decision) notFound();
  requireApplicationChildRouteParam('decision', business.id, applicationId, decision.decisionId);

  redirect(ENTREPRENEUR_ROUTES.applicationDecision(business.id, app.appId, decision.decisionId));
}
