'use client';

import React, { useState } from 'react';
import DepartmentShell from '@/components/layout/DepartmentShell';
import { DeptContextBar, DeptSidebar, M39NotificationDrawer } from '@/App';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES, DEPARTMENT_DESTINATIONS, departmentActiveItem, departmentNotificationRoute } from '@/lib/routes';
import { RegulatoryAssistantProvider, useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { departmentPageContext, enrichAssistantContext, globalAssistantContext } from '@/features/regulatory-assistant/context';
import { GlobalAssistantSurface } from '@/features/regulatory-assistant/GlobalAssistant';
import type { AssistantContext } from '@/features/regulatory-assistant/types';
import { applicationStateLabel, getApplicationContext } from '@/data/fixtures/application-contexts';
import { SahyadriDemoControls } from '@/features/demo/SahyadriDemoControls';

const initialContext: AssistantContext = {
  portal: 'department', userRole: 'Scrutiny Officer', route: '/department', pageType: 'dashboard',
  pageTitle: 'Department Dashboard', label: 'Department Dashboard', mode: 'page', origin: 'circular', entities: {},
};

function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const { openAssistant } = useRegulatoryAssistant();
  const assistantPageContext = React.useMemo(() => {
    const context = departmentPageContext(pathname);
    const application = context.entities.applicationId ? getApplicationContext(context.entities.applicationId) : undefined;
    return application ? enrichAssistantContext(context, {
      businessName: application.business,
      applicationService: application.service,
      applicationStatus: applicationStateLabel(application.state),
      recordTitle: context.pageType === 'application-detail' ? application.service : undefined,
    }) : context;
  }, [pathname]);

  const handleNavigate = (id: string) => {
    const route = DEPARTMENT_DESTINATIONS[id];
    if (route) router.push(route);
  };

  return (
    <DepartmentShell requireAuth={true}>
      <DeptContextBar
        onLogout={() => { localStorage.removeItem('dept_auth'); router.replace(ROUTES.department.login); }}
        onNotif={() => setNotifOpen(true)}
        onRegAssistant={() => openAssistant({ origin: 'header', mode: 'global', context: globalAssistantContext(assistantPageContext) })}
        onSearch={query => router.push(ROUTES.department.searchQuery(query))}
      />
      <div className="flex-1 flex overflow-hidden max-w-[1440px] w-full mx-auto">
        <DeptSidebar active={departmentActiveItem(pathname)} setActive={handleNavigate} />
        <div className="flex-1 overflow-auto bg-white border-l border-[#d6dfd5]">
          {children}
        </div>
      </div>
      <M39NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} onNavigate={(link, applicationId) => {
        router.push(departmentNotificationRoute(link, applicationId));
        setNotifOpen(false);
      }} />
      <GlobalAssistantSurface pageContext={assistantPageContext} suppressed={notifOpen || pathname.includes('/inspections/') || pathname.includes('/scrutiny-workflow')} />
      <SahyadriDemoControls surface="department" />
    </DepartmentShell>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <RegulatoryAssistantProvider initialContext={initialContext}><PortalShell>{children}</PortalShell></RegulatoryAssistantProvider>;
}
