const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const code = `import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';

export function ClaimReadinessScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToTracker = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaims(businessId)); // E28 overview or specific claim
  const handleGoToDocCentre = () => router.push(ENTREPRENEUR_ROUTES.documentRepository(businessId));

  const evidence = [
    { label: 'Business Registration (Certificate of Incorporation / MSME)', status: 'available', source: 'Document Repository' },
    { label: 'PAN / Tax Registration', status: 'verified', source: 'System Verified' },
    { label: 'Land Document / Lease Agreement (MIDC)', status: 'verified', source: 'Document Repository — Verified' },
    { label: 'MIDC Allotment Letter', status: 'available', source: 'Document Repository' },
    { label: 'Project Report / Investment Details', status: 'available', source: 'Document Repository' },
    { label: 'Bank Sanction Letter (Term Loan)', status: 'missing', source: 'Not uploaded' },
    { label: 'Machinery Purchase Invoices', status: 'missing', source: 'Not uploaded' },
    { label: 'Commercial Production Certificate', status: 'pending', source: 'Not yet available — unit not yet operational' },
    { label: 'Electricity Connection Certificate', status: 'pending', source: 'Pending MSEDCL connection' },
  ];

  const available = evidence.filter(e => e.status === 'available' || e.status === 'verified').length;
  const total = evidence.length;

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Claim Readiness"
        subtitle="Review the evidence required to prepare your incentive claim."
        breadcrumb={['Home', businessId, 'Incentives', 'Claim Readiness']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[800px] mx-auto px-6 py-5 space-y-4">
        {/* Summary */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-1">Claim Readiness — PSI 2019 Capital Subsidy</p>
              <p className="text-2xl font-bold text-[#1a3a5c]">{available} of {total} evidence categories available</p>
              <p className="text-xs text-[#6b7a8d] mt-1">{total - available} categories missing or pending</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleGoToDocCentre} className="text-xs border border-[#1a56db] text-[#1a56db] px-3 py-2 hover:bg-[#ebf3ff] transition-colors font-medium">Upload Missing Evidence</button>
              <button onClick={handleGoToTracker} className="bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-2 hover:bg-[#0f2540] transition-colors">Prepare Claim</button>
            </div>
          </div>
        </div>

        {/* Evidence list */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Required Evidence</p>
          </div>
          <div className="divide-y divide-[#f8f9fb]">
            {evidence.map(e => {
              const cfg = e.status === 'verified'
                ? { icon: '✓', cls: 'text-[#16a34a]', badge: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]', badgeLabel: 'Verified' }
                : e.status === 'available'
                  ? { icon: '✓', cls: 'text-[#16a34a]', badge: 'bg-[#f0f4f8] text-[#475569] border-[#d1d9e0]', badgeLabel: 'Available' }
                  : e.status === 'pending'
                    ? { icon: '○', cls: 'text-[#d97706]', badge: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]', badgeLabel: 'Pending' }
                    : { icon: '○', cls: 'text-[#9aa5b4]', badge: 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]', badgeLabel: 'Missing' };
              return (
                <div key={e.label} className="px-5 py-3 flex items-start gap-3">
                  <span className={\`font-bold shrink-0 mt-0.5 \${cfg.cls}\`}>{cfg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#1a2533] leading-tight">{e.label}</p>
                    <p className="text-[10px] text-[#6b7a8d] mt-0.5">{e.source}</p>
                  </div>
                  <span className={\`text-[10px] font-bold px-2 py-0.5 border shrink-0 \${cfg.badge}\`}>{cfg.badgeLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(componentsDir, 'ClaimReadinessScreen.tsx'), code);
console.log('done');
