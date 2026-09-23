import { ROUTES } from './routes';
import { WORKFLOW_RECORDS } from '../data/fixtures/workflow-records';

// Called at the App Router boundary. Missing child fixtures lead to an existing
// application context, never a fabricated child ID or another application's ID.
export function applicationLinks(applicationId: string) {
  const records = WORKFLOW_RECORDS[applicationId] ?? {};
  const routes = ROUTES.department;
  return {
    parameter: (id?: string) => id ? routes.applicationParameter(applicationId, id) : routes.applicationScrutinyWorkbench(applicationId),
    document: (id = records.documentId) => id ? routes.applicationDocument(applicationId, id) : routes.applicationScrutinyWorkbench(applicationId),
    decision: (id = records.decisionId) => id ? routes.decisionRecord(applicationId, id) : routes.applicationDecisionWorkspace(applicationId),
    dependency: (id = records.dependencyNodeId) => id ? routes.dependencyUpdate(applicationId, id) : routes.applicationDependencyView(applicationId),
    compliance: (id = records.complianceId) => id ? routes.compliance(applicationId, id) : routes.applicationDecisionWorkspace(applicationId),
    inspection: (id = records.inspectionId) => id ? routes.inspectionWorkspace(applicationId, id) : routes.applicationInspections(applicationId),
    observations: (id = records.inspectionId) => id ? routes.inspectionObservations(applicationId, id) : routes.applicationInspections(applicationId),
  };
}
