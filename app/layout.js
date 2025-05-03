import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import { Suspense } from "react";
import { getProfileData, getSocialLinks } from "@/lib/api";
import Footer from "@/components/Footer";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"], display: "swap" });


export const metadata = {
  title: "Basat Maqsood - Software Engineer",
  description:
    "Software Engineer | Full Stack Web Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
  keywords:
    "Basat Maqsood, Software Engineer, Full Stack Developer, MERN Stack, Web Development, Responsive Web Applications",
  authors: [{ name: "Basat Maqsood", url: "https://basatmaqsood.com" }],
  creator: "Basat Maqsood",
  alternates: {
    canonical: "https://basatmaqsood.com", // ✅ Add canonical properly
  },
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
    images: [
      "https://res.cloudinary.com/dr7askqqy/image/upload/v1745730051/og_527f46ac1e.png",
    ],
    creator: "@basatmaqsood",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  generator: "v0.dev",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Basat Maqsood",
      url: "https://basatmaqsood.com",
      image:
        "https://res.cloudinary.com/dr7askqqy/image/upload/v1745730051/og_527f46ac1e.png",
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance / Independent",
      },
      sameAs: [
        "https://github.com/basatmaqsood",
        "https://linkedin.com/in/basatmaqsood",
        "https://twitter.com/basatmaqsood",
      ],
      description:
        "Full Stack Software Engineer with expertise in the MERN stack. Passionate about building responsive web applications and solving complex business problems.",
      nationality: "Pakistani",
    }),
  },
};

export default async function RootLayout({ children }) {
  // Fetch profile data and social links at build time with ISR
  const profileData = await getProfileData();
  const socialLinks = await getSocialLinks();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-WE8B6Z67JQ`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WE8B6Z67JQ');
          `}
        </Script>
      </head>

      <body
        className={`${inter.className} bg-black text-white overflow-x-hidden`}
      >
        <CustomCursor />

        {/* <Background /> */}
        <ParticleBackground />
        <div className="relative z-10">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 pt-24">
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
                  <ProfileCard
                    profileData={profileData}
                    socialLinks={socialLinks}
                  />
                </Suspense>
              </div>
              {/* Right Column - Content */}
              <div className="md:w-3/4">{children}</div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
