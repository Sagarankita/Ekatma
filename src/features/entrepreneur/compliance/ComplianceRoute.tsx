'use client';

import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import type { RegAssistantContext } from '../regulatory-assistant/AssistantScreen';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';
import { E24CompliancePage, E25ComplianceDetailPage } from './ComplianceScreens';
import { findSourceDecisionForBusiness, listComplianceForBusiness } from './data';
import { findBusinessEntity } from '../identity/catalog';

export function ComplianceRoute({ project, obligationId }: { project: BusinessProject; obligationId?: string }) {
  const router = useRouter();
  const { openAssistant, pageContext } = useRegulatoryAssistant();
  const openComplianceAssistant = (context: RegAssistantContext) => openAssistant({
    origin: 'inline', mode: 'entity', preset: context.initialQuestion,
    context: inlineContext(pageContext, { pageType: 'compliance', pageTitle: 'Compliance', label: context.recordName ?? 'Compliance', entities: { businessId: project.id, complianceId: context.recordId }, recordTitle: context.recordName }),
  });
  const goToList = () => router.push(ENTREPRENEUR_ROUTES.compliance(project.id));
  const sourceDecision = findSourceDecisionForBusiness(project.id, obligationId ?? 'CPL-001');
  const goToDecision = sourceDecision
    ? () => router.push(ENTREPRENEUR_ROUTES.applicationDecision(project.id, sourceDecision.applicationId, sourceDecision.decisionId))
    : undefined;
  const goToDocuments = () => router.push(ENTREPRENEUR_ROUTES.documents(project.id));
  const canOpenDocument = (id: string) => Boolean(findBusinessEntity('document', project.id, id));
  const canOpenDocuments = ['DOC-001', 'DOC-003', 'DOC-006'].some(canOpenDocument);

  if (obligationId) return <E25ComplianceDetailPage
    obligationId={obligationId}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToE24={goToList}
    onGoToE23={goToDecision}
    onGoToE11={goToDocuments}
    canOpenDocuments={canOpenDocuments}
    canOpenDocument={canOpenDocument}
    onGoToDocDetail={id => router.push(ENTREPRENEUR_ROUTES.document(project.id, id))}
    onOpenRegAssistant={openComplianceAssistant}
  />;

  return <E24CompliancePage
    obligations={listComplianceForBusiness(project.id)}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToObligation={id => router.push(ENTREPRENEUR_ROUTES.complianceDetail(project.id, id))}
    onGoToE23={goToDecision}
    onGoToE11={goToDocuments}
    canOpenDocuments={canOpenDocuments}
    onOpenRegAssistant={openComplianceAssistant}
  />;
}
