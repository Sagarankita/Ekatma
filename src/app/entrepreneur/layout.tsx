import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EKATMA Entrepreneur Portal',
  description: 'Maharashtra industrial approval and compliance portal entrepreneur interface',
  icons: {
    icon: '/assets/ekatma-logo.png',
    shortcut: '/assets/ekatma-logo.png',
    apple: '/assets/ekatma-logo.png',
  },
};

export default function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
