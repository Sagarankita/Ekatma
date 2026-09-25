import { notFound } from 'next/navigation';
import { ChangeRoute } from '@/features/entrepreneur/changes/ChangeRoute';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireDeepScreenBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function AmendmentsPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = requireDeepScreenBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();
  return <ChangeRoute project={project} screen="amendments" />;
}
