import * as States from './states';

export interface PresentationLabel {
  label: string;
  colorCls: string;
}

export const ApplicationStateLabels: Record<States.ApplicationState, PresentationLabel> = {
  DRAFT: { label: 'Draft', colorCls: 'bg-gray-100 text-gray-800' },
  READY_TO_SUBMIT: { label: 'Ready to Submit', colorCls: 'bg-sky-100 text-sky-800' },
  SUBMITTED: { label: 'Submitted', colorCls: 'bg-blue-100 text-blue-800' },
  FEE_CONFIRMED: { label: 'Fee Confirmed', colorCls: 'bg-blue-100 text-blue-800' },
  DOCUMENT_SCRUTINY: { label: 'Document Scrutiny', colorCls: 'bg-purple-100 text-purple-800' },
  INITIAL_SCRUTINY: { label: 'Initial Scrutiny', colorCls: 'bg-purple-100 text-purple-800' },
  TECHNICAL_SCRUTINY: { label: 'Technical Scrutiny', colorCls: 'bg-purple-100 text-purple-800' },
  QUERY_RAISED: { label: 'Query Raised', colorCls: 'bg-amber-100 text-amber-800' },
  CORRECTION_REQUIRED: { label: 'Correction Required', colorCls: 'bg-amber-100 text-amber-800' },
  RESUBMITTED: { label: 'Resubmitted', colorCls: 'bg-violet-100 text-violet-800' },
  INSPECTION_PENDING: { label: 'Inspection Pending', colorCls: 'bg-indigo-100 text-indigo-800' },
  INSPECTION_SCHEDULED: { label: 'Inspection Scheduled', colorCls: 'bg-indigo-100 text-indigo-800' },
  FINAL_DECISION: { label: 'Final Decision', colorCls: 'bg-cyan-100 text-cyan-800' },
  APPROVED: { label: 'Approved', colorCls: 'bg-emerald-100 text-emerald-800' },
  REJECTED: { label: 'Rejected', colorCls: 'bg-rose-100 text-rose-800' },
};

export const VerificationStateLabels: Record<States.VerificationState, PresentationLabel> = {
  pending: { label: 'Pending Verification', colorCls: 'bg-gray-100 text-gray-800' },
  verified: { label: 'Verified', colorCls: 'bg-emerald-100 text-emerald-800' },
  rejected: { label: 'Rejected', colorCls: 'bg-rose-100 text-rose-800' },
  clarification_requested: { label: 'Clarification Needed', colorCls: 'bg-amber-100 text-amber-800' },
};

export const DecisionStateLabels: Record<States.DecisionState, PresentationLabel> = {
  pending: { label: 'Pending', colorCls: 'bg-gray-100 text-gray-800' },
  approved: { label: 'Approved', colorCls: 'bg-emerald-100 text-emerald-800' },
  approved_with_conditions: { label: 'Conditional Approval', colorCls: 'bg-lime-100 text-lime-800' },
  rejected: { label: 'Rejected', colorCls: 'bg-rose-100 text-rose-800' },
};

export const InspectionStateLabels: Record<States.InspectionState, PresentationLabel> = {
  pending_schedule: { label: 'Pending Schedule', colorCls: 'bg-gray-100 text-gray-800' },
  scheduled: { label: 'Scheduled', colorCls: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'In Progress', colorCls: 'bg-amber-100 text-amber-800' },
  report_submitted: { label: 'Report Submitted', colorCls: 'bg-emerald-100 text-emerald-800' },
  completed: { label: 'Completed', colorCls: 'bg-emerald-200 text-emerald-900' },
};
