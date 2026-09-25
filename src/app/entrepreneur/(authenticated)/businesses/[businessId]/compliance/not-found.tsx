import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

export default function ComplianceNotFound() {
  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#1a3a5c]">Compliance obligation not found</h1>
        <p className="text-sm text-[#6b7a8d] mt-2">The requested compliance obligation was not found for this business.</p>
        <Link
          href={ENTREPRENEUR_ROUTES.businesses()}
          className="inline-block mt-5 text-sm font-medium text-[#1a56db] hover:underline"
        >
          View My Businesses
        </Link>
      </div>
    </main>
  );
}
