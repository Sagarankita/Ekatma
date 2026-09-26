const fs = require('fs');
const path = require('path');
const appDir = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives');

fs.mkdirSync(path.join(appDir, 'calculator', 'questionnaire'), { recursive: true });
fs.mkdirSync(path.join(appDir, 'calculator', 'review'), { recursive: true });
fs.mkdirSync(path.join(appDir, 'portfolio', '[schemeId]'), { recursive: true });

const pageI01 = `import React from 'react';
import { IncentiveCentreScreen } from '@/features/entrepreneur/incentives/workspace/components/IncentiveCentreScreen';

export default function Page() {
  return <IncentiveCentreScreen />;
}
`;
fs.writeFileSync(path.join(appDir, 'page.tsx'), pageI01);

const pageI02 = `import React from 'react';
import { CalculatorStartScreen } from '@/features/entrepreneur/incentives/workspace/components/CalculatorStartScreen';

export default function Page() {
  return <CalculatorStartScreen />;
}
`;
fs.writeFileSync(path.join(appDir, 'calculator', 'page.tsx'), pageI02);

const pageI03 = `import React from 'react';
import { CalculatorQuestionnaireScreen } from '@/features/entrepreneur/incentives/workspace/components/CalculatorQuestionnaireScreen';

export default function Page() {
  return <CalculatorQuestionnaireScreen />;
}
`;
fs.writeFileSync(path.join(appDir, 'calculator', 'questionnaire', 'page.tsx'), pageI03);

const pageI04 = `import React from 'react';
import { CalculatorReviewScreen } from '@/features/entrepreneur/incentives/workspace/components/CalculatorReviewScreen';

export default function Page() {
  return <CalculatorReviewScreen />;
}
`;
fs.writeFileSync(path.join(appDir, 'calculator', 'review', 'page.tsx'), pageI04);

const pageI05 = `import React from 'react';
import { IncentivePortfolioScreen } from '@/features/entrepreneur/incentives/workspace/components/IncentivePortfolioScreen';

export default function Page() {
  return <IncentivePortfolioScreen />;
}
`;
fs.writeFileSync(path.join(appDir, 'portfolio', 'page.tsx'), pageI05);

const pageI05A = `import React from 'react';
import { IncentivePortfolioDetailScreen } from '@/features/entrepreneur/incentives/workspace/components/IncentivePortfolioDetailScreen';
import { notFound } from 'next/navigation';
import { getIncentiveDetailSchemes } from '@/features/entrepreneur/incentives/workspace/data';

export default async function Page({ params }: { params: Promise<{ businessId: string, schemeId: string }> }) {
  const resolvedParams = await params;
  const schemes = getIncentiveDetailSchemes(resolvedParams.businessId);
  const scheme = schemes.find(s => s.id === resolvedParams.schemeId);
  if (!scheme) {
    notFound();
  }
  return <IncentivePortfolioDetailScreen schemeId={resolvedParams.schemeId} />;
}
`;
fs.writeFileSync(path.join(appDir, 'portfolio', '[schemeId]', 'page.tsx'), pageI05A);

console.log('done');
