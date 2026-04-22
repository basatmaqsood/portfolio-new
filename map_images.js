const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'data', 'projects.json');
const blogsPath = path.join(__dirname, 'data', 'blogs.json');
const filesPath = path.join(__dirname, 'data', 'files.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
const files = JSON.parse(fs.readFileSync(filesPath, 'utf8'));

// Helper to find closest file uploaded before an entity
function attachCover(entityList) {
    return entityList.map(item => {
        const itemDate = new Date(item.created_at).getTime();
        
        let closestFile = null;
        let smallestDiff = Infinity;
        
        for (const file of files) {
            const fileDate = new Date(file.created_at).getTime();
            const diff = itemDate - fileDate;
            // if file was uploaded within a few minutes/days before item creation
            if (diff > 0 && diff < 7 * 24 * 60 * 60 * 1000) { // 7 days window to be safe
                if (diff < smallestDiff) {
                    smallestDiff = diff;
                    closestFile = file;
                }
            }
        }
        
        if (closestFile) {
            item.cover = closestFile;
            console.log(`Mapped: ${item.title} -> ${closestFile.name}`);
        } else {
            console.log(`NO MAPPING: ${item.title}`);
        }
        return item;
    });
}

const newProjects = attachCover(projects);
console.log("---");
const newBlogs = attachCover(blogs);

fs.writeFileSync(projectsPath, JSON.stringify(newProjects, null, 4));
fs.writeFileSync(blogsPath, JSON.stringify(newBlogs, null, 4));

console.log("Updated projects and blogs with cover relations from files.json");
