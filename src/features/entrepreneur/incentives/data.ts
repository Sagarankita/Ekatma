import { findBusinessEntity } from '../identity/catalog';

export type IncentiveEligState = 'Appears eligible from available data' | 'Needs Verification' | 'Missing Condition-data' | 'Not Currently Applicable'

export interface IncentiveBenefit {
  id: string
  name: string
  eligState: IncentiveEligState
  estimatedBenefit: string | null
  conditions: Array<{ text: string; state: 'satisfied' | 'needs-verification' | 'missing' }>
  verificationNeeds: string[]
  requiredEvidence: string[]
  applicationSteps: string[]
  claimCycle: string | null
}

export interface IncentiveScheme {
  id: string
  name: string
  authority: string
  category: string
  projectStage: string
  potentialBenefits: string
  eligState: IncentiveEligState
  keyMilestone: string
  matchBasis: string[]
  benefits: IncentiveBenefit[]
}

export const INCENTIVE_SCHEMES: IncentiveScheme[] = [
  {
    id: 'PSI-2019',
    name: 'Package Scheme of Incentives 2019 (PSI)',
    authority: 'Industries, Energy & Labour Dept., GoM',
    category: 'Capital Subsidy / Interest Subsidy',
    projectStage: 'New / Expansion',
    potentialBenefits: 'Capital subsidy on fixed capital investment; interest subsidy; electricity duty exemption',
    eligState: 'Appears eligible from available data',
    keyMilestone: 'Obtain Eligibility Certificate before commercial production',
    matchBasis: ['Sector: Pharmaceuticals (eligible sector)', 'Location: Chakan — categorised Vidarbha / Marathwada / Developing Area (D+/D zone)', 'Classification: MSME', 'Investment: Within eligible threshold', 'Employment: Threshold likely met'],
    benefits: [
      {
        id: 'PSI-2019-B1',
        name: 'Capital Subsidy',
        eligState: 'Appears eligible from available data',
        estimatedBenefit: 'Estimated at 25–30% of eligible fixed capital investment (preliminary, subject to zone classification and scheme rules)',
        conditions: [
          { text: 'New / expansion project in eligible sector', state: 'satisfied' },
          { text: 'Eligible location zone (D+/D or above)', state: 'needs-verification' },
          { text: 'Minimum fixed capital investment threshold', state: 'satisfied' },
          { text: 'Commercial production commenced', state: 'missing' },
        ],
        verificationNeeds: ['Confirm MIDC Chakan Phase II zone classification under PSI 2019 schedule', 'Investment classification to be verified against CA certificate'],
        requiredEvidence: ['CA-certified fixed capital investment statement', 'Commencement of Production certificate', 'MIDC allotment letter confirming plot location'],
        applicationSteps: ['Preliminary Match', 'Apply for Eligibility Certificate (EC) with Industries Dept.', 'Authority Verification', 'Issue of Eligibility Certificate', 'Periodic Claims on achieving milestones', 'Verification', 'Sanction / Disbursement'],
        claimCycle: 'Milestone-based Claim — on achieving investment and production milestones',
      },
      {
        id: 'PSI-2019-B2',
        name: 'Interest Subsidy',
        eligState: 'Needs Verification',
        estimatedBenefit: null,
        conditions: [
          { text: 'Term loan from scheduled bank / financial institution', state: 'needs-verification' },
          { text: 'Loan applied for eligible fixed assets', state: 'needs-verification' },
          { text: 'Eligible zone classification', state: 'needs-verification' },
        ],
        verificationNeeds: ['Confirm term loan structure and eligible asset linkage', 'Zone classification'],
        requiredEvidence: ['Bank term loan sanction letter', 'Asset-wise loan utilisation certificate'],
        applicationSteps: ['Preliminary Match', 'Eligibility Application', 'Authority Verification', 'Annual Claim submission', 'Verification', 'Sanction'],
        claimCycle: 'Annual Claim — interest paid during the year',
      },
      {
        id: 'PSI-2019-B3',
        name: 'Electricity Duty Exemption',
        eligState: 'Appears eligible from available data',
        estimatedBenefit: 'Exemption estimated up to 7 years from date of commercial production (preliminary)',
        conditions: [
          { text: 'Industrial unit in eligible category and zone', state: 'satisfied' },
          { text: 'HT / LT connection for manufacturing use', state: 'satisfied' },
          { text: 'Commercial production date established', state: 'missing' },
        ],
        verificationNeeds: ['Commercial production date to be certified'],
        requiredEvidence: ['Commencement of Production certificate', 'Electricity connection details', 'Monthly electricity bills'],
        applicationSteps: ['Preliminary Match', 'Eligibility Application to MSEDCL', 'Verification', 'Exemption Order', 'Periodic Claims', 'Sanction'],
        claimCycle: 'Periodic Claim — monthly / quarterly electricity bills',
      },
    ],
  },
  {
    id: 'MSME-CLSS',
    name: 'MSME Credit Linked Capital Subsidy Scheme (CLCSS)',
    authority: 'Ministry of MSME, Government of India',
    category: 'Technology Upgradation',
    projectStage: 'New / Expansion / Technology Upgrade',
    potentialBenefits: 'Capital subsidy of 15% on institutional credit for technology upgradation up to Rs. 1 crore',
    eligState: 'Needs Verification',
    keyMilestone: 'Loan availed from approved PLI/financial institution',
    matchBasis: ['Classification: MSME (registered)', 'Sector: Manufacturing — pharmaceutical sector is eligible', 'Investment: Within eligible ceiling'],
    benefits: [
      {
        id: 'MSME-CLSS-B1',
        name: 'Capital Subsidy for Technology Upgradation',
        eligState: 'Needs Verification',
        estimatedBenefit: null,
        conditions: [
          { text: 'Registered MSME (Udyam Registration)', state: 'needs-verification' },
          { text: 'Loan from approved Primary Lending Institution (PLI)', state: 'missing' },
          { text: 'Technology upgradation purpose established', state: 'needs-verification' },
          { text: 'Eligible sub-sector (pharmaceutical manufacture)', state: 'satisfied' },
        ],
        verificationNeeds: ['Udyam Registration number', 'PLI loan details and purpose confirmation'],
        requiredEvidence: ['Udyam Registration certificate', 'Bank / NBFC loan sanction letter', 'Technology upgradation project report'],
        applicationSteps: ['Preliminary Match', 'Apply via approved PLI', 'PLI verification', 'Claim to SIDBI / Nodal Bank', 'Subsidy disbursement to PLI'],
        claimCycle: null,
      },
    ],
  },
  {
    id: 'MAITRI-FAST',
    name: 'MAITRI — Single Window Facilitation',
    authority: 'MIDC / Industries Dept., GoM',
    category: 'Facilitation',
    projectStage: 'New / Expansion',
    potentialBenefits: 'Single window time-bound approvals; dedicated relationship manager; fast-track processing',
    eligState: 'Appears eligible from available data',
    keyMilestone: 'Register for MAITRI and submit project details',
    matchBasis: ['MIDC allottee', 'Sector: Pharmaceutical', 'Location: Chakan'],
    benefits: [
      {
        id: 'MAITRI-B1',
        name: 'Single Window Approval Facilitation',
        eligState: 'Appears eligible from available data',
        estimatedBenefit: 'Non-monetary — time-bound approval processing',
        conditions: [
          { text: 'MIDC allottee', state: 'satisfied' },
          { text: 'Project registered on MAITRI portal', state: 'missing' },
        ],
        verificationNeeds: [],
        requiredEvidence: ['MIDC allotment letter', 'Project details'],
        applicationSteps: ['Register on MAITRI portal', 'Submit project profile', 'Dedicated Relationship Manager assigned', 'Fast-track single window processing'],
        claimCycle: null,
      },
    ],
  },
  {
    id: 'PLI-PHARMA',
    name: 'Production Linked Incentive Scheme — Pharmaceuticals',
    authority: 'Dept. of Pharmaceuticals, Government of India',
    category: 'Production Incentive',
    projectStage: 'Operational',
    potentialBenefits: 'Incentive on incremental sales over base year for eligible pharmaceutical products',
    eligState: 'Not Currently Applicable',
    keyMilestone: 'Scheme application (new tranches subject to notification)',
    matchBasis: ['Sector: Pharmaceutical manufacturing'],
    benefits: [
      {
        id: 'PLI-B1',
        name: 'Production Linked Incentive on Incremental Sales',
        eligState: 'Not Currently Applicable',
        estimatedBenefit: null,
        conditions: [
          { text: 'Current scheme tranches are closed / not accepting applications', state: 'missing' },
          { text: 'Eligible pharmaceutical product category', state: 'needs-verification' },
          { text: 'Minimum committed investment threshold', state: 'needs-verification' },
          { text: 'Established baseline sales year', state: 'missing' },
        ],
        verificationNeeds: ['Monitor for new scheme notifications from Dept. of Pharmaceuticals'],
        requiredEvidence: ['Product registration certificates', 'Audited sales data'],
        applicationSteps: ['Await new tranche notification', 'Apply when scheme opens', 'Baseline assessment', 'Annual incentive claims'],
        claimCycle: 'Annual Claim — based on incremental sales over base year',
      },
    ],
  },
]

export type E28LifecycleStage =
  | 'Eligibility Application'
  | 'Department Scrutiny'
  | 'Eligibility Certificate'
  | 'Claim Period'
  | 'Claim Submitted'
  | 'Under Verification'
  | 'Sanctioned'
  | 'Disbursed'
  | 'Correction Required'

export interface IncentiveClaim {
  id: string
  schemeId: string
  period: string
  benefit: string
  claimedAmount: string
  evidence: string[]
  submissionDate: string
  status: E28LifecycleStage
  deptComments: string | null
  sanctionedAmount: string | null
  disbursement: string | null
}

export const E28_LIFECYCLE: E28LifecycleStage[] = [
  'Eligibility Application',
  'Department Scrutiny',
  'Eligibility Certificate',
  'Claim Period',
  'Claim Submitted',
  'Under Verification',
  'Sanctioned',
  'Disbursed',
]

export const SAMPLE_CLAIMS: IncentiveClaim[] = [
  {
    id: 'CLM-2027-001',
    schemeId: 'PSI-2019',
    period: 'Oct 2026 – Mar 2027',
    benefit: 'Capital Subsidy',
    claimedAmount: '₹ 42,50,000',
    evidence: ['CA-certified Fixed Capital Investment Statement', 'Commencement of Production Certificate', 'MIDC Allotment Letter'],
    submissionDate: '12 Apr 2027',
    status: 'Under Verification',
    deptComments: 'Investment schedule submitted. Verification of MIDC plot classification pending.',
    sanctionedAmount: null,
    disbursement: null,
  },
  {
    id: 'CLM-2027-002',
    schemeId: 'PSI-2019',
    period: 'Oct 2026 – Mar 2027',
    benefit: 'Electricity Duty Exemption',
    claimedAmount: '₹ 3,80,000',
    evidence: ['Commencement of Production Certificate', 'Electricity Bills (Oct 2026 – Mar 2027)'],
    submissionDate: '14 Apr 2027',
    status: 'Correction Required',
    deptComments: 'Commencement of Production date discrepancy. Resubmit corrected certificate.',
    sanctionedAmount: null,
    disbursement: null,
  },
  {
    id: 'CLM-2026-001',
    schemeId: 'PSI-2019',
    period: 'Apr 2026 – Sep 2026',
    benefit: 'Electricity Duty Exemption',
    claimedAmount: '₹ 3,20,000',
    evidence: ['Electricity Bills (Apr 2026 – Sep 2026)', 'Commencement of Production Certificate'],
    submissionDate: '10 Oct 2026',
    status: 'Disbursed',
    deptComments: 'Verified. Exemption allowed as claimed.',
    sanctionedAmount: '₹ 3,20,000',
    disbursement: '28 Nov 2026 — MSEDCL adjustment',
  },
]

export function findIncentiveById(id: string): IncentiveScheme | undefined {
  return INCENTIVE_SCHEMES.find(scheme => scheme.id === id);
}

export function findIncentiveForBusiness(businessId: string, id: string): IncentiveScheme | undefined {
  if (!findBusinessEntity('incentive', businessId, id)) return undefined;
  return findIncentiveById(id);
}

export function listIncentivesForBusiness(businessId: string): IncentiveScheme[] {
  return INCENTIVE_SCHEMES.filter(scheme => Boolean(findBusinessEntity('incentive', businessId, scheme.id)));
}

export function listClaimsForScheme(schemeId: string): IncentiveClaim[] {
  return SAMPLE_CLAIMS.filter(claim => claim.schemeId === schemeId);
}

export function listClaimsForBusiness(businessId: string, schemeId: string): IncentiveClaim[] {
  if (!findBusinessEntity('incentive', businessId, schemeId)) return [];
  return listClaimsForScheme(schemeId).filter(claim => findBusinessEntity('claim', businessId, claim.id)?.parentId === schemeId);
}
