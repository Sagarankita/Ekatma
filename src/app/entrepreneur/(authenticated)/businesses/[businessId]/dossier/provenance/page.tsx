import { notFound } from 'next/navigation'
import { ProvenanceScreen } from '@/features/entrepreneur/dossier/ProvenanceScreen'
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog'
import { requireDeepScreenBusinessRouteParam } from '@/features/entrepreneur/identity/route-params'

export default async function BusinessProvenancePage({
  params,
  searchParams,
}: {
  params: Promise<{ businessId: string }>
  searchParams: Promise<{ field?: string }>
}) {
  const { businessId } = await params
  const { field } = await searchParams
  const business = requireDeepScreenBusinessRouteParam(businessId)
  const project = findBusinessProjectById(business.id)
  if (!project) notFound()
  return <ProvenanceScreen project={project} fieldName={field || 'Plot Area'} />
}
