"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Mail, Briefcase } from "lucide-react"
import { useState } from "react"
import Reveal from "@/components/motion/Reveal"
import SplitText from "@/components/motion/SplitText"
import TiltCard from "@/components/motion/TiltCard"
import { childReveal, clipRevealX, easeLuxury, staggerContainer } from "@/components/motion/variants"

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

  const profileImage = "/pfp.png"
  const infoChips = [
    { icon: Calendar, label: "Age", value: `${profileData?.age || "21"} Years` },
    { icon: MapPin, label: "Location", value: profileData?.citizenship || "Pakistan" },
    {
      icon: Mail,
      label: "E-mail",
      value: profileData?.email || "me@basatmaqsood.com",
      href: `mailto:${profileData?.email || "me@basatmaqsood.com"}`,
    },
    { icon: Briefcase, label: "Role", value: profileData?.job || "Full Stack Developer" },
  ]

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-none relative overflow-hidden transition-colors hover:border-zinc-700 flex flex-col md:flex-row min-h-[420px]"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div
        className="relative md:w-1/3 w-full min-h-[350px] md:min-h-full bg-zinc-800 flex-shrink-0 overflow-hidden"
        variants={clipRevealX}
      >
        <Image
          src={imageError ? "/placeholder.svg" : profileImage}
          alt={profileData?.Name || "Profile"}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          onError={() => setImageError(true)}
        />
        <motion.div
          className="absolute top-0 right-0 w-1.5 h-full bg-purple-500/90 z-10 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: easeLuxury, delay: 0.35 }}
        />
      </motion.div>

      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
        <motion.div className="relative mb-8" variants={childReveal}>
          <h2
            className="text-2xl font-bold uppercase tracking-[0.2em] text-white/50 text-sm mb-2"
            id="about-heading"
          >
            Professional Profile
          </h2>
          <SplitText
            as="h3"
            text={profileData?.Name || "Basat Maqsood"}
            className="text-4xl font-black text-zinc-100 tracking-tight mb-4"
          />
          <motion.div
            className="w-16 h-1 bg-purple-500 rounded-none origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: easeLuxury, delay: 0.4 }}
          />
        </motion.div>

        <div className="space-y-8">
          <Reveal variant="clip" className="text-zinc-400 leading-relaxed text-base italic border-l-2 border-zinc-700 pl-6 py-2 bg-zinc-800 rounded-none">
            &quot;
            {profileData?.bio ||
              "Dedicated Software Engineering graduate from UET Taxila, crafting innovative solutions."}
            &quot;
          </Reveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {infoChips.map((chip) => {
              const Icon = chip.icon
              return (
                <TiltCard
                  key={chip.label}
                  maxTilt={6}
                  reveal={false}
                  className="group bg-zinc-800 border border-zinc-800/50 p-4 rounded-none transition-all duration-300 hover:bg-zinc-700/50 hover:border-purple-500/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-none bg-zinc-900 flex items-center justify-center text-purple-500 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-0.5">
                        {chip.label}
                      </span>
                      {chip.href ? (
                        <a
                          href={chip.href}
                          className="text-zinc-100 font-semibold truncate hover:text-purple-400"
                          data-cursor="hover"
                        >
                          {chip.value}
                        </a>
                      ) : (
                        <span className="text-zinc-100 font-semibold">{chip.value}</span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
