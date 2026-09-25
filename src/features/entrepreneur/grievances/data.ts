import { findBusinessEntity } from '../identity/catalog';

export type GrievanceStatus = 'Raised' | 'Assigned' | 'Escalated' | 'Response' | 'Resolved' | 'Reopened'
export type GrievanceReason = 'SLA breach' | 'Unresolved query' | 'Department delay' | 'Incorrect status' | 'Inspection delay' | 'Other'

export interface Grievance {
  id: string
  reason: GrievanceReason
  description: string
  status: GrievanceStatus
  applicationId: string
  department: string
  service: string
  currentDesk: string
  submissionDate: string
  sla: string
  raisedDate: string
  assignedTo: string
  responses: Array<{ author: string; role: string; date: string; text: string }>
  escalationHistory: Array<{ date: string; from: string; to: string; reason: string }>
  resolution?: string
}

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: 'GRV-2026-0014',
    reason: 'SLA breach',
    description: 'Application has been pending at MPCB desk for 42 days against SLA of 30 days. No communication received from department.',
    status: 'Escalated',
    applicationId: 'APP-MPCB-2026-4892',
    department: 'MPCB — Maharashtra Pollution Control Board',
    service: 'Consent to Establish (CTE)',
    currentDesk: 'Technical Review — Environment Officer',
    submissionDate: '18 Jul 2026',
    sla: '30 working days',
    raisedDate: '02 Sep 2026',
    assignedTo: 'Grievance Cell, MPCB Regional Office',
    responses: [
      { author: 'Grievance Cell', role: 'MPCB', date: '04 Sep 2026', text: 'Grievance acknowledged. File has been located and is being reviewed by the Senior Environment Officer. Response expected within 7 working days.' },
    ],
    escalationHistory: [
      { date: '04 Sep 2026', from: 'Environment Officer', to: 'Senior Environment Officer', reason: 'SLA breach > 30 days' },
      { date: '10 Sep 2026', from: 'Senior Environment Officer', to: 'Grievance Cell, RO', reason: 'No response in 7 working days' },
    ],
  },
  {
    id: 'GRV-2026-0009',
    reason: 'Unresolved query',
    description: 'Query raised by Inspector of Factories regarding boiler capacity has been outstanding for 18 days. Applicant responded within 3 days but no acknowledgement received.',
    status: 'Response',
    applicationId: 'APP-FAC-2026-3371',
    department: 'Directorate of Industrial Safety & Health',
    service: 'Factory Registration',
    currentDesk: 'Inspector of Factories — Pune Circle',
    submissionDate: '12 Jun 2026',
    sla: '21 working days',
    raisedDate: '20 Aug 2026',
    assignedTo: 'Dy. Chief Inspector of Factories',
    responses: [
      { author: 'Dy. Chief Inspector', role: 'DISH', date: '22 Aug 2026', text: 'Query response has been reviewed. Additional clarification sought regarding boiler pressure rating. Applicant to upload IBR certificate.' },
    ],
    escalationHistory: [],
    resolution: undefined,
  },
  {
    id: 'GRV-2026-0003',
    reason: 'Incorrect status',
    description: 'Application status shows "Rejected" on portal but approval letter was physically received from department on 05 Aug 2026. Status not updated.',
    status: 'Resolved',
    applicationId: 'APP-MIDC-2026-1190',
    department: 'MIDC — Maharashtra Industrial Development Corporation',
    service: 'MIDC Plot Lease Agreement',
    currentDesk: 'N/A — Resolved',
    submissionDate: '14 Apr 2026',
    sla: '45 working days',
    raisedDate: '10 Aug 2026',
    assignedTo: 'MIDC IT Cell — Portal Support',
    responses: [
      { author: 'MIDC IT Cell', role: 'MIDC', date: '12 Aug 2026', text: 'Status discrepancy confirmed. Portal record has been updated to reflect the approval. Applicant may now download digital approval letter.' },
    ],
    escalationHistory: [],
    resolution: 'Portal status corrected. Digital approval letter now available for download. Closed 12 Aug 2026.',
  },
]

export function listGrievancesForBusiness(businessId: string): Grievance[] {
  return MOCK_GRIEVANCES.filter(grievance => Boolean(findBusinessEntity('grievance', businessId, grievance.id)) && Boolean(findBusinessEntity('application', businessId, grievance.applicationId)));
}

export function findGrievanceForBusiness(businessId: string, id: string): Grievance | undefined {
  return listGrievancesForBusiness(businessId).find(grievance => grievance.id === id);
}
