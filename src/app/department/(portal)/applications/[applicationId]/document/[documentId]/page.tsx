'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { DocumentOcrInsightsPage } from '@/components/department/DocumentOcrInsightsPage';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const appId = (params.applicationId as string) || 'APP-2026-00418';
  const docId = (params.documentId as string) || 'MIDC-REG-DEED-2024-C14';

  return (
    <DocumentOcrInsightsPage
      applicationId={appId}
      documentId={docId}
      onBackToWorkflow={() => router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=${searchParams.get('stage') || 'precheck'}`)}
      onForwardToQuery={(_queries) => router.push(ROUTES.department.applicationQueryBuilder(appId))}
    />
  );
}
