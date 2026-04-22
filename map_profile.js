const fs = require('fs');
const path = require('path');

const aboutsPath = path.join(__dirname, 'data', 'abouts.json');
const filesPath = path.join(__dirname, 'data', 'files.json');

const abouts = JSON.parse(fs.readFileSync(aboutsPath, 'utf8'));
const files = JSON.parse(fs.readFileSync(filesPath, 'utf8'));

// Manually map using specific file names
const dpFile = files.find(f => f.name === 'dp-removebg-preview.png');
const dp2File = files.find(f => f.name === 'dp2.jpg');
const cvFile = files.find(f => f.name.includes('.pdf') || f.name.includes('Resume'));

abouts.forEach(a => {
    if (dpFile) a.dp = dpFile;
    if (dp2File) a.dp2 = dp2File;
    if (cvFile) a.cv = [cvFile]; // cv is expected as an array since components use cv[0]
});

fs.writeFileSync(aboutsPath, JSON.stringify(abouts, null, 4));
console.log("Updated abouts.json with dp, dp2, and cv.");
