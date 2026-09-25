import { AuthenticatedShell } from '@/features/entrepreneur/shell/AuthenticatedShell';

export default function AuthenticatedEntrepreneurLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}
