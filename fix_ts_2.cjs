const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const replaceInFile = (file, src, dst) => {
  const p = path.join(componentsDir, file);
  let code = fs.readFileSync(p, 'utf8');
  code = code.split(src).join(dst);
  fs.writeFileSync(p, code);
};

replaceInFile('ClaimReadinessScreen.tsx', 'ENTREPRENEUR_ROUTES.businessDocuments(businessId)', 'ENTREPRENEUR_ROUTES.documents(businessId)');
replaceInFile('ClaimTrackerScreen.tsx', 'ENTREPRENEUR_ROUTES.businessDocuments(businessId)', 'ENTREPRENEUR_ROUTES.documents(businessId)');

console.log('done');
