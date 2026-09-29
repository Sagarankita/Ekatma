'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { findBusinessEntity } from '../identity/catalog';
import type { RegAssistantContext } from '../regulatory-assistant/AssistantScreen';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';
import { E29RegChangeImpactPage, E30BusinessChangeSimulator, E31AmendmentsPage, listRegulatoryChangesForBusiness, type ChangeType } from './ChangeScreens';

const getDraftKey = (businessId: string) => `entrepreneur_change_draft_${businessId}_v1`;
type ChangeDraft = { changeType: ChangeType; proposedValue: string };

export function ChangeRoute({ project, screen }: { project: BusinessProject; screen: 'regulatory' | 'simulation' | 'amendments' }) {
  const router = useRouter();
  const { openAssistant, pageContext } = useRegulatoryAssistant();
  const openChangeAssistant = (context: RegAssistantContext) => openAssistant({
    origin: 'inline', mode: 'entity', preset: context.initialQuestion,
    context: inlineContext(pageContext, { pageType: 'regulatory-changes', pageTitle: 'Regulatory Changes', label: context.recordName ?? 'Regulatory Changes', entities: { businessId: project.id, regulatoryChangeId: context.recordId }, recordTitle: context.recordName }),
  });
  const [draft, setDraft] = useState<ChangeDraft | null>(null);
  const draftKey = getDraftKey(project.id);

  useEffect(() => {
    const stored = sessionStorage.getItem(draftKey);
    if (stored) {
      try { setDraft(JSON.parse(stored) as ChangeDraft); } catch { sessionStorage.removeItem(draftKey); }
    }
  }, [draftKey]);

  if (screen === 'regulatory') return <E29RegChangeImpactPage
    changes={listRegulatoryChangesForBusiness(project.id)}
    contextLabel={`${project.name} — ${project.subtitle.replace(/^Internal demo project — /, '')}`}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToApplication={id => { if (findBusinessEntity('application', project.id, id)) router.push(ENTREPRENEUR_ROUTES.application(project.id, id)); }}
    onGoToCompliance={id => { if (findBusinessEntity('compliance', project.id, id)) router.push(ENTREPRENEUR_ROUTES.complianceDetail(project.id, id)); }}
    canOpenAffectedRecord={record => {
      if (record.type !== 'application' && record.type !== 'compliance') return false;
      return findBusinessEntity(record.type, project.id, record.id)?.label === record.label;
    }}
    onGoToE24={() => router.push(ENTREPRENEUR_ROUTES.compliance(project.id))}
    onOpenRegAssistant={openChangeAssistant}
  />;

  if (screen === 'amendments') {
    if (!draft) return (
      <main id="main-content" className="flex-1 bg-[#F9FAF2] px-6 py-12" tabIndex={-1}>
        <div className="max-w-[720px] mx-auto bg-white border border-[#d6dfd5] p-8 text-center rounded">
          <h2 className="text-base font-semibold text-[#2B2B2B] mb-2">No Active Change Proposal</h2>
          <p className="text-xs text-[#555C56] mb-6">No change proposal draft was found in this browser tab for {project.name}. Simulate a business change first to initiate amendments.</p>
          <button
            onClick={() => router.push(ENTREPRENEUR_ROUTES.changes(project.id))}
            className="bg-[#355E3B] text-white text-xs font-semibold px-4 py-2 hover:bg-[#27472c] transition-colors"
          >
            Go to Business Change Simulator
          </button>
        </div>
      </main>
    );
    return <E31AmendmentsPage
      changeType={draft.changeType}
      proposedValue={draft.proposedValue}
      onBack={() => router.push(ENTREPRENEUR_ROUTES.changes(project.id))}
      onGoToE30={() => router.push(ENTREPRENEUR_ROUTES.changes(project.id))}
      onGoToE09={() => router.push(ENTREPRENEUR_ROUTES.journey(project.id))}
      onGoToE11={() => router.push(ENTREPRENEUR_ROUTES.documents(project.id))}
      onGoToE14={() => router.push(ENTREPRENEUR_ROUTES.newApplication(project.id))}
    />;
  }

  return <E30BusinessChangeSimulator
    project={project}
    onBack={() => router.push(ENTREPRENEUR_ROUTES.business(project.id))}
    onGoToE31={(changeType, proposedValue) => {
      sessionStorage.setItem(draftKey, JSON.stringify({ changeType, proposedValue }));
      setDraft({ changeType, proposedValue });
      router.push(ENTREPRENEUR_ROUTES.amendments(project.id));
    }}
  />;
}
