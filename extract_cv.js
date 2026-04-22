const fs = require('fs');
const pdf = require('pdf-parse/lib/pdf-parse.js');

const dataBuffer = fs.readFileSync('public/Basat_Maqsood_CV.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(e => console.error(e));
