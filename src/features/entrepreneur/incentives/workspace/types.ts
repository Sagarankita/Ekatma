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
}

export interface IncentiveClaimDetail {
  id: string
  schemeId: string
  schemeName: string
  amount: string
  status: ClaimStatus
  updated: string
  nextAction: string
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
