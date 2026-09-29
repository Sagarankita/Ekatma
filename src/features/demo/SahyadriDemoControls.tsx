'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, FlaskConical, RotateCcw, SkipForward } from 'lucide-react';
import { SAHYADRI_DEMO } from '@/data/fixtures/sahyadri-department-demo';
import { type SahyadriDemoStep, useSahyadriDemoState } from './sahyadri-demo-state';

const appId = SAHYADRI_DEMO.application.id;
const inspectionId = SAHYADRI_DEMO.inspection.id;
const decisionId = SAHYADRI_DEMO.decision.id;

const departmentRoute: Partial<Record<SahyadriDemoStep, string>> = {
  SUBMITTED: '/department/queue',
  UNDER_REVIEW: `/department/applications/${appId}`,
  DOCUMENT_SCRUTINY: `/department/applications/${appId}/precheck`,
  INITIAL_SCRUTINY: `/department/applications/${appId}/scrutiny-route`,
  TECHNICAL_SCRUTINY: `/department/applications/${appId}/scrutiny-workflow`,
  QUERY_RAISED: `/department/applications/${appId}/query-builder`,
  ENTREPRENEUR_RESPONSE_PENDING: `/department/applications/${appId}/query-history`,
  RESUBMITTED: `/department/applications/${appId}/query-history`,
  DELTA_RE_SCRUTINY: `/department/applications/${appId}/delta-rescrutiny`,
  INSPECTION_PENDING: `/department/applications/${appId}/inspections`,
  INSPECTION_SCHEDULED: `/department/applications/${appId}/inspections/${inspectionId}/plan`,
  INSPECTION_IN_PROGRESS: `/department/applications/${appId}/inspections/${inspectionId}/workspace`,
  INSPECTION_COMPLETED: `/department/applications/${appId}/inspections/${inspectionId}/workspace`,
  CORRECTION_REQUIRED: `/department/applications/${appId}/inspections/${inspectionId}/observations`,
  RE_INSPECTION_REQUIRED: `/department/applications/${appId}/inspections/${inspectionId}/observations`,
  RE_INSPECTION_SCHEDULED: `/department/applications/${appId}/inspections/${inspectionId}/plan`,
  RE_INSPECTION_COMPLETED: `/department/applications/${appId}/inspections/${inspectionId}/workspace`,
  FINAL_DECISION: `/department/applications/${appId}/decision-workspace`,
  APPROVED: `/department/applications/${appId}/decisions/${decisionId}`,
  CERTIFICATE_ISSUED: `/department/applications/${appId}/decisions/${decisionId}`,
  ENTREPRENEUR_NOTIFIED: `/department/applications/${appId}/decisions/${decisionId}`,
  NEXT_REQUIREMENTS_AVAILABLE: `/department/applications/${appId}/dependency-view`,
};

const entrepreneurRoute: Partial<Record<SahyadriDemoStep, string>> = {
  SUBMITTED: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  UNDER_REVIEW: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  DOCUMENT_SCRUTINY: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  INITIAL_SCRUTINY: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  TECHNICAL_SCRUTINY: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  QUERY_RAISED: `/entrepreneur/businesses/BP-004/applications/${appId}/queries/QRY-2026-MIDC-00187`,
  ENTREPRENEUR_RESPONSE_PENDING: `/entrepreneur/businesses/BP-004/applications/${appId}/queries/QRY-2026-MIDC-00187`,
  RESUBMITTED: `/entrepreneur/businesses/BP-004/applications/${appId}/resubmissions/${appId}-R1`,
  DELTA_RE_SCRUTINY: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  INSPECTION_PENDING: `/entrepreneur/businesses/BP-004/inspections`,
  INSPECTION_SCHEDULED: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  INSPECTION_IN_PROGRESS: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  INSPECTION_COMPLETED: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  CORRECTION_REQUIRED: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  RE_INSPECTION_REQUIRED: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  RE_INSPECTION_SCHEDULED: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  RE_INSPECTION_COMPLETED: `/entrepreneur/businesses/BP-004/inspections/${inspectionId}`,
  FINAL_DECISION: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  APPROVED: `/entrepreneur/businesses/BP-004/applications/${appId}/decisions/${decisionId}`,
  CERTIFICATE_ISSUED: `/entrepreneur/businesses/BP-004/applications/${appId}/decisions/${decisionId}`,
  ENTREPRENEUR_NOTIFIED: `/entrepreneur/businesses/BP-004/applications/${appId}`,
  NEXT_REQUIREMENTS_AVAILABLE: '/entrepreneur/businesses/BP-004/journey',
};

const shortcuts: { label: string; step: SahyadriDemoStep }[] = [
  { label: 'Advance to Query', step: 'QUERY_RAISED' },
  { label: 'Simulate Entrepreneur Response', step: 'RESUBMITTED' },
  { label: 'Start Delta Re-scrutiny', step: 'DELTA_RE_SCRUTINY' },
  { label: 'Schedule Inspection', step: 'INSPECTION_SCHEDULED' },
  { label: 'Complete Inspection', step: 'INSPECTION_COMPLETED' },
  { label: 'Simulate Observation', step: 'CORRECTION_REQUIRED' },
  { label: 'Schedule Re-inspection', step: 'RE_INSPECTION_SCHEDULED' },
  { label: 'Resolve Observation', step: 'RE_INSPECTION_COMPLETED' },
  { label: 'Open Decision', step: 'FINAL_DECISION' },
  { label: 'Approve Application', step: 'APPROVED' },
  { label: 'Issue Certificate', step: 'CERTIFICATE_ISSUED' },
];

export function SahyadriDemoControls({ surface }: { surface: 'entrepreneur' | 'department' }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { state, setStep, advance, reset } = useSahyadriDemoState();
  const routes = surface === 'department' ? departmentRoute : entrepreneurRoute;

  const go = (step: SahyadriDemoStep) => {
    setStep(step);
    router.push(routes[step] ?? (surface === 'department' ? '/department/queue' : '/entrepreneur/businesses/BP-004/applications'));
  };

  const next = () => {
    const nextState = advance();
    router.push(routes[nextState.currentState] ?? routes.SUBMITTED!);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-[90]" aria-label="Sahyadri prototype demo controls">
      {open && (
        <div className="absolute bottom-[calc(100%+8px)] right-0 w-[270px] max-h-[58vh] overflow-y-auto rounded-xl border border-indigo-200 bg-white p-3 shadow-2xl">
          <div className="flex items-start gap-2">
            <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700" />
            <div>
              <p className="text-xs font-bold text-[#172554]">Sahyadri Demo Mode</p>
              <p className="mt-0.5 text-[10px] text-slate-500">Current: {state.currentState.replace(/_/g, ' ')}</p>
            </div>
          </div>
          <button type="button" onClick={() => router.push(routes[state.currentState] ?? routes.SUBMITTED!)} className="mt-3 w-full rounded-lg border border-indigo-200 px-3 py-2 text-xs font-semibold text-indigo-800 hover:bg-indigo-50">Open current step</button>
          <div className="mt-3 grid grid-cols-1 gap-1.5">
            {shortcuts.map(item => <button type="button" key={item.step} onClick={() => go(item.step)} className="rounded border border-slate-200 px-3 py-1.5 text-left text-[11px] font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50">{item.label}</button>)}
          </div>
          <button type="button" onClick={() => { reset(); router.push(routes.SUBMITTED!); }} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"><RotateCcw className="h-3.5 w-3.5" /> Reset Demo</button>
        </div>
      )}
      <div className="flex overflow-hidden rounded-full border border-indigo-300 bg-white shadow-lg">
        <button type="button" onClick={next} title={`Next demo step from ${state.currentState.replace(/_/g, ' ')}`} className="flex items-center gap-1.5 bg-[#1a56db] px-3 py-2 text-xs font-bold text-white hover:bg-[#1344b3]">
          <SkipForward className="h-3.5 w-3.5" /> Next
        </button>
        <button type="button" aria-expanded={open} aria-label="Open Demo Mode options" onClick={() => setOpen(value => !value)} className="flex items-center border-l border-indigo-200 px-2.5 text-indigo-800 hover:bg-indigo-50">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
}
