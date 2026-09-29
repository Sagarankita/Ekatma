import { notFound } from 'next/navigation'
import { KnowYourApprovalsScreen } from '@/features/entrepreneur/approvals/KnowYourApprovalsScreen'
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog'
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params'

export default async function BusinessApprovalsPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const business = requireBusinessRouteParam(businessId)
  const project = findBusinessProjectById(business.id)
  if (!project) notFound()
  return <KnowYourApprovalsScreen project={project} />
}
