const fs = require('fs');
const path = require('path');
const p = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives', 'page.tsx');
try {
  console.log(fs.readFileSync(p, 'utf8'));
} catch (e) {
  console.log("file not found");
}
