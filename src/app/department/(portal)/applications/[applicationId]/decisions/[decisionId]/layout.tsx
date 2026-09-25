'use client';
import { useParams } from 'next/navigation';
import { ApplicationChildGuard } from '@/components/application/ApplicationWorkspace';
export default function Layout({ children }: { children: React.ReactNode }) { const params = useParams<{ decisionId: string }>(); return <ApplicationChildGuard kind="decision" childId={params.decisionId}>{children}</ApplicationChildGuard>; }
