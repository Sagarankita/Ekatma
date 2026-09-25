'use client';
import { useParams } from 'next/navigation';
import { ApplicationChildGuard } from '@/components/application/ApplicationWorkspace';
export default function Layout({ children }: { children: React.ReactNode }) { const params = useParams<{ complianceId: string }>(); return <ApplicationChildGuard kind="compliance" childId={params.complianceId}>{children}</ApplicationChildGuard>; }
