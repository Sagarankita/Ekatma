'use client';
import { ScrutinyCommandCentre } from '@/App';
import { useRouter } from 'next/navigation';
import { departmentScrutinyRoute } from '@/lib/routes';
export default function ScrutinyPage() { const router = useRouter(); return <ScrutinyCommandCentre onOpenScrutinyApp={(appId, dest) => router.push(departmentScrutinyRoute(appId, dest))} />; }
