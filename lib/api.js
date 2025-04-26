/**
 * Utility function to fetch data from the API with ISR caching
 * @param {string} endpoint - The API endpoint to fetch from
 * @returns {Promise<any>} - The fetched data
 */
export async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`https://strapi.basatmaqsood.com/api/${endpoint}`, {
      next: {
        revalidate: 86400, // Revalidate every 24 hours (86400 seconds)
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
    return null
  }
}

/**
 * Fetch profile data with ISR
 * @returns {Promise<Object>} - The profile data
 */
export async function getProfileData() {
  const data = await fetchAPI("abouts?populate=*")
  return data?.data?.[0] || null
}

/**
 * Fetch projects data with ISR
 * @returns {Promise<Array>} - The projects data
 */
export async function getProjects() {
  const data = await fetchAPI("projects?populate=*")
  return data?.data || []
}

/**
 * Fetch blog posts data with ISR
 * @returns {Promise<Array>} - The blog posts data
 */
export async function getBlogPosts() {
  const data = await fetchAPI("blogs?populate=*")
  return data?.data || []
}

/**
 * Fetch certificates data with ISR
 * @returns {Promise<Array>} - The certificates data
 */
export async function getCertificates() {
  const data = await fetchAPI("certificates?populate=*")
  return data?.data || []
}

/**
 * Fetch contact information with ISR
 * @returns {Promise<Object>} - The contact information
 */
export async function getContactInfo() {
  const data = await fetchAPI("contacts?populate=*")
  return data?.data?.[0] || null
}

/**
 * Fetch services data with ISR
 * @returns {Promise<Array>} - The services data
 */
export async function getServices() {
  const data = await fetchAPI("services?populate=*")
  return data?.data || []
}

/**
 * Fetch social media links with ISR
 * @returns {Promise<Array>} - The social media links
 */
export async function getSocialLinks() {
  const data = await fetchAPI("socials?populate=*")
  return data?.data || []
}

/**
 * Fetch skills data with ISR
 * @returns {Promise<Array>} - The skills data
 */
export async function getSkills() {
  const data = await fetchAPI("skills?populate=*")
  return data?.data || []
}
