const fs = require('fs');

const aboutsPath = 'd:/portfolio-new/data/abouts.json';
const abouts = JSON.parse(fs.readFileSync(aboutsPath, 'utf8'));

abouts.forEach(a => {
    if (!a.cv) a.cv = [];
    a.cv[0] = { url: "/Basat_Maqsood_CV.pdf" };
});

fs.writeFileSync(aboutsPath, JSON.stringify(abouts, null, 4));
console.log("Updated CV link to /Basat_Maqsood_CV.pdf");
