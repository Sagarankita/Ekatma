'use client';

import { useRouter } from 'next/navigation';
import { useDisplayPreferences } from '../appearance/useDisplayPreferences';
import { E33NotificationCentrePage } from './NotificationScreen';
import { notificationDestination } from './data';

export function NotificationRoute() {
  const router = useRouter();
  const { lang } = useDisplayPreferences();
  return <E33NotificationCentrePage lang={lang} onNavigate={notification => {
    const destination = notificationDestination(notification);
    if (destination) router.push(destination);
  }} />;
}
