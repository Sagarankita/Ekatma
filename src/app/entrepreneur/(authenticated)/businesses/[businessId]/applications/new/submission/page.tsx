import { notFound } from 'next/navigation';
import { SubmissionScreen } from '@/features/entrepreneur/applications/SubmissionScreen';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function BusinessApplicationSubmissionPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const project = findBusinessProjectById(business.id);
  if (!project) notFound();

  return <SubmissionScreen project={project} />;
}
