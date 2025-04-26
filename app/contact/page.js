import { getProfileData, getContactInfo, getSocialLinks } from "@/lib/api"
import ContactContent from "@/components/ContactContent"

export default async function Contact() {
  // Fetch data at build time with ISR
  const profileData = await getProfileData()
  const contactInfo = await getContactInfo()
  const socialLinks = await getSocialLinks()

  return <ContactContent profileData={profileData} contactInfo={contactInfo} socialLinks={socialLinks} />
}
