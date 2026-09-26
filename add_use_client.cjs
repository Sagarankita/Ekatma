const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const files = [
  'CalculatorQuestionnaireScreen.tsx',
  'CalculatorReviewScreen.tsx',
  'CalculatorStartScreen.tsx',
  'IncentiveCentreScreen.tsx',
  'IncentivePortfolioDetailScreen.tsx',
  'IncentivePortfolioScreen.tsx'
];

files.forEach(f => {
  const p = path.join(componentsDir, f);
  let content = fs.readFileSync(p, 'utf8');
  if (!content.includes('"use client"')) {
    fs.writeFileSync(p, '"use client";\n' + content);
  }
});
