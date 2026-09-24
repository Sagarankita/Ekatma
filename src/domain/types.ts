export type LoginState = 'default' | 'invalid-creds' | 'incorrect-captcha' | 'captcha-refreshed' | 'authenticating'
export type Service = any;
export type AdaptiveState = 'CONFIRMED'|'ANSWERED'|'VALIDATED'|'NEEDS_REVIEW'|'NOT_APPLICABLE'|'SKIPPED'|'REQUIRED'|'VISIBLE'|'NOT_VISIBLE'
export interface DnaHistoryEntry {
  value: string
  date: string
  source: string
  verify: VerifyState
  label?: string
}
export interface DnaConsistencyEntry {
  source: string
  value: string
  match: boolean
  dept?: string
}
export interface DnaField {
  id: string
  name: string
  value: string
  unit?: string
  cls: FieldClass
  source: string
  sourceType?: 'self-declared'|'verified-gov'|'system-verified'|'dept-record'|'other-dept'
  adaptive: AdaptiveState
  verify: VerifyState
  updated: string
  updatedVia?: string
  usedBy: string[]
  prev?: string
  prevDate?: string
  changeReason?: string
  branchNote?: string
  issueDate?: string
  expiryDate?: string
  history?: DnaHistoryEntry[]
  consistency?: DnaConsistencyEntry[]
}
export interface DnaSection {
  id: string
  title: string
  desc: string
  fields: DnaField[]
}
export type EventCategory = 'application'|'fee'|'documents'|'scrutiny'|'queries'|'entrepreneur'|'dependencies'|'inspection'|'decision'|'routing'
export type EventSource = 'officer'|'system'|'entrepreneur'|'external'|'inspection'
export interface TimelineEvent {
  id: string
  date: string
  time: string
  title: string
  category: EventCategory
  source: EventSource
  state?: string
  desk?: string
  role?: string
  action: string
  comment?: string
  timeSpent?: string
  timeSpentLabel?: string
  slaEffect?: string
  current?: boolean
  entrepreneurResponse?: { date: string; time: string; text: string; attachment?: string }
  routing?: { from: string; to: string; reason: string }
  dependency?: { name: string; before: string; after: string }
  resubmission?: { version: string; prevVersion: string; changes: number; docs: number }
}
export type PreCheckResult = 'verified' | 'warning' | 'judgment'
export interface PreCheck {
  id: string
  name: string
  result: PreCheckResult
  explanation: string
  source: string
  checkedAt: string
  rule?: string
  detail?: {
    values?: { label: string; value: string; match?: boolean }[]
    prevValue?: string
    currValue?: string
    changedAt?: string
    impact?: string
    nextReview?: string
    docs?: { name: string; status: string; verify: string; expiry?: string }[]
  }
}
export interface PreCheckGroup {
  id: string
  title: string
  desc: string
  checks: PreCheck[]
}
export interface ScrutinyFactor {
  id: string
  name: string
  result: 'verified' | 'warning' | 'judgment'
  condition: string
  source: string
  rule: string
  evaluatedAt: string
  detail?: { values?: { label: string; value: string; match?: boolean }[]; impact?: string; nextReview?: string }
}
export type OfficerReviewState = 'not-reviewed' | 'valid' | 'query' | 'invalid' | 'needs-verification'
export interface ScrutinyParam {
  id: string
  group: string
  name: string
  value: string
  unit?: string
  source: string
  verifyState: string
  appValue?: string
  prevValue?: string
  prevChanged: boolean
  crossForm?: { label: string; value: string; match: boolean }[]
  document?: { id?: string; name: string; status: string; version: string; source: string }
  dependency?: string
  reviewState: OfficerReviewState
  reviewNote?: string
}
export interface ScrutinySection {
  id: string
  label: string
  status: 'not-reviewed' | 'in-review' | 'reviewed' | 'query' | 'needs-verification'
  params: ScrutinyParam[]
}
export type ConsistencyStatus = 'reference' | 'match' | 'mismatch' | 'needs-verification' | 'not-applicable' | 'no-data'
export interface ConsistencyRow {
  source: string; dept: string; recordId: string; value: string;
  sourceType: string; verify: string; version: string; updatedAt: string;
  status: ConsistencyStatus;
}
export interface ConsistencyField {
  id: string; category: string; label: string; masterValue: string;
  status: ConsistencyStatus; records: ConsistencyRow[]; difference?: string;
  affectedRecords?: string[];
}
export type MismatchLifecycle = 'detected' | 'under-review' | 'query-raised' | 'exception-recorded' | 'resolved'
export type DepNodeStatus = 'completed' | 'current' | 'ready' | 'pending' | 'blocked' | 'conditional' | 'parallel'
export interface DepNode {
  id: string; label: string; dept: string; type: DepNodeType; status: DepNodeStatus
  ref?: string; relationship: string; blocking: boolean; unlockCondition?: string
  children?: string[]  // downstream node ids
  parallel?: string[]
}
export type DefStatus = 'unresolved' | 'in-query' | 'resolved' | 'partially-resolved' | 'reopened'
export interface Deficiency {
  id: string; category: string; source: string; issue: string; evidence: string
  relatedField: string; requiredCorrection: string; docRequested: string
  entrepreneurComment: string; internalNote: string; status: DefStatus; queryId?: string
  createdAt: string; updatedAt?: string; response?: string
}
export interface ScrutinyApp {
  appId: string; business: string; service: string; projectStage: string
  scrutinyStage: string; actionRequired: string; lastUpdated: string
  sla: 'Within SLA' | 'Due Soon' | 'SLA Risk' | 'SLA Breached'; status: string
  resubmitted: boolean; deltaRequired: boolean; inspectionPending: boolean
  modules: ScrutinyModule[]
}
export interface ScrutinyModule {
  id: string; name: string; mNum: string
  status: 'Not Started' | 'In Review' | 'Completed' | 'Needs Verification' | 'Issues Found' | 'Not Applicable' | 'Query Required' | 'Resubmission Received' | 'Review Required' | 'Pending'
  issues?: number; lastUpdated?: string
}
export type DeltaTab = 'changed' | 'affected' | 'unchanged'
export type ReviewStatus = 'not-reviewed' | 'under-review' | 'valid' | 'query' | 'invalid' | 'needs-verification' | 'reviewed-no-change'
export interface ChangedItem {
  id: string; field: string; prev: string; current: string; change: string
  changeType: 'value' | 'document' | 'status' | 'dna' | 'dependency' | 'applicability'
  source: string; verification: string; affectedAreas: string[]; reviewStatus: ReviewStatus
}
export interface AffectedItem {
  id: string; service: string; parameter: string; reason: string
  causedBy: string; prevValue?: string; currentValue?: string; reviewStatus: ReviewStatus
}
export interface UnchangedItem {
  id: string; field: string; value: string; verification: string; reviewStatus: 'no-review-required' | 'reviewed'
  selected?: boolean
}
export type InspStatus = 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RE_INSPECTION_REQUIRED' | 'AWAITING_COORDINATION' | 'NEEDS_VERIFICATION'
export interface InspRow {
  inspId: string; appId: string; business: string; service: string
  site: string; inspType: string; requiredBy: string
  status: InspStatus; assigned: string; targetDate: string
  slaImpact: string; reInspection: boolean; source: string
}
export type PlanStatus = 'Draft' | 'Coordination Required' | 'Ready to Schedule' | 'Scheduled' | 'Cancelled'
export type CalendarView = 'calendar' | 'list'
export type InspOutcome = 'PASS' | 'OBSERVATION' | 'NON_COMPLIANT' | 'CORRECTION_REQUIRED' | 'RE_INSPECTION_REQUIRED'
export type CheckStatus = 'Not Checked' | 'Checked' | 'Observation' | 'Not Applicable' | 'Needs Verification'
export interface CheckItem { id: string; category: string; item: string; dnaValue?: string; appValue?: string; status: CheckStatus; comment: string }
export interface ObsRecord { id: string; category: string; finding: string; evidence: string; comment: string; severity?: string; correctionRequired: boolean; reInspectionRequired: boolean }
export type ObsState = 'OPEN' | 'AWAITING_ENTREPRENEUR' | 'RESPONSE_RECEIVED' | 'UNDER_OFFICER_REVIEW' | 'RE_INSPECTION_REQUIRED' | 'RE_INSPECTION_SCHEDULED' | 'RESOLVED' | 'REOPENED'
export interface M24Event {
  date: string; type: string; id: string; title: string; detail: string; actor: string; evidence?: string; status?: string
}
export interface SyncEvent { id: string; time: string; from: string; to: string; action: string; result: 'Completed' | 'Pending' | 'Failed' | 'Not Required' }
export interface ComplianceObligation {
  id: string; title: string; source: string; type: string; due: string
  entStatus: string; evidence: string; verification: string; state: string
}
export interface ChangeField { field: string; current: string; proposed: string; delta: string; source: string; verification: string; changed: boolean }
export interface QueryRecord {
  queryId: string; sentAt: string; defCount: number; docsRequested: number
  appState: string; status: 'awaiting-response' | 'response-received' | 'closed' | 'draft'
  defs: string[]; response?: string; respondedAt?: string
}

export type VerifyState = 'SELF_DECLARED'|'USER_CONFIRMED'|'SYSTEM_VERIFIED'|'DEPARTMENT_VERIFIED'|'NEEDS_VERIFICATION'|'INVALID'|'EXPIRED';
export type FieldClass = 'APPLICATION'|'CONTEXT'|'MASTER_DATA'|'OTHER_DEPT';
export type DepNodeType = 'midc' | 'external' | 'milestone';