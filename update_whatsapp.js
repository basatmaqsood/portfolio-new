const fs = require('fs');

// 1. Update contacts.json
const contactsPath = 'd:/portfolio-new/data/contacts.json';
const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
contacts.forEach(c => c.phone = '+923260185306');
fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));

// 2. Add WhatsApp to socials.json
const socialsPath = 'd:/portfolio-new/data/socials.json';
const socials = JSON.parse(fs.readFileSync(socialsPath, 'utf8'));

// Check if WhatsApp already exists
let waExists = socials.some(s => s.title.toLowerCase().includes('whatsapp'));
if (!waExists) {
  socials.push({
    "id": 999,
    "title": "WhatsApp",
    "link": "https://wa.me/923260185306",
    "published_at": new Date().toISOString()
  });
  fs.writeFileSync(socialsPath, JSON.stringify(socials, null, 2));
}

// 3. Update abouts.json if it has a phone field
const aboutsPath = 'd:/portfolio-new/data/abouts.json';
if (fs.existsSync(aboutsPath)) {
  const abouts = JSON.parse(fs.readFileSync(aboutsPath, 'utf8'));
  let updated = false;
  abouts.forEach(a => {
    if (a.phone !== undefined) {
      a.phone = '+923260185306';
      updated = true;
    }
  });
  if (updated) fs.writeFileSync(aboutsPath, JSON.stringify(abouts, null, 2));
}

console.log('Successfully added WhatsApp to socials and updated phone number!');
