import { createBusinessId, type BusinessId } from '../../../domain/ids';

export interface EntrepreneurBusinessIdentity {
  id: BusinessId;
  name: string;
  subtitle: string;
  industry: string;
  location: string;
  provenance?: string;
}

export const SAHYADRI_DEMO_BUSINESS_ID = createBusinessId('BP-004');

export const ENTREPRENEUR_BUSINESSES: readonly EntrepreneurBusinessIdentity[] = [
  {
    id: createBusinessId('BP-001'),
    name: 'ABC Pharma Pvt Ltd',
    subtitle: 'Pharmaceutical Manufacturing Unit',
    industry: 'Pharmaceutical Manufacturing',
    location: 'Thane, Maharashtra',
  },
  {
    id: createBusinessId('BP-002'),
    name: 'Konkan Feeds',
    subtitle: 'Cattle Feed Manufacturing Unit',
    industry: 'Cattle Feed Manufacturing',
    location: 'Ratnagiri, Maharashtra',
  },
  {
    id: createBusinessId('BP-003'),
    name: 'Sahyadri Electronics Pvt Ltd',
    subtitle: 'Electronics Manufacturing Unit',
    industry: 'Electronics Manufacturing',
    location: 'Pune, Maharashtra',
  },
  {
    id: SAHYADRI_DEMO_BUSINESS_ID,
    name: 'Sahyadri Bio-Pharma Pvt Ltd',
    subtitle: 'Internal demo project — Chakan Industrial Area Phase II',
    industry: 'Pharmaceutical Manufacturing',
    location: 'Chakan, Pune, Maharashtra',
    provenance: 'User-authorized internal demo business ID for the in-repo Sahyadri Bio-Pharma prototype fixture. Not a government-issued identifier, PAN, CIN, or backend record.',
  },
] as const;

export interface LegacyBusinessCompatibility {
  legacyId: string;
  canonicalBusinessId: BusinessId | null;
  legacyName: string;
  evidence: string;
}

export const LEGACY_BUSINESS_COMPATIBILITY: readonly LegacyBusinessCompatibility[] = [
  {
    legacyId: 'abc-pharma',
    canonicalBusinessId: createBusinessId('BP-001'),
    legacyName: 'ABC Pharma Pvt Ltd',
    evidence: 'Exact legal name; pharmaceutical manufacturing; Thane location.',
  },
  {
    legacyId: 'konkan-feeds',
    canonicalBusinessId: createBusinessId('BP-002'),
    legacyName: 'Konkan Feeds Ltd',
    evidence: 'Same distinctive business name after legal-suffix normalization; feed/agro manufacturing; Ratnagiri location.',
  },
  {
    legacyId: 'pune-auto',
    canonicalBusinessId: null,
    legacyName: 'Pune Auto Components',
    evidence: 'No BP record has the same business name or industry. Pune alone is insufficient evidence.',
  },
] as const;

export const DEEP_SCREEN_BUSINESS_IDENTITY = {
  name: 'Sahyadri Bio-Pharma Pvt Ltd',
  businessId: SAHYADRI_DEMO_BUSINESS_ID,
  status: 'internal-demo',
  evidence: [
    'The user explicitly authorized a new internal demo business identity for the in-repo Sahyadri Bio-Pharma fixture.',
    'The prefilled create-business fixture names Sahyadri Bio-Pharma Pvt Ltd at Chakan, Pune and sets projectType to new.',
    'BP-004 is an internal prototype identifier, not a PAN, CIN, approval number, or backend/government-issued ID.',
    'BP-001, BP-002, and BP-003 retain their separate original ownership.',
  ],
} as const;

export type EntrepreneurEntityKind =
  | 'requirement'
  | 'document'
  | 'application'
  | 'query'
  | 'resubmission'
  | 'deficiency'
  | 'inspection'
  | 'observation'
  | 'decision'
  | 'approval'
  | 'certificate'
  | 'compliance'
  | 'incentive'
  | 'claim'
  | 'regulatory-change'
  | 'grievance'
  | 'notification';

export interface EntrepreneurEntityIdentity {
  kind: EntrepreneurEntityKind;
  id: string;
  label: string;
  businessId: BusinessId | null;
  parentId?: string;
  sourceContext: 'bp-001-command-centre' | 'internal-demo-sahyadri' | 'user-global';
}

const unresolved = (
  kind: EntrepreneurEntityKind,
  id: string,
  label: string,
  parentId?: string,
): EntrepreneurEntityIdentity => ({
  kind,
  id,
  label,
  businessId: SAHYADRI_DEMO_BUSINESS_ID,
  parentId,
  sourceContext: 'internal-demo-sahyadri',
});

const bp001 = (
  kind: EntrepreneurEntityKind,
  id: string,
  label: string,
  parentId?: string,
): EntrepreneurEntityIdentity => ({
  kind,
  id,
  label,
  businessId: createBusinessId('BP-001'),
  parentId,
  sourceContext: 'bp-001-command-centre',
});

const userGlobal = (
  kind: EntrepreneurEntityKind,
  id: string,
  label: string,
  parentId?: string,
): EntrepreneurEntityIdentity => ({
  kind,
  id,
  label,
  businessId: null,
  parentId,
  sourceContext: 'user-global',
});

export const ENTREPRENEUR_ENTITY_IDENTITIES: readonly EntrepreneurEntityIdentity[] = [
  unresolved('requirement', 'LAND-001', 'MIDC — Land Possession / Allotment'),
  unresolved('requirement', 'EST-001', 'MPCB — Consent to Establish (CTE)'),
  unresolved('requirement', 'CON-001', 'Planning Authority — Building Plan Approval'),
  unresolved('requirement', 'CON-002', 'Fire — Provisional Fire NOC'),
  unresolved('requirement', 'UTIL-001', 'MSEDCL / MIDC — Power Connection (HT)'),
  unresolved('requirement', 'UTIL-002', 'MIDC — Water Connection'),
  unresolved('requirement', 'UTIL-003', 'Competent Authority — Groundwater Permission'),
  unresolved('requirement', 'UTIL-004', 'Local Authority / ULB — Drainage Connection NOC'),
  unresolved('requirement', 'PREOP-001', 'MPCB — Consent to Operate (CTO)'),
  unresolved('requirement', 'PREOP-002', 'DISH — Factory / Occupier Registration'),
  unresolved('requirement', 'PREOP-003', 'Directorate of Boilers — Boiler Registration'),
  unresolved('requirement', 'PREOP-004', 'Fire — Final Fire NOC'),
  unresolved('requirement', 'COMPLY-001', 'MPCB — Compliance Reporting'),

  unresolved('document', 'DOC-001', 'Project Environmental Report / DPR'),
  unresolved('document', 'DOC-002', 'Land Possession / MIDC Lease Agreement'),
  unresolved('document', 'DOC-003', 'MPCB Consent to Establish Certificate'),
  unresolved('document', 'DOC-004', 'Building Layout / Architectural Plan'),
  unresolved('document', 'DOC-005', 'Promoter Identity & KYC Documents'),
  unresolved('document', 'DOC-006', 'ETP Design Details'),
  unresolved('document', 'DOC-007', 'Boiler Technical Specifications'),
  unresolved('document', 'DOC-008', 'Fire Safety Plan'),
  unresolved('document', 'DOC-INC-001', 'Eligibility Certificate'),
  unresolved('document', 'DOC-INC-002', 'Fixed Capital Investment Certificate'),
  unresolved('document', 'DOC-INC-003', 'Employment Certificate'),

  unresolved('application', 'APP-2026-MPCB-00412', 'MPCB — Consent to Establish'),
  unresolved('application', 'APP-2026-MIDC-00187', 'MIDC — Building / Planning Approval'),
  unresolved('application', 'APP-2026-FIRE-00093', 'Fire — Fire NOC'),
  unresolved('application', 'APP-2026-DISH-00241', 'DISH — Factory Registration'),
  bp001('application', 'APP-MPCB-2026-4892', 'MPCB — Consent to Establish (CTE)'),
  bp001('application', 'APP-FAC-2026-3371', 'DISH — Factory / Occupier Registration'),
  bp001('application', 'APP-MIDC-2026-1190', 'MIDC — Plot Lease Agreement'),

  unresolved('query', 'QRY-001', 'MPCB consolidated deficiency memo', 'APP-2026-MPCB-00412'),
  unresolved('query', 'QRY-2026-MIDC-00187', 'MIDC consolidated deficiency memo', 'APP-2026-MIDC-00187'),
  unresolved('resubmission', 'APP-2026-MPCB-00412-R2', 'MPCB CTE resubmission #2', 'APP-2026-MPCB-00412'),
  unresolved('resubmission', 'APP-2026-MIDC-00187-R1', 'MIDC Building / Planning resubmission #1', 'APP-2026-MIDC-00187'),
  unresolved('deficiency', 'DEF-001', 'Water balance mismatch', 'QRY-001'),
  unresolved('deficiency', 'DEF-002', 'ETP capacity mismatch', 'QRY-001'),
  unresolved('deficiency', 'DEF-003', 'Solid/hazardous waste management plan missing', 'QRY-001'),
  unresolved('inspection', 'INS-001', 'Coordinated Site Inspection'),
  unresolved('inspection', 'INS-2026-MIDC-00187', 'MIDC Building / Planning Inspection'),
  unresolved('inspection', 'INS-002', 'MPCB Environmental Inspection'),
  unresolved('inspection', 'INS-003', 'Fire Safety & Industrial Safety Inspection'),
  unresolved('observation', 'OBS-001', 'ETP capacity observation', 'INS-002'),
  unresolved('observation', 'OBS-002', 'Hazardous waste manifest observation', 'INS-002'),
  unresolved('observation', 'OBS-003', 'Fire hydrant pressure and emergency exit clearance', 'INS-003'),
  unresolved('decision', 'DEC-2026-MPCB-00412', 'MPCB CTE approval decision', 'APP-2026-MPCB-00412'),
  unresolved('decision', 'DEC-2026-MIDC-00187', 'MIDC Building / Planning approval decision', 'APP-2026-MIDC-00187'),
  unresolved('approval', 'CTE-2026-MPCB-41872', 'MPCB Consent to Establish approval', 'DEC-2026-MPCB-00412'),
  unresolved('approval', 'MIDC/BP/2026/00187', 'MIDC Building / Planning approval', 'DEC-2026-MIDC-00187'),
  unresolved('certificate', 'CERT-CTE-2026-41872', 'MPCB Consent to Establish certificate', 'DEC-2026-MPCB-00412'),
  unresolved('certificate', 'CERT-MIDC-2026-00187', 'MIDC Building / Planning certificate', 'DEC-2026-MIDC-00187'),

  unresolved('compliance', 'CPL-001', 'ETP Commissioning Report'),
  unresolved('compliance', 'CPL-002', 'Hazardous Waste Manifest Records'),
  unresolved('compliance', 'CPL-003', 'Annual Environmental Audit Report'),
  unresolved('compliance', 'CPL-004', 'Monthly Stack Monitoring — Quarterly Upload'),
  unresolved('compliance', 'CPL-005', 'Fire NOC Renewal'),
  unresolved('compliance', 'CPL-006', 'Factory Registration Renewal'),
  unresolved('incentive', 'PSI-2019', 'Package Scheme of Incentives 2019'),
  unresolved('incentive', 'MSME-CLSS', 'MSME Credit Linked Capital Subsidy Scheme'),
  unresolved('incentive', 'MAITRI-FAST', 'MAITRI — Single Window Facilitation'),
  unresolved('incentive', 'PLI-PHARMA', 'Production Linked Incentive Scheme — Pharmaceuticals'),
  unresolved('claim', 'CLM-2027-001', 'PSI capital subsidy claim', 'PSI-2019'),
  unresolved('claim', 'CLM-2027-002', 'Electricity duty exemption claim', 'PSI-2019'),
  unresolved('claim', 'CLM-2026-001', 'PSI electricity duty exemption claim', 'PSI-2019'),
  unresolved('regulatory-change', 'RC-2026-001', 'MPCB effluent discharge norms update'),
  unresolved('regulatory-change', 'RC-2026-002', 'DISH hazardous chemicals compliance update'),
  unresolved('regulatory-change', 'RC-2026-003', 'PSI 2019 eligibility update'),
  unresolved('regulatory-change', 'RC-2026-004', 'Industrial policy update'),
  bp001('grievance', 'GRV-2026-0014', 'MPCB SLA breach grievance', 'APP-MPCB-2026-4892'),
  bp001('grievance', 'GRV-2026-0009', 'DISH unresolved query grievance', 'APP-FAC-2026-3371'),
  bp001('grievance', 'GRV-2026-0003', 'MIDC incorrect status grievance', 'APP-MIDC-2026-1190'),
  userGlobal('notification', 'N-001', 'MPCB CTE SLA breach', 'APP-MPCB-2026-4892'),
  userGlobal('notification', 'N-002', 'DISH Factory Registration query', 'APP-FAC-2026-3371'),
  userGlobal('notification', 'N-003', 'Missing IBR Certificate', 'APP-FAC-2026-3371'),
  userGlobal('notification', 'N-004', 'DISH Factory inspection scheduled', 'APP-FAC-2026-3371'),
  userGlobal('notification', 'N-005', 'MPCB Consent to Operate renewal due'),
  userGlobal('notification', 'N-006', 'MIDC Plot Lease Agreement approved', 'APP-MIDC-2026-1190'),
  userGlobal('notification', 'N-007', 'MPCB effluent discharge norms updated'),
  userGlobal('notification', 'N-008', 'MIDC grievance resolved'),
] as const;

export type ApplicationChildKind = Extract<EntrepreneurEntityKind, 'query' | 'resubmission' | 'decision'>;

export function findBusinessById(value: string): EntrepreneurBusinessIdentity | undefined {
  return ENTREPRENEUR_BUSINESSES.find(business => business.id === value);
}

export function resolveLegacyBusinessId(legacyId: string): BusinessId | undefined {
  return LEGACY_BUSINESS_COMPATIBILITY.find(entry => entry.legacyId === legacyId)?.canonicalBusinessId ?? undefined;
}

export function findEntityIdentity(
  kind: EntrepreneurEntityKind,
  id: string,
): EntrepreneurEntityIdentity | undefined {
  return ENTREPRENEUR_ENTITY_IDENTITIES.find(entity => entity.kind === kind && entity.id === id);
}

export function findBusinessEntity(
  kind: EntrepreneurEntityKind,
  businessId: string,
  id: string,
): EntrepreneurEntityIdentity | undefined {
  return ENTREPRENEUR_ENTITY_IDENTITIES.find(
    entity => entity.kind === kind && entity.id === id && entity.businessId === businessId,
  );
}

export function findApplicationChild(
  kind: ApplicationChildKind,
  businessId: BusinessId | null,
  applicationId: string,
  childId: string,
): EntrepreneurEntityIdentity | undefined {
  const application = findEntityIdentity('application', applicationId);
  if (!application || application.businessId !== businessId) return undefined;

  const child = findEntityIdentity(kind, childId);
  if (!child || child.businessId !== businessId || child.parentId !== applicationId) return undefined;
  return child;
}
