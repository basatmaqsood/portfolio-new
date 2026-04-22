import aboutsData from '../data/abouts.json';
import projectsData from '../data/projects.json';
import blogsData from '../data/blogs.json';
import certificatesData from '../data/certificates.json';
import contactsData from '../data/contacts.json';
import servicesData from '../data/services.json';
import socialsData from '../data/socials.json';
import skillsData from '../data/skills.json';

// Helper to filter out draft entries (items with null published_at)
const getPublished = (data) => {
  if (!Array.isArray(data)) return [];
  return data.filter(item => item.published_at !== null);
};

/**
 * Legacy fetchAPI. Throws warning since we are fully static now.
 */
export async function fetchAPI(endpoint) {
  console.warn(`fetchAPI called for endpoint "${endpoint}" but data fetching is now fully static. Returning null.`);
  return null;
}

/**
 * Fetch profile data (first published entry)
 */
export async function getProfileData() {
  const published = getPublished(aboutsData);
  return published[0] || null;
}

/**
 * Fetch projects data
 */
export async function getProjects() {
  return getPublished(projectsData);
}

/**
 * Fetch blog posts data
 */
export async function getBlogPosts() {
  return getPublished(blogsData);
}

/**
 * Fetch certificates data
 */
export async function getCertificates() {
  return getPublished(certificatesData);
}

/**
 * Fetch contact information
 */
export async function getContactInfo() {
  const published = getPublished(contactsData);
  return published[0] || null;
}

/**
 * Fetch services data
 */
export async function getServices() {
  return getPublished(servicesData);
}

/**
 * Fetch social media links
 */
export async function getSocialLinks() {
  return getPublished(socialsData);
}

/**
 * Fetch skills data
 */
export async function getSkills() {
  return getPublished(skillsData);
}
