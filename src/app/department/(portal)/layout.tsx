'use client';

import { useState } from 'react';
import DepartmentShell from '@/components/layout/DepartmentShell';
import { DeptContextBar, DeptSidebar, M39NotificationDrawer } from '@/App';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES, DEPARTMENT_DESTINATIONS, departmentActiveItem, departmentNotificationRoute } from '@/lib/routes';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);

  const handleNavigate = (id: string) => {
    const route = DEPARTMENT_DESTINATIONS[id];
    if (route) router.push(route);
  };

  return (
    <DepartmentShell requireAuth={true}>
      <DeptContextBar
        onLogout={() => { localStorage.removeItem('dept_auth'); router.replace(ROUTES.department.login); }}
        onNotif={() => setNotifOpen(true)}
        onRegAssistant={() => router.push(ROUTES.department.regAssistant)}
        onSearch={query => router.push(ROUTES.department.searchQuery(query))}
      />
      <div className="flex-1 flex overflow-hidden max-w-[1440px] w-full mx-auto">
        <DeptSidebar active={departmentActiveItem(pathname)} setActive={handleNavigate} />
        <div className="flex-1 overflow-auto bg-white border-l border-[#d1d9e0]">
          {children}
        </div>
      </div>
      <M39NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} onNavigate={(link, applicationId) => {
        router.push(departmentNotificationRoute(link, applicationId));
        setNotifOpen(false);
      }} />
    </DepartmentShell>
  );
}
