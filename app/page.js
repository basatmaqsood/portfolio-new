import { Suspense } from "react"
import dynamic from "next/dynamic"
import { getProfileData, getServices, getSkills, getCertificates } from "@/lib/api"
import BioCard from "@/components/BioCard"
import ContactSection from "@/components/sections/ContactSection"
import SkillsSection from "@/components/sections/SkillsSection"
import CertificatesSection from "@/components/sections/CertificatesSection"

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  {
    loading: () => (
      <div className="h-40 bg-surface rounded-lg animate-pulse mb-20" aria-busy="true" />
    ),
  }
)

export const metadata = {
  title: "Basat Maqsood - Software Engineer",
  description:
    "Software Engineer | Frontend Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
  keywords:
    "Basat Maqsood, Software Engineer, Frontend Developer, MERN Stack, Web Development, Responsive Web Applications",
  authors: [{ name: "Basat Maqsood", url: "https://basatmaqsood.com" }],
  creator: "Basat Maqsood",
  openGraph: {
    title: "Basat Maqsood - Software Engineer",
    description:
      "Software Engineer | Full Stack Web Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
    url: "https://basatmaqsood.com",
    siteName: "Basat Maqsood",
    images: [
      {
        url: "https://res.cloudinary.com/dr7askqqy/image/upload/v1745730051/og_527f46ac1e.png",
        width: 1200,
        height: 630,
        alt: "Basat Maqsood - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basat Maqsood - Software Engineer",
    description:
      "Software Engineer | Full Stack Web Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
    images: ["https://res.cloudinary.com/dr7askqqy/image/upload/v1745730051/og_527f46ac1e.png"],
    creator: "@basatmaqsood",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  generator: "v0.dev",
};

export default async function Home() {
  const [profileData, services, skills, certificates] = await Promise.all([
    getProfileData(),
    getServices(),
    getSkills(),
    getCertificates(),
  ])

  return (
    <>
      <section className="mb-20" aria-labelledby="about-heading">
        <BioCard profileData={profileData} />
      </section>

      <Suspense fallback={<div className="h-40 bg-surface rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <SkillsSection skills={skills} />
      </Suspense>

      <Suspense fallback={<div className="h-40 bg-surface rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <CertificatesSection certificates={certificates} />
      </Suspense>

      <ServicesSection services={services} />

      <Suspense fallback={<div className="h-40 bg-surface rounded-lg animate-pulse mb-10" aria-busy="true"></div>}>
        <ContactSection />
      </Suspense>
    </>
  )
}
