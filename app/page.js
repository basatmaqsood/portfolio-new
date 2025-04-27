import { Suspense } from "react"
import { getProfileData, getProjects, getBlogPosts, getServices, getSkills } from "@/lib/api"
import BioCard from "@/components/BioCard"
import ProjectsSection from "@/components/sections/ProjectsSection"
import BlogSection from "@/components/sections/BlogSection"
import FaqSection from "@/components/sections/FaqSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/Footer"
import ServicesSection from "@/components/sections/ServicesSection"
import SkillsSection from "@/components/sections/SkillsSection"

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
  // Fetch data at build time with ISR
  const [profileData, services, skills] = await Promise.all([
    getProfileData(),

    getServices(),
    getSkills()
  ]);
  

  return (
    <>
      {/* Bio Card Section */}
      <section className="mb-20" aria-labelledby="about-heading">
        <BioCard profileData={profileData} />
      </section>

      {/* Services Section */}
      <Suspense fallback={<div className="h-40 bg-zinc-900 rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <ServicesSection services={services} />
      </Suspense>

      {/* Projects Section */}
      {/* <Suspense fallback={<div className="h-40 bg-zinc-900 rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <ProjectsSection projects={projects} />
      </Suspense> */}

      {/* Skills Section */}
      <Suspense fallback={<div className="h-40 bg-zinc-900 rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <SkillsSection skills={skills} />
      </Suspense>

      {/* Blog Section */}
      {/* <Suspense fallback={<div className="h-40 bg-zinc-900 rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <BlogSection blogPosts={blogPosts} />
      </Suspense> */}

      {/* FAQ Section */}
      {/* <Suspense fallback={<div className="h-40 bg-zinc-900 rounded-lg animate-pulse mb-20" aria-busy="true"></div>}>
        <FaqSection />
      </Suspense> */}

      {/* Contact Section */}
      <Suspense fallback={<div className="h-40 bg-zinc-900 rounded-lg animate-pulse mb-10" aria-busy="true"></div>}>
        <ContactSection />
      </Suspense>

      <Footer />
    </>
  )
}
