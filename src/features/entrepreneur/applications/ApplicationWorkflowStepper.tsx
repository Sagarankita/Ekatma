'use client';

import React from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { Check, ChevronRight } from 'lucide-react';

export type WorkflowStepId = 1 | 2 | 3 | 4 | 5 | 6;

interface StepItem {
  id: WorkflowStepId;
  label: string;
  shortLabel: string;
  description: string;
  getHref: (businessId: string) => string;
}

export const APPLICATION_STEPS: StepItem[] = [
  {
    id: 1,
    label: 'REVIEW INFORMATION',
    shortLabel: 'Review Info',
    description: 'Dossier Master Facts',
    getHref: (bId: string) => ENTREPRENEUR_ROUTES.newApplication(bId),
  },
  {
    id: 2,
    label: 'COMPLETE APPLICATION',
    shortLabel: 'Complete App',
    description: 'Questions & Documents',
    getHref: (bId: string) => ENTREPRENEUR_ROUTES.newApplication(bId),
  },
  {
    id: 3,
    label: 'CHECK FOR ISSUES',
    shortLabel: 'Check Issues',
    description: 'Statutory Pre-validation',
    getHref: (bId: string) => ENTREPRENEUR_ROUTES.applicationPrevalidation(bId),
  },
  {
    id: 4,
    label: 'RESOLVE ISSUES',
    shortLabel: 'Resolve Issues',
    description: 'Cross-Form Consistency',
    getHref: (bId: string) => ENTREPRENEUR_ROUTES.applicationConsistency(bId),
  },
  {
    id: 5,
    label: 'PAY',
    shortLabel: 'Pay Fee',
    description: 'e-Challan / Portal',
    getHref: (bId: string) => ENTREPRENEUR_ROUTES.applicationSubmission(bId),
  },
  {
    id: 6,
    label: 'SUBMIT',
    shortLabel: 'Sign & Submit',
    description: 'Digital Signature',
    getHref: (bId: string) => ENTREPRENEUR_ROUTES.applicationSubmission(bId),
  },
];

interface ApplicationWorkflowStepperProps {
  businessId: string;
  currentStep: WorkflowStepId;
}

export function ApplicationWorkflowStepper({
  businessId,
  currentStep,
}: ApplicationWorkflowStepperProps) {
  return (
    <nav
      aria-label="Application creation progress"
      className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-2xs"
    >
      <div className="max-w-[1400px] mx-auto overflow-x-auto scrollbar-none">
        <ol className="flex items-center justify-between min-w-[760px] gap-2">
          {APPLICATION_STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isFuture = step.id > currentStep;
            const href = step.getHref(businessId);

            return (
              <li key={step.id} className="flex-1 flex items-center">
                <Link
                  href={href}
                  className={`group flex items-center gap-2.5 p-2 rounded-lg transition-all w-full ${
                    isCurrent
                      ? 'bg-[#355E3B]/8 border border-[#355E3B]/20 shadow-2xs'
                      : isCompleted
                      ? 'hover:bg-slate-50'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Step Number or Checkmark Badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#355E3B] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id}
                  </div>

                  {/* Step Text */}
                  <div className="min-w-0">
                    <p
                      className={`text-[11px] font-extrabold uppercase tracking-wider truncate leading-tight ${
                        isCurrent
                          ? 'text-[#355E3B]'
                          : isCompleted
                          ? 'text-emerald-800'
                          : 'text-slate-600'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </Link>

                {/* Arrow separator between steps */}
                {idx < APPLICATION_STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 mx-1 shrink-0" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
