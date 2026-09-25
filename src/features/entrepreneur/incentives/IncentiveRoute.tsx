'use client';

import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { contextualAssistantDestination } from '../regulatory-assistant/context';
import { E26IncentivesPage, E27IncentiveDetailPage, E28IncentiveClaimsPage } from './IncentiveScreens';
import { listClaimsForBusiness, listIncentivesForBusiness } from './data';
import { ENTREPRENEUR_ENTITY_IDENTITIES, findBusinessEntity } from '../identity/catalog';

export function IncentiveRoute({ project, schemeId, claims = false }: {
  project: BusinessProject;
  schemeId?: string;
  claims?: boolean;
}) {
  const router = useRouter();
  const list = () => router.push(ENTREPRENEUR_ROUTES.incentives(project.id));
  const documents = () => router.push(ENTREPRENEUR_ROUTES.documents(project.id));
  const canOpenDocuments = ENTREPRENEUR_ENTITY_IDENTITIES.some(entity => entity.kind === 'document' && entity.businessId === project.id);
  const canOpenCertificate = Boolean(findBusinessEntity('document', project.id, 'DOC-INC-001'));
  const scheme = () => schemeId && router.push(ENTREPRENEUR_ROUTES.incentive(project.id, schemeId));

  if (claims && schemeId) return <E28IncentiveClaimsPage
    schemeId={schemeId}
    claims={listClaimsForBusiness(project.id, schemeId)}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToE26={list}
    onGoToE27={scheme}
    onGoToE11={documents}
    canOpenDocuments={canOpenDocuments}
    onGoToE12={canOpenCertificate ? id => router.push(ENTREPRENEUR_ROUTES.document(project.id, id)) : undefined}
    onOpenRegAssistant={context => router.push(contextualAssistantDestination(context))}
  />;

  if (schemeId) return <E27IncentiveDetailPage
    schemeId={schemeId}
    canOpenClaims={schemeId === 'PSI-2019' && listClaimsForBusiness(project.id, schemeId).length > 0}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToE26={list}
    onGoToE11={documents}
    canOpenDocuments={canOpenDocuments}
    onGoToE28={() => router.push(`${ENTREPRENEUR_ROUTES.incentiveClaims(project.id)}?schemeId=${encodeURIComponent(schemeId)}`)}
    onOpenRegAssistant={context => router.push(contextualAssistantDestination(context))}
  />;

  return <E26IncentivesPage
    schemes={listIncentivesForBusiness(project.id)}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToScheme={id => router.push(ENTREPRENEUR_ROUTES.incentive(project.id, id))}
    onGoToE11={documents}
    canOpenDocuments={canOpenDocuments}
    onOpenRegAssistant={context => router.push(contextualAssistantDestination(context))}
  />;
}
