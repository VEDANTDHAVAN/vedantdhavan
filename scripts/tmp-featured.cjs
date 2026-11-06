const fs = require('fs');
const s = fs.readFileSync('src/systems/projects.js', 'utf8');
const ids = [...s.matchAll(/id: "([^"]+)"/g)].map(m => m[1]);
const feats = [...s.matchAll(/featured: (true|false)/g)].map(m => m[1] === 'true');
ids.forEach((id, i) => { if (feats[i]) console.log(id); });
console.log('total', ids.length);
"