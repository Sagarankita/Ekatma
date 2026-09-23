export type ApplicationState = 
  | 'draft'
  | 'submitted'
  | 'under_scrutiny'
  | 'query_raised'
  | 'inspection_pending'
  | 'decision_pending'
  | 'approved'
  | 'rejected'
  | 'withdrawn';

export type AdaptiveQuestionState = 
  | 'unanswered'
  | 'answered'
  | 'skipped';

export type VerificationState = 
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'clarification_requested';

export type RegulatoryApplicabilityState = 
  | 'applicable'
  | 'exempt'
  | 'conditional';

export type PaymentState = 
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'refunded';

export type QueryState = 
  | 'draft'
  | 'issued'
  | 'responded'
  | 'resolved'
  | 'escalated';

export type DeficiencyState = 
  | 'identified'
  | 'notified'
  | 'corrected'
  | 'accepted';

export type InspectionState = 
  | 'pending_schedule'
  | 'scheduled'
  | 'in_progress'
  | 'report_submitted'
  | 'completed';

export type DecisionState = 
  | 'pending'
  | 'approved'
  | 'approved_with_conditions'
  | 'rejected';

export type DependencyState = 
  | 'pending'
  | 'satisfied'
  | 'blocked'
  | 'waived';

export type ComplianceState = 
  | 'pending'
  | 'compliant'
  | 'non_compliant'
  | 'under_review';

export type GrievanceState = 
  | 'lodged'
  | 'under_investigation'
  | 'resolved'
  | 'dismissed';
