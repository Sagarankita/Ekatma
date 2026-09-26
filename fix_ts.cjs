const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const replaceInFile = (file, src, dst) => {
  const p = path.join(componentsDir, file);
  let code = fs.readFileSync(p, 'utf8');
  code = code.split(src).join(dst);
  fs.writeFileSync(p, code);
};

replaceInFile('ClaimReadinessScreen.tsx', 'ENTREPRENEUR_ROUTES.documentRepository(businessId)', 'ENTREPRENEUR_ROUTES.businessDocuments(businessId)');
replaceInFile('ClaimTrackerScreen.tsx', 'ENTREPRENEUR_ROUTES.documentRepository(businessId)', 'ENTREPRENEUR_ROUTES.businessDocuments(businessId)');

let p = path.join(componentsDir, 'ROIPlannerScreen.tsx');
let code = fs.readFileSync(p, 'utf8');
code = code.replace('const { businessId, calculatorDraft, updateCalculatorDraft } = useIncentiveWorkspace();', 'const { businessId, roiInputsDraft, setRoiInputsDraft } = useIncentiveWorkspace();');
code = code.replace(`  const handleValChange = (id: string, val: string) => {
    updateCalculatorDraft({
      roiAssumptions: {
        ...(calculatorDraft.roiAssumptions || {}),
        [id]: val
      }
    });
  };`, `  const handleValChange = (id: string, val: string) => {
    setRoiInputsDraft(prev => ({
      ...prev,
      [id]: val
    }));
  };`);
code = code.replace(`value={calculatorDraft?.roiAssumptions?.[q.id] || ''}`, `value={roiInputsDraft[q.id] || ''}`);
fs.writeFileSync(p, code);

console.log('done');
