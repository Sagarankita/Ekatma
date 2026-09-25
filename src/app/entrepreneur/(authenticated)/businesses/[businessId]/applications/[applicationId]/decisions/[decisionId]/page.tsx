import { notFound } from 'next/navigation';
import { DecisionDetailScreen } from '@/features/entrepreneur/applications/DecisionDetailScreen';
import { findDecisionByAppId, findTrackerAppForBusiness } from '@/features/entrepreneur/applications/data';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireApplicationChildRouteParam, requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationExactDecisionPage({
  params,
}: {
  params: Promise<{ businessId: string; applicationId: string; decisionId: string }>;
}) {
  const { businessId, applicationId, decisionId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  const app = findTrackerAppForBusiness(business.id, applicationId);
  if (!app) notFound();

  const decision = findDecisionByAppId(applicationId);
  if (!decision || decision.decisionId !== decisionId) notFound();
  requireApplicationChildRouteParam('decision', business.id, applicationId, decisionId);

  return <DecisionDetailScreen project={project} applicationId={app.appId} decisionId={decision.decisionId} />;
}
