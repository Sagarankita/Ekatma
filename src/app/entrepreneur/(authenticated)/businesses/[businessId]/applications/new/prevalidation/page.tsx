import { notFound } from 'next/navigation';
import { PrevalidationScreen } from '@/features/entrepreneur/applications/PrevalidationScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireDeepScreenBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessPrevalidationPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireDeepScreenBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <PrevalidationScreen project={project} />;
}
