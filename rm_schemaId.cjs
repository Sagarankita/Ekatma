const fs = require('fs');
const path = require('path');
const p = path.join('src', 'app', 'entrepreneur', '(authenticated)', 'businesses', '[businessId]', 'incentives', 'portfolio');
fs.rmSync(path.join(p, '[schemeId]'), { recursive: true, force: true });
