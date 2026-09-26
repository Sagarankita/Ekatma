const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const p = path.join(componentsDir, 'ClaimReadinessScreen.tsx');
let code = fs.readFileSync(p, 'utf8');
if (!code.includes('"use client"')) {
  code = '"use client";\n' + code;
  fs.writeFileSync(p, code);
}
console.log('done');
