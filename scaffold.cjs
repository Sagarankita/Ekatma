const fs = require('fs');
const path = require('path');
const base = 'src/app/entrepreneur/(authenticated)/businesses/[businessId]/incentives';
const dirs = [
    'centre',
    'calculator',
    'calculator/questionnaire',
    'calculator/review',
    'portfolio',
    'portfolio/[incentiveId]',
    'claim-readiness',
    'claims',
    'claims/[claimId]',
    'roi',
    'roi/results',
    'scenarios',
    'policy-updates'
];

dirs.forEach(dir => {
    const fullPath = path.join(base, dir);
    fs.mkdirSync(fullPath, { recursive: true });
    fs.writeFileSync(path.join(fullPath, 'page.tsx'), 'export default function Page() { return <div>Scaffold for ' + dir + '</div>; }');
});
console.log('Done');
