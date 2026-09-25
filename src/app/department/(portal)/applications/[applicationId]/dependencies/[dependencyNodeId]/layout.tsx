'use client';
import { useParams } from 'next/navigation';
import { ApplicationChildGuard } from '@/components/application/ApplicationWorkspace';
export default function Layout({ children }: { children: React.ReactNode }) { const params = useParams<{ dependencyNodeId: string }>(); return <ApplicationChildGuard kind="dependency" childId={params.dependencyNodeId}>{children}</ApplicationChildGuard>; }
