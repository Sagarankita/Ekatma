'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  SAHYADRI_DEMO_APPROVED_STATE,
  SAHYADRI_DEMO_INITIAL_STATE,
  SAHYADRI_DEMO_STORAGE_KEY,
} from '@/data/fixtures/sahyadri-department-demo';
import type { ApplicationState } from '@/domain/states';

export const SAHYADRI_DEMO_STATES = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'DOCUMENT_SCRUTINY',
  'INITIAL_SCRUTINY',
  'TECHNICAL_SCRUTINY',
  'QUERY_RAISED',
  'ENTREPRENEUR_RESPONSE_PENDING',
  'RESUBMITTED',
  'DELTA_RE_SCRUTINY',
  'INSPECTION_PENDING',
  'INSPECTION_SCHEDULED',
  'INSPECTION_IN_PROGRESS',
  'INSPECTION_COMPLETED',
  'FINAL_DECISION',
  'APPROVED',
  'CERTIFICATE_ISSUED',
  'ENTREPRENEUR_NOTIFIED',
  'NEXT_REQUIREMENTS_AVAILABLE',
] as const;

export type SahyadriDemoStep = (typeof SAHYADRI_DEMO_STATES)[number]
  | 'CORRECTION_REQUIRED'
  | 'RE_INSPECTION_REQUIRED'
  | 'RE_INSPECTION_SCHEDULED'
  | 'RE_INSPECTION_COMPLETED';

export type SahyadriDemoWorkflowState = {
  currentState: SahyadriDemoStep;
  applicationStatus: string;
  departmentStatus: string;
  scrutinyStatus: string;
  inspectionStatus: string;
  decisionStatus: string;
  approvalStatus: string;
  certificate: string | null;
  observationId: string | null;
  lastUpdated: string;
};

const initialState: SahyadriDemoWorkflowState = {
  ...SAHYADRI_DEMO_INITIAL_STATE,
  currentState: 'SUBMITTED',
  observationId: null,
};

function stateForStep(step: SahyadriDemoStep): SahyadriDemoWorkflowState {
  const approved = ['APPROVED', 'CERTIFICATE_ISSUED', 'ENTREPRENEUR_NOTIFIED', 'NEXT_REQUIREMENTS_AVAILABLE'].includes(step);
  const inspectionCompleted = ['INSPECTION_COMPLETED', 'FINAL_DECISION', 'APPROVED', 'CERTIFICATE_ISSUED', 'ENTREPRENEUR_NOTIFIED', 'NEXT_REQUIREMENTS_AVAILABLE', 'RE_INSPECTION_COMPLETED'].includes(step);
  const queryActive = step === 'QUERY_RAISED' || step === 'ENTREPRENEUR_RESPONSE_PENDING';
  const resubmitted = step === 'RESUBMITTED' || step === 'DELTA_RE_SCRUTINY';
  const observation = ['CORRECTION_REQUIRED', 'RE_INSPECTION_REQUIRED', 'RE_INSPECTION_SCHEDULED', 'RE_INSPECTION_COMPLETED'].includes(step);
  return {
    ...initialState,
    ...(approved ? SAHYADRI_DEMO_APPROVED_STATE : {}),
    currentState: step,
    applicationStatus: approved ? 'APPROVED' : queryActive ? 'ACTION_REQUIRED' : resubmitted ? 'RESUBMITTED' : 'SUBMITTED',
    departmentStatus: approved ? 'DECISION_RECORDED' : 'UNDER_REVIEW',
    scrutinyStatus: approved || inspectionCompleted ? 'COMPLETED' : step === 'DELTA_RE_SCRUTINY' ? 'DELTA_RE_SCRUTINY' : 'IN_PROGRESS',
    inspectionStatus: inspectionCompleted ? 'COMPLETED' : step.startsWith('RE_INSPECTION') ? step : step.startsWith('INSPECTION_') ? step.replace('INSPECTION_', '') : 'SCHEDULED',
    decisionStatus: approved ? 'APPROVED' : step === 'FINAL_DECISION' ? 'FINAL_DECISION' : 'PENDING',
    approvalStatus: approved ? 'APPROVED' : 'PENDING',
    certificate: approved ? 'CERT-MIDC-2026-00187' : null,
    observationId: observation ? 'OBS-2026-MIDC-00187-01' : null,
    lastUpdated: new Date().toISOString(),
  };
}

function persist(state: SahyadriDemoWorkflowState): SahyadriDemoWorkflowState {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SAHYADRI_DEMO_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('ekatma:sahyadri-demo-state', { detail: state }));
  }
  return state;
}

export function readSahyadriDemoState(): SahyadriDemoWorkflowState {
  if (typeof window === 'undefined') return { ...initialState };
  try {
    const stored = window.localStorage.getItem(SAHYADRI_DEMO_STORAGE_KEY);
    return stored ? { ...initialState, ...JSON.parse(stored) } : { ...initialState };
  } catch {
    return { ...initialState };
  }
}

export function setSahyadriDemoStep(step: SahyadriDemoStep): SahyadriDemoWorkflowState {
  return persist(stateForStep(step));
}

export function advanceSahyadriDemo(): SahyadriDemoWorkflowState {
  const current = readSahyadriDemoState().currentState;
  const index = SAHYADRI_DEMO_STATES.indexOf(current as (typeof SAHYADRI_DEMO_STATES)[number]);
  return setSahyadriDemoStep(SAHYADRI_DEMO_STATES[Math.min(index < 0 ? 0 : index + 1, SAHYADRI_DEMO_STATES.length - 1)]);
}

export function approveSahyadriDemo(): SahyadriDemoWorkflowState {
  return setSahyadriDemoStep('APPROVED');
}

export function resetSahyadriDemo(): SahyadriDemoWorkflowState {
  return persist({ ...initialState, lastUpdated: new Date().toISOString() });
}

export function sahyadriDemoApplicationState(step: SahyadriDemoStep): ApplicationState {
  if (['APPROVED', 'CERTIFICATE_ISSUED', 'ENTREPRENEUR_NOTIFIED', 'NEXT_REQUIREMENTS_AVAILABLE'].includes(step)) return 'APPROVED';
  if (step === 'FINAL_DECISION' || step === 'INSPECTION_COMPLETED' || step === 'RE_INSPECTION_COMPLETED') return 'FINAL_DECISION';
  if (step === 'INSPECTION_SCHEDULED' || step === 'INSPECTION_IN_PROGRESS' || step === 'RE_INSPECTION_SCHEDULED') return 'INSPECTION_SCHEDULED';
  if (step === 'INSPECTION_PENDING' || step === 'RE_INSPECTION_REQUIRED') return 'INSPECTION_PENDING';
  if (step === 'RESUBMITTED' || step === 'DELTA_RE_SCRUTINY') return 'RESUBMITTED';
  if (step === 'QUERY_RAISED' || step === 'ENTREPRENEUR_RESPONSE_PENDING') return 'QUERY_RAISED';
  if (step === 'CORRECTION_REQUIRED') return 'CORRECTION_REQUIRED';
  if (step === 'TECHNICAL_SCRUTINY') return 'TECHNICAL_SCRUTINY';
  if (step === 'INITIAL_SCRUTINY' || step === 'UNDER_REVIEW') return 'INITIAL_SCRUTINY';
  if (step === 'DOCUMENT_SCRUTINY') return 'DOCUMENT_SCRUTINY';
  return 'SUBMITTED';
}

export function useSahyadriDemoState() {
  const [state, setState] = useState<SahyadriDemoWorkflowState>(initialState);
  useEffect(() => {
    setState(readSahyadriDemoState());
    const update = () => setState(readSahyadriDemoState());
    window.addEventListener('storage', update);
    window.addEventListener('ekatma:sahyadri-demo-state', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('ekatma:sahyadri-demo-state', update);
    };
  }, []);
  const setStep = useCallback((step: SahyadriDemoStep) => setState(setSahyadriDemoStep(step)), []);
  const advance = useCallback(() => {
    const next = advanceSahyadriDemo();
    setState(next);
    return next;
  }, []);
  const reset = useCallback(() => setState(resetSahyadriDemo()), []);
  return { state, setStep, advance, reset };
}
