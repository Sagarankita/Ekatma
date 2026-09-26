const fs = require('fs');
const path = require('path');
const p = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives', 'centre', 'page.tsx');
console.log(fs.readFileSync(p, 'utf8'));
