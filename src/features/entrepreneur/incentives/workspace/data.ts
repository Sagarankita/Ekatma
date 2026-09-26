import { IncentiveSchemeDetail, IncentiveClaimDetail, IncentiveRoiInput, IncentivePolicyUpdate } from './types';

const BP004_DETAIL_SCHEMES: IncentiveSchemeDetail[] = [
  {
    id: 'PSI-2019',
    name: 'Package Scheme of Incentives 2019 — Capital Subsidy',
    authority: 'Government of Maharashtra / Industries Dept.',
    benefitType: 'subsidy',
    status: 'strong-match',
    estimatedMin: 80, estimatedMax: 120, unit: 'lakh',
    period: 'One-time (post-commercial production)',
    criteria: [
      { label: 'Eligible Sector — Manufacturing', met: true },
      { label: 'New Industrial Unit', met: true },
      { label: 'Location — Category B District (Ratnagiri)', met: true },
      { label: 'Fixed Capital Investment ≥ ₹1 Cr', met: true },
      { label: 'MSME Classification', met: true },
      { label: 'Commercial Production Certificate', met: false, note: 'Verification pending — date not yet confirmed' },
    ],
    policyName: 'PSI 2019', policyVersion: 'v3.1', effectiveFrom: '01 Apr 2019',
    eligibleBase: '₹8.0 Cr (Plant & Machinery)', applicableRate: '10%', policyCeiling: '₹1.2 Cr',
    calcInputs: [
      { label: 'Fixed Capital Investment', value: '₹10.0 Cr', source: 'Business DNA' },
      { label: 'Plant & Machinery Component', value: '₹8.0 Cr', source: 'User Confirmed' },
      { label: 'Location Category', value: 'B (Ratnagiri)', source: 'Business DNA — Verified' },
      { label: 'MSME Classification', value: 'Small Enterprise', source: 'Business DNA — Verified' },
      { label: 'Applicable Rate', value: '10%', source: 'PSI 2019 — Annexure I' },
      { label: 'Policy Ceiling', value: '₹1.2 Cr', source: 'PSI 2019 — Schedule A' },
    ],
  },
  {
    id: 'PSI-ELEC',
    name: 'PSI 2019 — Electricity Duty Exemption',
    authority: 'Government of Maharashtra / MSEDCL',
    benefitType: 'exemption',
    status: 'strong-match',
    estimatedMin: 15, estimatedMax: 25, unit: 'lakh',
    period: '7 years from commencement',
    criteria: [
      { label: 'New Industrial Unit', met: true },
      { label: 'Category B / C Location', met: true },
      { label: 'Electricity connection — industrial tariff', met: true },
      { label: 'Annual consumption estimate available', met: false, note: 'Provide expected kVA load and annual units' },
    ],
    policyName: 'PSI 2019 — Electricity Rules', policyVersion: 'v2.0', effectiveFrom: '01 Apr 2019',
    eligibleBase: 'Annual electricity duty payable', applicableRate: '100% exemption', policyCeiling: '₹30 Lakh/year',
    calcInputs: [
      { label: 'Estimated Annual Consumption', value: '18 Lakh units', source: 'User Assumption' },
      { label: 'Electricity Duty Rate', value: '₹0.10/unit', source: 'Approved Benchmark' },
      { label: 'Exemption Period', value: '7 years', source: 'PSI 2019 — Schedule B' },
    ],
    missingInfo: ['Expected electricity consumption (kWh/year)', 'Sanctioned connected load (kVA)'],
  },
  {
    id: 'STAMP',
    name: 'Stamp Duty Exemption — New Industrial Unit',
    authority: 'Revenue & Forest Department, Maharashtra',
    benefitType: 'exemption',
    status: 'strong-match',
    estimatedMin: 3, estimatedMax: 6, unit: 'lakh',
    period: 'One-time (at registration)',
    criteria: [
      { label: 'New Industrial Unit', met: true },
      { label: 'Eligible Zone', met: true },
      { label: 'Land / Lease agreement registered', met: true },
      { label: 'Project commencement within 3 years', met: true },
    ],
    policyName: 'Maharashtra Stamp Act — Industrial Exemption Notification', policyVersion: 'Notif. 2021', effectiveFrom: '15 Mar 2021',
    eligibleBase: 'Stamp duty on land / lease deed', applicableRate: '100% exemption', policyCeiling: '₹10 Lakh',
    calcInputs: [
      { label: 'Estimated Land / Lease Value', value: '₹3.5 Cr', source: 'User Confirmed' },
      { label: 'Applicable Stamp Duty Rate', value: '1.5%', source: 'Approved Benchmark' },
    ],
    missingInfo: [],
  },
  {
    id: 'EMP-LINK',
    name: 'Employment-Linked Incentive — Maharashtra',
    authority: 'Directorate of Industries, Maharashtra',
    benefitType: 'grant',
    status: 'conditional',
    estimatedMin: 20, estimatedMax: 40, unit: 'lakh',
    period: '3 years',
    criteria: [
      { label: 'Manufacturing — eligible sector', met: true },
      { label: 'Location — Category B/C', met: true },
      { label: 'Net new employment ≥ 100 persons', met: true },
      { label: 'MSME / Large Enterprise classification', met: true },
      { label: 'Employment evidence / PF registration', met: false, note: 'PF registration and payroll evidence required post-commencement' },
    ],
    policyName: 'ELI Scheme 2022', policyVersion: 'v1.0', effectiveFrom: '01 Jan 2022',
    eligibleBase: 'Per additional employee generated', applicableRate: '₹15,000/employee/year', policyCeiling: '₹50 Lakh over 3 years',
    calcInputs: [
      { label: 'Expected Net New Employment', value: '150 persons', source: 'Business DNA — Self-declared' },
      { label: 'Rate per Employee', value: '₹15,000/year', source: 'ELI Scheme 2022 — Schedule I' },
      { label: 'Benefit Period', value: '3 years', source: 'ELI Scheme 2022' },
    ],
    missingInfo: ['PF registration certificate', 'Projected payroll breakup'],
  },
  {
    id: 'GREEN',
    name: 'Green / Sustainability Investment Support',
    authority: 'MPCB / Industries Dept., Maharashtra',
    benefitType: 'reimbursement',
    status: 'conditional',
    estimatedMin: 10, estimatedMax: 30, unit: 'lakh',
    period: 'One-time reimbursement',
    criteria: [
      { label: 'Manufacturing sector', met: true },
      { label: 'New Unit or Expansion', met: true },
      { label: 'Eligible green investment category', met: false, note: 'Requires energy efficiency / renewable investment above threshold' },
      { label: 'Green investment ≥ 5% of project cost', met: false, note: 'Cannot be assessed without green capex data' },
    ],
    policyName: 'Maharashtra Green Industry Incentive Scheme', policyVersion: 'v1.2', effectiveFrom: '01 Apr 2022',
    eligibleBase: 'Eligible green capital expenditure', applicableRate: '25%', policyCeiling: '₹50 Lakh',
    calcInputs: [],
    missingInfo: ['Proposed energy efficiency investment (₹ Cr)', 'Renewable energy investment (₹ Cr)', 'Water recycling investment (₹ Cr)'],
  },
  {
    id: 'MIDC-INFRA',
    name: 'MIDC Infrastructure Contribution Waiver',
    authority: 'MIDC',
    benefitType: 'exemption',
    status: 'strong-match',
    estimatedMin: 5, estimatedMax: 15, unit: 'lakh',
    period: 'One-time (at allotment)',
    criteria: [
      { label: 'MIDC plot allottee', met: true },
      { label: 'New Unit in MIDC estate', met: true },
      { label: 'Plot area ≤ threshold for partial waiver', met: true },
      { label: 'Construction within stipulated period', met: true },
    ],
    policyName: 'MIDC Infrastructure Charges Policy 2020', policyVersion: 'v2.0', effectiveFrom: '01 Jan 2020',
    eligibleBase: 'Infrastructure charges on plot area', applicableRate: '25% waiver', policyCeiling: '₹20 Lakh',
    calcInputs: [
      { label: 'MIDC Plot Area', value: '2,500 sqm', source: 'Business DNA — MIDC Allotment Letter' },
      { label: 'Infrastructure Charge Rate', value: '₹800/sqm', source: 'MIDC Circular 2020' },
    ],
    missingInfo: [],
  },
  {
    id: 'RD-INNOV',
    name: 'R&D / Innovation Support — MSME',
    authority: 'DST / Ministry of MSME',
    benefitType: 'grant',
    status: 'needs-info',
    estimatedMin: 5, estimatedMax: 50, unit: 'lakh',
    period: 'Project-based (1–3 years)',
    criteria: [
      { label: 'MSME classification', met: true },
      { label: 'R&D or innovation expenditure planned', met: false, note: 'Not assessed — no R&D budget provided' },
      { label: 'Technology upgrade or new product development', met: false, note: 'Cannot determine without R&D activity details' },
    ],
    policyName: 'MSME Innovation Scheme / DST MSME Grant', policyVersion: 'Prototype Reference', effectiveFrom: 'Varies by scheme',
    eligibleBase: 'Eligible R&D expenditure', applicableRate: 'Up to 50%', policyCeiling: '₹50 Lakh',
    calcInputs: [],
    missingInfo: ['Planned R&D expenditure (₹ Lakh)', 'Nature of R&D activity', 'Patent / IP filing plans'],
  },
];

const BP004_CLAIMS: IncentiveClaimDetail[] = [
  { id: 'CLM-2026-001', schemeId: 'PSI-2019', schemeName: 'PSI 2019 — Capital Subsidy', amount: '₹80–₹1.2 Cr', status: 'preparing', updated: '15 Sep 2026', nextAction: 'Upload machinery invoices' },
];

const BP004_ROI_INPUTS: IncentiveRoiInput[] = [
  { label: 'Total Fixed Capital Investment', value: '₹10.0 Cr', source: 'Business DNA', verified: true },
  { label: 'Plant & Machinery', value: '₹8.0 Cr', source: 'User Confirmed', verified: false },
  { label: 'Building & Civil', value: '₹1.5 Cr', source: 'User Confirmed', verified: false },
  { label: 'Working Capital', value: '₹2.0 Cr', source: 'Self-declared', verified: false },
  { label: 'Production Capacity', value: '5,000 MT/year', source: 'Business DNA', verified: true },
  { label: 'Capacity Utilisation (Yr 1)', value: '60%', source: 'User Assumption', verified: false },
  { label: 'Capacity Utilisation (Yr 3+)', value: '80%', source: 'User Assumption', verified: false },
  { label: 'Average Selling Price', value: '₹1,800/MT', source: 'User Assumption', verified: false },
  { label: 'Raw Material Cost', value: '₹900/MT', source: 'User Assumption', verified: false },
  { label: 'Labour Cost (Annual)', value: '₹1.2 Cr', source: 'User Assumption', verified: false },
  { label: 'Energy Cost (Annual)', value: '₹0.8 Cr', source: 'User Assumption', verified: false },
  { label: 'Revenue Growth Rate', value: '8%/year', source: 'Approved Benchmark', verified: true },
];

const BP004_POLICY_UPDATES: IncentivePolicyUpdate[] = [
  { id: 'PU-001', type: 'amendment', title: 'PSI 2019 — Ratnagiri District Category Upgraded to A', summary: 'Ratnagiri district reclassified from Category B to Category A effective 01 Jan 2027, potentially increasing capital subsidy ceiling.', validated: true, effectiveDate: '01 Jan 2027', affectedSchemes: ['PSI-2019', 'PSI-ELEC'], impact: 'positive', detected: '20 Sep 2026' },
  { id: 'PU-002', type: 'new-scheme', title: 'New — Pharmaceutical Sector Incentive Package 2026', summary: 'New dedicated incentive package for pharmaceutical manufacturing units announced. Eligibility assessment pending your business profile.', validated: false, effectiveDate: 'TBD — Draft Stage', affectedSchemes: [], impact: 'potential', detected: '22 Sep 2026' },
];

const INCENTIVE_FIXTURES: Record<string, {
  schemes: IncentiveSchemeDetail[]
  claims: IncentiveClaimDetail[]
  roiInputs: IncentiveRoiInput[]
  policyUpdates: IncentivePolicyUpdate[]
}> = {
  'BP-004': {
    schemes: BP004_DETAIL_SCHEMES,
    claims: BP004_CLAIMS,
    roiInputs: BP004_ROI_INPUTS,
    policyUpdates: BP004_POLICY_UPDATES,
  }
}

export function getIncentiveDetailSchemes(businessId: string): IncentiveSchemeDetail[] {
  return INCENTIVE_FIXTURES[businessId]?.schemes || [];
}

export function getIncentiveClaims(businessId: string): IncentiveClaimDetail[] {
  return INCENTIVE_FIXTURES[businessId]?.claims || [];
}

export function getIncentiveRoiInputs(businessId: string): IncentiveRoiInput[] {
  return INCENTIVE_FIXTURES[businessId]?.roiInputs || [];
}

export function getIncentivePolicyUpdates(businessId: string): IncentivePolicyUpdate[] {
  return INCENTIVE_FIXTURES[businessId]?.policyUpdates || [];
}
