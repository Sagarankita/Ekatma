import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#1a3a5c',
};

export const metadata: Metadata = {
  title: 'EKATMA Department Portal',
  description: 'Government of Maharashtra Single Window Portal - Department Interface',
  manifest: '/department/manifest.json',
  icons: {
    apple: '/department/icons/apple-touch-icon.png',
  },
};

import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';

export default function DepartmentRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceWorkerRegister />
      {children}
    </>
  );
}
