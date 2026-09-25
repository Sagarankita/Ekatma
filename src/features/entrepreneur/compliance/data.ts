import { findBusinessEntity } from '../identity/catalog';

export type ComplianceStatus = 'Compliant' | 'Due Soon' | 'Overdue' | 'Action Required' | 'Under Verification'
type ComplianceCategory = 'Environmental' | 'Periodic Returns' | 'Renewals' | 'Approval Conditions' | 'Labour' | 'Sector-specific' | 'Other'

export interface ComplianceObligation {
  id: string
  name: string
  dept: string
  category: ComplianceCategory
  dueDate: string
  dueDateMs: number
  frequency: string
  status: ComplianceStatus
  actionRequired: string | null
  sourceApprovalId: string
  sourceCondition: string
  relevantCondition: string
  requiredDocs: { id: string; name: string }[]
  previousSubmission: { date: string; ref: string; state: string } | null
  verification: string
  nextDueDate: string | null
  description: string
  whyRequired: string
}

export const COMPLIANCE_OBLIGATIONS: ComplianceObligation[] = [
  {
    id: 'CPL-001',
    name: 'ETP Commissioning Report',
    dept: 'MPCB',
    category: 'Approval Conditions',
    dueDate: '09 Nov 2026',
    dueDateMs: new Date('2026-11-09').getTime(),
    frequency: 'One-time (post trial production)',
    status: 'Action Required',
    actionRequired: 'Submit ETP commissioning report to MPCB within 30 days of commencing trial production.',
    sourceApprovalId: 'CTE-2026-MPCB-41872',
    sourceCondition: 'Special Condition SC1',
    relevantCondition: 'ETP commissioning report must be submitted to MPCB within 30 days of trial production.',
    requiredDocs: [
      { id: 'DOC-006', name: 'ETP Design Details' },
    ],
    previousSubmission: null,
    verification: 'Not Yet Submitted',
    nextDueDate: null,
    description: 'A commissioning report documenting that the Effluent Treatment Plant (ETP) has been successfully installed, tested, and is operating at the approved capacity of 70 KL/day.',
    whyRequired: 'Required by MPCB as a special condition of the Consent to Establish approval to confirm that the ETP is operational before regular production begins.',
  },
  {
    id: 'CPL-002',
    name: 'Hazardous Waste Manifest Records',
    dept: 'MPCB',
    category: 'Approval Conditions',
    dueDate: 'Ongoing',
    dueDateMs: new Date('2027-03-31').getTime(),
    frequency: 'Ongoing — per disposal event',
    status: 'Action Required',
    actionRequired: 'Establish and maintain hazardous waste manifest records for all disposal events.',
    sourceApprovalId: 'CTE-2026-MPCB-41872',
    sourceCondition: 'Special Condition SC2',
    relevantCondition: 'All wastewater manifest records must be maintained for a minimum of 5 years and produced on demand.',
    requiredDocs: [],
    previousSubmission: null,
    verification: 'Not Yet Submitted',
    nextDueDate: null,
    description: 'Hazardous and other waste manifest records maintained per HWM Rules 2016, covering waste categories, quantities, storage, transport, and authorised disposal.',
    whyRequired: 'Mandatory under Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 — Rule 4. Required as a special condition of CTE approval.',
  },
  {
    id: 'CPL-003',
    name: 'Annual Environmental Audit Report',
    dept: 'MPCB',
    category: 'Environmental',
    dueDate: '31 Mar 2027',
    dueDateMs: new Date('2027-03-31').getTime(),
    frequency: 'Annual — by 31 March',
    status: 'Due Soon',
    actionRequired: 'Engage environmental auditor and schedule audit for Q1 2027.',
    sourceApprovalId: 'CTE-2026-MPCB-41872',
    sourceCondition: 'Condition 05',
    relevantCondition: 'Annual environmental audit report to be submitted to MPCB by 31 March each year.',
    requiredDocs: [
      { id: 'DOC-001', name: 'Project Environmental Report / DPR' },
      { id: 'DOC-006', name: 'ETP Design Details' },
    ],
    previousSubmission: null,
    verification: 'Not Yet Submitted',
    nextDueDate: '31 Mar 2028',
    description: 'An annual audit of the unit\'s environmental performance covering effluent quality, stack emissions, hazardous waste management, and compliance with MPCB consent conditions.',
    whyRequired: 'Required under CTE Condition 05. Mandatory for Red Category industries to demonstrate ongoing environmental compliance.',
  },
  {
    id: 'CPL-004',
    name: 'Monthly Stack Monitoring — Quarterly Upload',
    dept: 'MPCB',
    category: 'Environmental',
    dueDate: '31 Dec 2026',
    dueDateMs: new Date('2026-12-31').getTime(),
    frequency: 'Quarterly upload of monthly results',
    status: 'Due Soon',
    actionRequired: 'Conduct monthly stack monitoring and upload Q4 2026 results by 31 Dec 2026.',
    sourceApprovalId: 'CTE-2026-MPCB-41872',
    sourceCondition: 'Condition 03',
    relevantCondition: 'Stack emissions must not exceed prescribed limits. Monthly stack monitoring required; results to be uploaded quarterly.',
    requiredDocs: [],
    previousSubmission: null,
    verification: 'Not Yet Submitted',
    nextDueDate: '31 Mar 2027',
    description: 'Monthly monitoring of stack emissions from all pollution-generating processes. Results compiled and uploaded to MPCB portal quarterly.',
    whyRequired: 'Required under CTE Condition 03 to ensure that air emissions remain within prescribed MPCB / CPCB standards throughout operation.',
  },
  {
    id: 'CPL-005',
    name: 'Fire NOC Renewal',
    dept: 'Fire',
    category: 'Renewals',
    dueDate: '25 Sep 2027',
    dueDateMs: new Date('2027-09-25').getTime(),
    frequency: 'Annual renewal',
    status: 'Compliant',
    actionRequired: null,
    sourceApprovalId: 'APP-2026-FIRE-00093',
    sourceCondition: 'Standard renewal condition',
    relevantCondition: 'Fire NOC valid for one year. Renewal application must be filed at least 30 days before expiry.',
    requiredDocs: [],
    previousSubmission: { date: '26 Sep 2026', ref: 'FIRE-NOC-2026-41100', state: 'Verified' },
    verification: 'Verified',
    nextDueDate: '25 Sep 2027',
    description: 'Annual renewal of the Fire NOC issued by the Fire Department, confirming that fire safety installations and procedures remain compliant.',
    whyRequired: 'Fire NOC is mandatory annually for all industrial units. Failure to renew results in lapse of the NOC and possible factory closure order.',
  },
  {
    id: 'CPL-006',
    name: 'Factory Registration Renewal',
    dept: 'DISH',
    category: 'Renewals',
    dueDate: '22 Dec 2026',
    dueDateMs: new Date('2026-12-22').getTime(),
    frequency: 'Annual renewal',
    status: 'Due Soon',
    actionRequired: 'Submit renewal application before 22 Dec 2026.',
    sourceApprovalId: 'APP-2026-DISH-00241',
    sourceCondition: 'Standard renewal condition',
    relevantCondition: 'Factory registration must be renewed annually. Application must be filed at least 60 days before expiry.',
    requiredDocs: [
      { id: 'DOC-003', name: 'MPCB Consent to Establish Certificate' },
    ],
    previousSubmission: null,
    verification: 'Not Yet Submitted',
    nextDueDate: '22 Dec 2027',
    description: 'Annual renewal of the Factory Registration under the Factories Act 1948. Renewal confirms continued compliance with factory safety and welfare norms.',
    whyRequired: 'Mandatory under the Factories Act, 1948. A factory cannot legally operate without a valid registration. Renewal is required annually.',
  },
]

export function findComplianceById(id: string): ComplianceObligation | undefined {
  return COMPLIANCE_OBLIGATIONS.find(obligation => obligation.id === id);
}

export function findComplianceForBusiness(businessId: string, id: string): ComplianceObligation | undefined {
  if (!findBusinessEntity('compliance', businessId, id)) return undefined;
  return findComplianceById(id);
}

export function listComplianceForBusiness(businessId: string): ComplianceObligation[] {
  return COMPLIANCE_OBLIGATIONS.filter(obligation => Boolean(findBusinessEntity('compliance', businessId, obligation.id)));
}

export function findSourceDecisionForBusiness(businessId: string, complianceId: string): { applicationId: string; decisionId: string } | undefined {
  const obligation = findComplianceForBusiness(businessId, complianceId);
  if (!obligation) return undefined;
  const approval = findBusinessEntity('approval', businessId, obligation.sourceApprovalId);
  if (!approval?.parentId) return undefined;
  const decision = findBusinessEntity('decision', businessId, approval.parentId);
  if (!decision?.parentId || decision.id !== approval.parentId) return undefined;
  const application = findBusinessEntity('application', businessId, decision.parentId);
  if (!application) return undefined;
  return { applicationId: application.id, decisionId: decision.id };
}
