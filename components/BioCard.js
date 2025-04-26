"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"
import { useState } from "react"

export default function BioCard({ profileData }) {
  const [imageError, setImageError] = useState(false)

  if (!profileData) {
    return (
      <div className="bg-zinc-900 rounded-lg p-6 animate-pulse" aria-busy="true" aria-label="Loading bio information">
        <div className="h-6 bg-zinc-800 rounded w-1/4 mb-6"></div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 bg-zinc-800 rounded-full"></div>
          <div className="space-y-4 flex-1">
            <div className="h-20 bg-zinc-800 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-6 bg-zinc-800 rounded"></div>
              <div className="h-6 bg-zinc-800 rounded"></div>
              <div className="h-6 bg-zinc-800 rounded"></div>
              <div className="h-6 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Use dp as primary, fallback to dp2 or local image
  const profileImage =
    imageError || !profileData.dp2 ? profileData.dp?.url || "/profile-formal.jpeg" : profileData.dp2.url

  return (
    <motion.div
      className="bg-zinc-900 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-6">
        <h2 className="text-xl font-bold uppercase" id="about-heading">
          About Me
        </h2>
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-500"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0">
          <Image
            src={profileImage || "/placeholder.svg"}
            alt={profileData?.Name || "Profile"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
            priority
            onError={() => setImageError(true)}
          />
        </div>

        <div className="space-y-6">
          <p className="text-zinc-300 leading-relaxed">
            {profileData?.bio ||
              "I'm Basat Maqsood, a passionate Software Engineering student at UET Taxila, dedicated to crafting innovative and user-focused solutions."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-400">Name: </span>
              <span className="text-purple-500 font-medium">{profileData?.Name || "Basat Maqsood"}</span>
            </div>
            <div>
              <span className="text-zinc-400">Age: </span>
              <span className="text-purple-500 font-medium">{profileData?.age || "20"} Years</span>
            </div>
            <div>
              <span className="text-zinc-400">Citizenship: </span>
              <span className="text-purple-500 font-medium">{profileData?.citizenship || "Pakistan"}</span>
            </div>
            <div>
              <span className="text-zinc-400">E-mail: </span>
              <span className="text-purple-500 font-medium">{profileData?.email || "itzbasatmaqsood@gmail.com"}</span>
            </div>
            <div>
              <span className="text-zinc-400">Job: </span>
              <span className="text-purple-500 font-medium">{profileData?.job || "Full Stack Developer"}</span>
            </div>
          </div>

          {profileData?.cv && profileData.cv.length > 0 && (
            <a
              href={profileData.cv[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
              aria-label="Download CV"
            >
              <span className="flex items-center gap-2">
                <Download size={16} aria-hidden="true" />
                Download CV
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
