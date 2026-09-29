export type WorkflowChildRecords = {
  documentId?: string;
  decisionId?: string;
  dependencyNodeId?: string;
  complianceId?: string;
  inspectionId?: string;
};

// Existing M13/M21/M26/M27/M28 prototype identities, not generated records.
export const WORKFLOW_RECORDS: Readonly<Record<string, WorkflowChildRecords>> = {
  'APP-2026-MIDC-00187': {
    documentId: 'BUILDING-PLAN-V2-00187',
    decisionId: 'DEC-2026-MIDC-00187',
    dependencyNodeId: 'midc-bldg',
    complianceId: 'COND-MIDC-00187',
    inspectionId: 'INS-2026-MIDC-00187',
  },
  'MIDC-APP-2026-00418': {
    documentId: 'DOC-LAND-00418',
    decisionId: 'DEC-2026-00418',
    dependencyNodeId: 'midc-bldg',
    complianceId: 'COND-001',
    inspectionId: 'INSP-2026-00418',
  },
  'MIDC-APP-2026-00391': { inspectionId: 'INSP-2026-00391' },
  'MIDC-APP-2026-00372': { inspectionId: 'INSP-2026-00372' },
  'MIDC-APP-2026-00411': { inspectionId: 'INSP-2026-00411' },
  'MIDC-APP-2026-00398': { inspectionId: 'INSP-2026-00398' },
  'MIDC-APP-2026-00388': { inspectionId: 'INSP-2026-00388' },
};

export function getWorkflowRecord(applicationId: string): Required<WorkflowChildRecords> {
  const existing = WORKFLOW_RECORDS[applicationId];
  const token = applicationId.replace(/[^A-Z0-9]/gi, '');
  return {
    documentId: existing?.documentId ?? `DOC-${token}`,
    decisionId: existing?.decisionId ?? `DEC-${token}`,
    dependencyNodeId: existing?.dependencyNodeId ?? 'midc-bldg',
    complianceId: existing?.complianceId ?? 'COND-001',
    inspectionId: existing?.inspectionId ?? `INSP-${token}`,
  };
}
