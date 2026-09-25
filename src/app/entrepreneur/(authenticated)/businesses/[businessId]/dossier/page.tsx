import { notFound } from 'next/navigation'
import { DossierScreen } from '@/features/entrepreneur/dossier/DossierScreen'
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog'
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params'

export default async function BusinessDossierPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = requireBusinessRouteParam(businessId)
  const project = findBusinessProjectById(business.id)
  if (!project) notFound()
  return <DossierScreen project={project} />
}
