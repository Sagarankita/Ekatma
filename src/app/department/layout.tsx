import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#355E3B',
};

export const metadata: Metadata = {
  title: 'EKATMA Department Portal',
  description: 'Government of Maharashtra Single Window Portal - Department Interface',
  manifest: '/department/manifest.json',
  icons: {
    icon: '/assets/ekatma-logo.png',
    shortcut: '/assets/ekatma-logo.png',
    apple: '/assets/ekatma-logo.png',
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
      <div className="department-app">{children}</div>
    </>
  );
}
