const fs = require('fs');
const path = require('path');
const base = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives');

const pROI = path.join(base, 'roi', 'page.tsx');
const codeROI = `import React from 'react';
import { ROIPlannerScreen } from '@/features/entrepreneur/incentives/workspace/components/ROIPlannerScreen';

export default function Page() {
  return <ROIPlannerScreen />;
}
`;
fs.writeFileSync(pROI, codeROI);

const pROIResults = path.join(base, 'roi', 'results', 'page.tsx');
const codeROIResults = `import React from 'react';
import { ROIResultsScreen } from '@/features/entrepreneur/incentives/workspace/components/ROIResultsScreen';

export default function Page() {
  return <ROIResultsScreen />;
}
`;
fs.writeFileSync(pROIResults, codeROIResults);

const pScenarios = path.join(base, 'scenarios', 'page.tsx');
const codeScenarios = `import React from 'react';
import { ScenariosScreen } from '@/features/entrepreneur/incentives/workspace/components/ScenariosScreen';

export default function Page() {
  return <ScenariosScreen />;
}
`;
fs.writeFileSync(pScenarios, codeScenarios);

const pPolicyUpdates = path.join(base, 'policy-updates', 'page.tsx');
const codePolicyUpdates = `import React from 'react';
import { PolicyUpdatesScreen } from '@/features/entrepreneur/incentives/workspace/components/PolicyUpdatesScreen';

export default function Page() {
  return <PolicyUpdatesScreen />;
}
`;
fs.writeFileSync(pPolicyUpdates, codePolicyUpdates);

console.log('done');
