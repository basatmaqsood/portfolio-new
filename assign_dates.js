const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'data', 'projects.json');
let projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Basic projects: HTML/CSS or simple clones
const basicKeywords = ["Car Rental", "BackRoads", "Kaun Bane ga", "Wordle", "Giphy", "PopCorn", "React Buttons"];
const mediumKeywords = ["AirBnB", "React Slots", "URL TO QR"];
// Latest: ChatGPT, Lang-Bridge, Next-Rivals, BlurtBox, Swift, etc.

projects = projects.map(p => {
    let dateStr = "2024";
    const title = p.title.toLowerCase();
    const isBasic = basicKeywords.some(k => title.includes(k.toLowerCase()));
    const isMedium = mediumKeywords.some(k => title.includes(k.toLowerCase()));
    
    if (title.includes("car rental") || title.includes("backroads")) {
        dateStr = `Oct 2022`; // oldest
    } else if (isBasic) {
        dateStr = `Early 2023`;
    } else if (isMedium) {
        dateStr = `Late 2023`;
    } else if (title.includes("blurtbox") || title.includes("swift") || title.includes("lang-bridge")) {
        dateStr = `Early 2025`;
    } else if (title.includes("next-rivals")) {
        dateStr = `Feb 2025`;
    } else {
        dateStr = `Mid 2024`;
    }
    
    p.date = dateStr;
    return p;
});

fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 4));
console.log("Assigned dates to projects.");
