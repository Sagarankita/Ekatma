// Existing M13/M21/M26/M27/M28 prototype identities, not generated records.
export const WORKFLOW_RECORDS: Readonly<Record<string, {
  documentId?: string; decisionId?: string; dependencyNodeId?: string;
  complianceId?: string; inspectionId?: string;
}>> = {
  'MIDC-APP-2026-00418': {
    documentId: 'DOC-LAND-00418', decisionId: 'DEC-2026-00418',
    dependencyNodeId: 'midc-bldg', complianceId: 'COND-001', inspectionId: 'INSP-2026-00418',
  },
  'MIDC-APP-2026-00391': { inspectionId: 'INSP-2026-00391' },
  'MIDC-APP-2026-00372': { inspectionId: 'INSP-2026-00372' },
  'MIDC-APP-2026-00411': { inspectionId: 'INSP-2026-00411' },
  'MIDC-APP-2026-00398': { inspectionId: 'INSP-2026-00398' },
  'MIDC-APP-2026-00388': { inspectionId: 'INSP-2026-00388' },
};
