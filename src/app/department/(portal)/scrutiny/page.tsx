'use client';

import { ScrutinyCommandCentre } from '@/App';
import { useRouter } from 'next/navigation';

export default function ScrutinyPage() {
  const router = useRouter();

  return (
    <ScrutinyCommandCentre 
      onOpenScrutinyApp={(appId, dest) => {
        console.log(`Open scrutiny app ${appId} at dest ${dest}`);
      }} 
    />
  );
}
