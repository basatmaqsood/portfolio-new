"use client"
import Image from "next/image"
import { Download } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import parse from "html-react-parser"
import { TypeAnimation } from 'react-type-animation';


export default function ProfileCard({ profileData, socialLinks }) {
  const [imageError, setImageError] = useState(false)

  if (!profileData) {
    return (
      <div className="profile-card animate-pulse" aria-busy="true" aria-label="Loading profile information">
        <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-zinc-800 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-10 bg-zinc-800 rounded w-full mb-4"></div>
      </div>
    )
  }

  // Use dp2 as fallback if dp is not available or fails to load
  const profileImage =
    imageError || !profileData.dp ? profileData.dp2?.url || "/profile-casual.jpeg" : profileData.dp.url

  return (
    <motion.div
      className="profile-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-purple-500">
          <Image
            src={profileImage || "/placeholder.svg"}
            alt={profileData?.Name || "Profile"}
            fill
            className="object-cover"
            sizes="96px"
            priority
            onError={() => setImageError(true)}
          />
        </div>
        <h2 className="text-xl font-bold">{profileData?.Name || "Basat Maqsood"}</h2>
        <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Frontend Developer',
    4000,
    'MERN Stack Developer',
    4000,
    'Software Engineer',
    4000,
  ]}
  speed={50}
  className="text-zinc-400 mb-4"
  repeat={Infinity}
/>
        {/* <p className="text-zinc-400 mb-4">{profileData?.job || "Frontend Developer"}</p> */}
        <p className="text-zinc-400 text-sm flex items-center gap-1 mb-4">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></span>
          {profileData?.address || "Islamabad, Pakistan"}
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {socialLinks &&
            socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="profile-social-icon"
                aria-label={social.title}
                title={social.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                {parse(social.icon)}
              </a>
            ))}
        </div>

        <Link
          href="/contact"
          className="cta-button w-full text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          Let&apos;s Talk
        </Link>

        {profileData?.cv && profileData.cv.length > 0 && (
          <a
            href={profileData.cv[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-zinc-400 hover:text-purple-500 flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:rounded"
            aria-label="Download CV"
          >
            <Download size={14} aria-hidden="true" />
            Download CV
          </a>
        )}
      </div>
    </motion.div>
  )
}
