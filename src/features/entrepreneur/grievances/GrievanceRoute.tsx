'use client';

import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useDisplayPreferences } from '../appearance/useDisplayPreferences';
import { E32GrievancesPage } from './GrievanceScreen';

export function GrievanceRoute({
  businessId,
  initialGrievanceId,
  initialApplicationId,
  initialRaise,
}: {
  businessId: string;
  initialGrievanceId?: string;
  initialApplicationId?: string;
  initialRaise?: boolean;
}) {
  const router = useRouter();
  const { lang } = useDisplayPreferences();
  return (
    <E32GrievancesPage
      businessId={businessId}
      lang={lang}
      initialGrievanceId={initialGrievanceId}
      initialApplicationId={initialApplicationId}
      initialRaise={initialRaise}
      onBack={() => router.push(ENTREPRENEUR_ROUTES.business(businessId))}
    />
  );
}
