import { getProfileData, getSkills, getCertificates } from "@/lib/api"
import AboutContent from "@/components/AboutContent"

export default async function About() {
  // Fetch data at build time with ISR
  const profileData = await getProfileData()
  const skills = await getSkills()
  const certificates = await getCertificates()

  return <AboutContent profileData={profileData} skills={skills} certificates={certificates} />
}
