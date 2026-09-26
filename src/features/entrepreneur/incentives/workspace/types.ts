export type IncentiveStatus = 'strong-match' | 'conditional' | 'needs-info' | 'not-applicable'
export type ClaimStatus = 'preparing' | 'submitted' | 'under-review' | 'query-raised' | 'resubmitted' | 'approved' | 'received'

export interface IncentiveSchemeDetail {
  id: string
  name: string
  authority: string
  benefitType: 'reimbursement' | 'subsidy' | 'exemption' | 'grant' | 'recurring'
  status: IncentiveStatus
  estimatedMin: number
  estimatedMax: number
  unit: 'lakh' | 'cr'
  period: string
  criteria: { label: string; met: boolean; note?: string }[]
  policyName: string
  policyVersion: string
  effectiveFrom: string
  eligibleBase: string
  applicableRate: string
  policyCeiling: string
  calcInputs: { label: string; value: string; source: string }[]
  missingInfo?: string[]
  claimId?: string
  claimStatus?: ClaimStatus
  claimCycle?: string
  nextFilingWindow?: string
  eligibilityConditions?: { text: string; state: 'satisfied' | 'needs-verification' | 'missing' }[]
}

export interface IncentiveClaimDetail {
  id: string
  schemeId: string
  schemeName: string
  amount: string
  status: ClaimStatus
  updated: string
  nextAction: string
  period?: string
  submittedDate?: string
  correctionReason?: string
  correctionDueDate?: string
  applicationReference?: { label: 'Eligibility Certificate' | 'Application Reference'; identifier: string; status?: string }
  previousPeriods?: { period: string; status: string; submittedDate: string; amount?: string }[]
}

export interface IncentiveFilingWindow {
  period: string
  filingWindow: string
  deadline?: string
  readiness: string
}

export interface IncentiveRoiInput {
  label: string
  value: string
  source: string
  verified: boolean
}

export interface IncentivePolicyUpdate {
  id: string
  type: string
  title: string
  summary: string
  validated: boolean
  effectiveDate: string
  affectedSchemes: string[]
  impact: string
  detected: string
}
