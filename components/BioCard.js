"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download, User, Calendar, MapPin, Mail, Briefcase } from "lucide-react"
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

  // Primary image is /pfp.png, fallback to profileData sources
  const profileImage = "/pfp.png";

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-none relative overflow-hidden transition-colors hover:border-zinc-700 flex flex-col md:flex-row min-h-[420px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Rectangular Image Section - docks to the absolute left */}
      <div className="relative md:w-1/3 w-full min-h-[350px] md:min-h-full bg-zinc-800 flex-shrink-0">
        <Image
          src={profileImage || "/placeholder.svg"}
          alt={profileData?.Name || "Profile"}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          onError={() => setImageError(true)}
        />
        {/* Subtle Accent Bar on top of image edge */}
        <div className="absolute top-0 right-0 w-1.5 h-full bg-purple-500/90 z-10"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
        <div className="relative mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-white/50 text-sm mb-2" id="about-heading">
            Professional Profile
          </h2>
          <h3 className="text-4xl font-black text-zinc-100 tracking-tight mb-4">{profileData?.Name || "Basat Maqsood"}</h3>
          <div className="w-16 h-1 bg-purple-500 rounded-none"></div>
        </div>

        <div className="space-y-8">
          <p className="text-zinc-400 leading-relaxed text-base italic border-l-2 border-zinc-700 pl-6 py-2 bg-zinc-800 rounded-none">
            &quot;{profileData?.bio || "Dedicated Software Engineering student at UET Taxila, crafting innovative solutions."}&quot;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-8">
            <div className="flex items-center gap-4 bg-zinc-800 border border-zinc-800/50 p-4 rounded-none group transition-all duration-300 hover:bg-zinc-700/50 hover:border-purple-500/30">
              <div className="w-10 h-10 rounded-none bg-zinc-900 flex items-center justify-center text-purple-500 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Calendar size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-0.5">Age</span>
                <span className="text-zinc-100 font-semibold">{profileData?.age || "21"} Years</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-800 border border-zinc-800/50 p-4 rounded-none group transition-all duration-300 hover:bg-zinc-700/50 hover:border-purple-500/30">
              <div className="w-10 h-10 rounded-none bg-zinc-900 flex items-center justify-center text-purple-500 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-0.5">Location</span>
                <span className="text-zinc-100 font-semibold">{profileData?.citizenship || "Pakistan"}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-800 border border-zinc-800/50 p-4 rounded-none group transition-all duration-300 hover:bg-zinc-700/50 hover:border-purple-500/30">
              <div className="w-10 h-10 rounded-none bg-zinc-900 flex items-center justify-center text-purple-500 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-0.5">E-mail</span>
                <span className="text-zinc-100 font-semibold truncate hover:text-purple-400">
                  <a href={`mailto:${profileData?.email || "itzbasatmaqsood@gmail.com"}`}>
                    {profileData?.email || "itzbasatmaqsood@gmail.com"}
                  </a>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-800 border border-zinc-800/50 p-4 rounded-none group transition-all duration-300 hover:bg-zinc-700/50 hover:border-purple-500/30">
              <div className="w-10 h-10 rounded-none bg-zinc-900 flex items-center justify-center text-purple-500 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Briefcase size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-0.5">Role</span>
                <span className="text-zinc-100 font-semibold">{profileData?.job || "Full Stack Developer"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
