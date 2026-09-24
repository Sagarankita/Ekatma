import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EKATMA Entrepreneur Portal',
  description: 'Maharashtra industrial approval and compliance portal entrepreneur interface',
};

export default function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
