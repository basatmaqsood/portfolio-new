import { Inter } from "next/font/google"
import "./globals.css"
import Background from "@/components/Background"
import CustomCursor from "@/components/CustomCursor"
import Navbar from "@/components/Navbar"
import ProfileCard from "@/components/ProfileCard"
import { Suspense } from "react"
import { getProfileData, getSocialLinks } from "@/lib/api"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "Basat Maqsood - Frontend Developer",
  description:
    "Portfolio website of Basat Maqsood, a Frontend Developer specializing in creating innovative and user-focused solutions",
    generator: 'v0.dev'
}

export default async function RootLayout({ children }) {
  // Fetch profile data and social links at build time with ISR
  const profileData = await getProfileData()
  const socialLinks = await getSocialLinks()

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <CustomCursor />
        <Background />
        <div className="relative z-10">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 pt-24 pb-12">
              {/* Left Column - Profile Card */}
              <div className="md:w-1/4">
                <Suspense
                  fallback={
                    <div
                      className="profile-card animate-pulse"
                      aria-busy="true"
                      aria-label="Loading profile information"
                    ></div>
                  }
                >
                  <ProfileCard profileData={profileData} socialLinks={socialLinks} />
                </Suspense>
              </div>
              {/* Right Column - Content */}
              <div className="md:w-3/4">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
