'use client';
import { useParams } from 'next/navigation';
import { ApplicationChildGuard } from '@/components/application/ApplicationWorkspace';
export default function Layout({ children }: { children: React.ReactNode }) { const params = useParams<{ documentId: string }>(); return <ApplicationChildGuard kind="document" childId={params.documentId}>{children}</ApplicationChildGuard>; }
