import { BusinessDnaProvider } from '@/features/entrepreneur/business-dna/state';

export default function NewBusinessLayout({ children }: { children: React.ReactNode }) {
  return <BusinessDnaProvider>{children}</BusinessDnaProvider>;
}
