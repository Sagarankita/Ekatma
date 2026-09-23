'use client';

import { useState } from 'react';
import DepartmentShell from '@/components/layout/DepartmentShell';
import { DeptContextBar, DeptSidebar, M39NotificationDrawer } from '@/App';
import { usePathname, useRouter } from 'next/navigation';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);

  const activeSideItem = 
    pathname === '/department' ? 'dept-home' :
    pathname === '/department/queue' ? 'dept-queue' :
    pathname === '/department/search' ? 'dept-apps' :
    pathname === '/department/services' ? 'dept-catalogue' :
    pathname === '/department/scrutiny' ? 'dept-scrutiny' :
    pathname === '/department/inspections' ? 'dept-inspect' :
    pathname === '/department/inspection-queue' ? 'dept-insp-queue' :
    pathname === '/department/queries' ? 'dept-queries' :
    pathname === '/department/decisions' ? 'dept-decisions' :
    pathname === '/department/sla' ? 'dept-sla' :
    pathname === '/department/grievances' ? 'dept-grievances' :
    pathname === '/department/regasst' ? 'dept-regasst' :
    pathname === '/department/regchng' ? 'dept-regchng' :
    pathname === '/department/regchng/impact' ? 'dept-regimpact' :
    pathname === '/department/analytics' ? 'dept-analytics' :
    pathname === '/department/bottleneck' ? 'dept-bottleneck' :
    pathname === '/department/workload' ? 'dept-workload' :
    pathname === '/department/audit' ? 'dept-audit' :
    'dept-home';

  const handleNavigate = (id: string) => {
    switch (id) {
      case 'dept-home': router.push('/department'); break;
      case 'dept-queue': router.push('/department/queue'); break;
      case 'dept-apps': router.push('/department/search'); break;
      case 'dept-catalogue': router.push('/department/services'); break;
      case 'dept-scrutiny': router.push('/department/scrutiny'); break;
      case 'dept-inspect': router.push('/department/inspections'); break;
      case 'dept-insp-queue': router.push('/department/inspection-queue'); break;
      case 'dept-queries': router.push('/department/queries'); break;
      case 'dept-decisions': router.push('/department/decisions'); break;
      case 'dept-sla': router.push('/department/sla'); break;
      case 'dept-grievances': router.push('/department/grievances'); break;
      case 'dept-regasst': router.push('/department/regasst'); break;
      case 'dept-regchng': router.push('/department/regchng'); break;
      case 'dept-regimpact': router.push('/department/regchng/impact'); break;
      case 'dept-analytics': router.push('/department/analytics'); break;
      case 'dept-bottleneck': router.push('/department/bottleneck'); break;
      case 'dept-workload': router.push('/department/workload'); break;
      case 'dept-audit': router.push('/department/audit'); break;
      default: console.log('Unimplemented route', id);
    }
  };

  return (
    <DepartmentShell requireAuth={true}>
      <DeptContextBar onLogout={() => { localStorage.removeItem('dept_auth'); window.location.href = '/department/login'; }} onNotif={() => setNotifOpen(true)} />
      <div className="flex-1 flex overflow-hidden max-w-[1440px] w-full mx-auto">
        <DeptSidebar active={activeSideItem} setActive={handleNavigate} />
        <div className="flex-1 overflow-auto bg-white border-l border-[#d1d9e0]">
          {children}
        </div>
      </div>
      <M39NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} onNavigate={(link) => console.log('Navigate to:', link)} />
    </DepartmentShell>
  );
}
