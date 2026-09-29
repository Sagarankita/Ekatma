import { findBusinessEntity } from '../identity/catalog';
import { ENTREPRENEUR_ROUTES } from '../../../lib/routes/entrepreneur';

export type NotificationGroup = 'Action Required' | 'Application Updates' | 'Inspections' | 'Compliance' | 'Regulatory Changes'
export type NotificationType = 'missing-doc' | 'expiry' | 'query' | 'correction' | 'resubmission' | 'approval' | 'rejection' | 'inspection' | 'sla' | 'dependency' | 'renewal' | 'compliance' | 'incentive' | 'claim' | 'reg-change' | 'business-change' | 'grievance'

export interface AppNotification {
  id: string
  type: NotificationType
  group: NotificationGroup
  title: string
  why: string
  action: string
  due: string
  ctaLabel: string
  applicationId?: string
  grievanceId?: string
  businessId: string
  isRead: boolean
  timestamp: string
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'N-001',
    type: 'sla',
    group: 'Action Required',
    title: 'SLA breach: MPCB CTE application overdue by 12 days',
    why: 'Your application APP-MPCB-2026-4892 has exceeded the 30-day SLA. The department has not issued a decision or raised a query.',
    action: 'Raise a grievance to escalate this delay to the MPCB Grievance Cell.',
    due: 'Immediate',
    ctaLabel: 'Raise Grievance',
    applicationId: 'APP-MPCB-2026-4892',
    businessId: 'BP-001',
    isRead: false,
    timestamp: '2 hours ago',
  },
  {
    id: 'N-002',
    type: 'query',
    group: 'Action Required',
    title: 'New query from Inspector of Factories — Factory Registration',
    why: 'DISH has raised a query regarding your boiler capacity certificate. Your response is required to proceed.',
    action: 'Review the query and upload the IBR certificate to unblock your application.',
    due: 'Within 7 working days (by 30 Sep 2026)',
    ctaLabel: 'Respond to Query',
    applicationId: 'APP-FAC-2026-3371',
    businessId: 'BP-001',
    isRead: false,
    timestamp: '1 day ago',
  },
  {
    id: 'N-003',
    type: 'missing-doc',
    group: 'Action Required',
    title: 'Missing document: IBR Certificate required for Factory Registration',
    why: 'The IBR Certificate has been flagged as missing from your document set for APP-FAC-2026-3371.',
    action: 'Upload a valid IBR Certificate (PDF, max 5 MB) to your Document Centre.',
    due: 'Before 30 Sep 2026',
    ctaLabel: 'Upload Document',
    applicationId: 'APP-FAC-2026-3371',
    businessId: 'BP-001',
    isRead: false,
    timestamp: '1 day ago',
  },
  {
    id: 'N-004',
    type: 'inspection',
    group: 'Inspections',
    title: 'Inspection scheduled: DISH Factory — 05 Oct 2026',
    why: 'The Inspector of Factories has confirmed an inspection of your Chakan unit on 05 October 2026, 10:00 AM.',
    action: 'Ensure all statutory registers, safety certificates, and personnel are available on site.',
    due: '05 Oct 2026, 10:00 AM',
    ctaLabel: 'View Inspection',
    applicationId: 'APP-FAC-2026-3371',
    businessId: 'BP-001',
    isRead: false,
    timestamp: '2 days ago',
  },
  {
    id: 'N-005',
    type: 'expiry',
    group: 'Compliance',
    title: 'Renewal due: MPCB Consent to Operate — expires 31 Dec 2026',
    why: 'Your existing MPCB Consent to Operate (CTO) expires in 99 days. Late renewal attracts penalties.',
    action: 'Begin the CTO renewal application now to avoid last-minute delays.',
    due: '31 Dec 2026',
    ctaLabel: 'View Renewal',
    businessId: 'BP-001',
    isRead: true,
    timestamp: '3 days ago',
  },
  {
    id: 'N-006',
    type: 'approval',
    group: 'Application Updates',
    title: 'Approval received: MIDC Plot Lease Agreement',
    why: 'MIDC has approved your plot lease agreement for Plot C-14/2, Chakan Phase II.',
    action: 'Download and retain the digital approval letter. Register the lease deed at the Sub-Registrar office.',
    due: 'No immediate deadline',
    ctaLabel: 'View Application',
    applicationId: 'APP-MIDC-2026-1190',
    businessId: 'BP-001',
    isRead: true,
    timestamp: '5 days ago',
  },
  {
    id: 'N-007',
    type: 'reg-change',
    group: 'Regulatory Changes',
    title: 'Regulatory change: MPCB effluent discharge norms updated (GR dated 15 Sep 2026)',
    why: 'MPCB has revised industrial effluent discharge standards. New ZLD requirements apply to pharmaceutical units with process wastewater > 100 KLD.',
    action: 'Review the regulatory change to confirm your ETP design remains compliant.',
    due: 'Review within 30 days',
    ctaLabel: 'View Regulatory Change',
    businessId: 'BP-004',
    isRead: true,
    timestamp: '8 days ago',
  },
  {
    id: 'N-008',
    type: 'grievance',
    group: 'Application Updates',
    title: 'Grievance resolved: MIDC portal status corrected — GRV-2026-0003',
    why: 'MIDC IT Cell has corrected the portal status discrepancy for APP-MIDC-2026-1190. Your approval is now reflected correctly.',
    action: 'No further action required. Download your corrected digital approval letter if not done yet.',
    due: 'No deadline',
    ctaLabel: 'View Grievance',
    grievanceId: 'GRV-2026-0003',
    businessId: 'BP-001',
    isRead: true,
    timestamp: '13 days ago',
  },
]

export function findNotificationById(id: string): AppNotification | undefined {
  return MOCK_NOTIFICATIONS.find(notification => notification.id === id);
}

export function notificationDestination(notification: AppNotification): string | undefined {
  const businessId = notification.businessId;
  if (notification.grievanceId && findBusinessEntity('grievance', businessId, notification.grievanceId)) {
    return ENTREPRENEUR_ROUTES.grievances(businessId, { grievanceId: notification.grievanceId });
  }
  const appId = notification.applicationId;
  if (notification.id === 'N-001' && appId && findBusinessEntity('application', businessId, appId)) {
    return ENTREPRENEUR_ROUTES.grievances(businessId, { applicationId: appId, raise: true });
  }
  if (notification.type === 'query' && appId && findBusinessEntity('application', businessId, appId)) return ENTREPRENEUR_ROUTES.application(businessId, appId);
  if (notification.type === 'missing-doc') return ENTREPRENEUR_ROUTES.documents(businessId);
  if (notification.type === 'inspection') return ENTREPRENEUR_ROUTES.inspections(businessId);
  if (notification.type === 'expiry' || notification.type === 'renewal' || notification.type === 'compliance') return ENTREPRENEUR_ROUTES.compliance(businessId);
  if (notification.type === 'reg-change') return ENTREPRENEUR_ROUTES.regulatoryChanges(businessId);
  if (notification.type === 'business-change') return ENTREPRENEUR_ROUTES.changes(businessId);
  if (appId && findBusinessEntity('application', businessId, appId)) return ENTREPRENEUR_ROUTES.application(businessId, appId);
  return ENTREPRENEUR_ROUTES.business(businessId);
}
