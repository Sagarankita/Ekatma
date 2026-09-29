'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { ApplicationWorkspaceProvider } from '@/components/application/ApplicationWorkspace';
import { MonolithContext } from '@/App';
import { getApplicationContext } from '@/data/fixtures/application-contexts';

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ applicationId: string }>();
  const application = getApplicationContext(params.applicationId);
  const legacyApplication = application ? { id: application.id, business: application.business, project: application.project, service: application.service, serviceFamily: application.service, state: application.state, desk: application.desk, applicant: application.applicant, version: application.dnaVersion, queryVersion: application.queryVersion, slaRemaining: application.sla } : {};
  return <Suspense fallback={<div className="p-6 text-sm text-[#4A4A4A]">Loading application context…</div>}><MonolithContext.Provider value={{ APP_SAMPLE: legacyApplication }}><ApplicationWorkspaceProvider applicationId={params.applicationId} showShell={false}>{children}</ApplicationWorkspaceProvider></MonolithContext.Provider></Suspense>;
}
