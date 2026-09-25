'use client';
import { useParams } from 'next/navigation';
import { ApplicationChildGuard } from '@/components/application/ApplicationWorkspace';
export default function Layout({ children }: { children: React.ReactNode }) { const params = useParams<{ inspectionId: string }>(); return <ApplicationChildGuard kind="inspection" childId={params.inspectionId}>{children}</ApplicationChildGuard>; }
