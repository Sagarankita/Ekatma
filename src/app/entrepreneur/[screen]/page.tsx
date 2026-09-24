import { notFound } from 'next/navigation';
import EntrepreneurApp from '@/components/entrepreneur/EntrepreneurApp';
import { isEntrepreneurPage } from '@/lib/entrepreneur-routes';

export default async function EntrepreneurScreen({
  params,
}: {
  params: Promise<{ screen: string }>;
}) {
  const { screen } = await params;
  if (!isEntrepreneurPage(screen) || screen === 'portal') notFound();
  return <EntrepreneurApp initialPage={screen} />;
}
