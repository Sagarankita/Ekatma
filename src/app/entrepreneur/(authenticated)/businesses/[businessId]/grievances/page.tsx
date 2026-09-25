import { GrievanceRoute } from '@/features/entrepreneur/grievances/GrievanceRoute';
import { requireBusinessRouteParam } from '@/features/entrepreneur/identity/route-params';

export default async function GrievancesPage({
  params,
  searchParams,
}: {
  params: Promise<{ businessId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { businessId } = await params;
  const business = requireBusinessRouteParam(businessId);
  const sp = searchParams ? await searchParams : {};
  const grievanceId = typeof sp.grievanceId === 'string' ? sp.grievanceId : undefined;
  const applicationId = typeof sp.applicationId === 'string' ? sp.applicationId : undefined;
  const raise = sp.raise === '1' || sp.raise === 'true';

  return (
    <GrievanceRoute
      businessId={business.id}
      initialGrievanceId={grievanceId}
      initialApplicationId={applicationId}
      initialRaise={raise}
    />
  );
}
