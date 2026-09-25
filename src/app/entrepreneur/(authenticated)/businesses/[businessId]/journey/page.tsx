import { notFound } from 'next/navigation'
import { JourneyScreen } from '@/features/entrepreneur/journey/JourneyScreen'
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog'
import { requireDeepScreenBusinessRouteParam } from '@/features/entrepreneur/identity/route-params'

export default async function BusinessJourneyPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = requireDeepScreenBusinessRouteParam(businessId)
  const project = findBusinessProjectById(business.id)
  if (!project) notFound()
  return <JourneyScreen project={project} />
}
