import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

export default function BusinessNotFound() {
  return <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-[#355E3B]">Business not found</h1>
      <p className="text-sm text-[#555C56] mt-2">This business is not in your portfolio.</p>
      <Link href={ENTREPRENEUR_ROUTES.businesses()} className="inline-block mt-5 text-sm font-medium text-[#6DAE7C] hover:underline">View My Businesses</Link>
    </div>
  </main>;
}
