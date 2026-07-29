"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Download, User, Calendar, MapPin, Mail } from "lucide-react"
import SkillsSection from "./sections/SkillsSection"
import ServicesSection from "./sections/ServicesSection"
import ExperienceSection from "./sections/ExperienceSection"
import CertificatesSection from "./sections/CertificatesSection"
import SplitText, { AccentSplit } from "@/components/motion/SplitText"
import Reveal from "@/components/motion/Reveal"
import Magnetic from "@/components/motion/Magnetic"
import TiltCard from "@/components/motion/TiltCard"
import { childReveal, staggerContainer } from "@/components/motion/variants"

export default function AboutContent({ profileData, skills, certificates, services }) {
  const [imageError, setImageError] = useState(false)
  const profileImage = "/pfp.png"

  const chips = [
    { icon: User, label: "Name", value: profileData?.Name || "Basat Maqsood" },
    { icon: Calendar, label: "Age", value: `${profileData?.age || "21"} Years` },
    { icon: MapPin, label: "Location", value: profileData?.citizenship || "Pakistan" },
    {
      icon: Mail,
      label: "E-mail",
      value: profileData?.email || "me@basatmaqsood.com",
      href: `mailto:${profileData?.email || "me@basatmaqsood.com"}`,
    },
  ]

  return (
    <>
      <motion.section className="mb-16" initial="hidden" animate="visible" variants={staggerContainer}>
        <AccentSplit before="About" accent="Me" className="text-4xl font-bold mb-6" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Reveal variant="clipX" className="relative min-h-[360px] rounded-lg overflow-hidden">
            <Image
              src={imageError ? "/placeholder.svg" : profileImage}
              alt="Profile"
              fill
              className="object-top object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          </Reveal>

          <motion.div variants={childReveal} className="flex flex-col justify-between">
            <div className="space-y-4 mb-8">
              <SplitText
                as="h2"
                text={profileData?.Name || "Basat Maqsood"}
                className="text-3xl font-bold text-zinc-100"
              />
              <h3 className="text-purple-500 text-xl font-medium">{profileData?.job || "Software Engineer"}</h3>
              <Reveal variant="clip" className="text-zinc-400 leading-relaxed text-base italic border-l-2 border-zinc-800 pl-4 py-1">
                &quot;
                {profileData?.bio ||
                  "Hi I am Basat, a Software Engineering graduate from UET Taxila, passionate about building scalable, user-centric solutions."}
                &quot;
              </Reveal>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {chips.map((chip) => {
                const Icon = chip.icon
                return (
                  <TiltCard
                    key={chip.label}
                    maxTilt={5}
                    reveal={false}
                    className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-lg group hover:border-zinc-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">{chip.label}</span>
                      {chip.href ? (
                        <a href={chip.href} className="text-zinc-100 font-medium truncate hover:text-purple-400 transition-colors" data-cursor="hover">
                          {chip.value}
                        </a>
                      ) : (
                        <span className="text-zinc-100 font-medium">{chip.value}</span>
                      )}
                    </div>
                  </TiltCard>
                )
              })}
            </motion.div>

            {profileData?.cv && profileData.cv.length > 0 && (
              <div className="pt-2">
                <Magnetic strength={0.28}>
                  <a
                    href={profileData.cv?.[0]?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button inline-flex items-center gap-3 py-3 px-8 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 active:scale-95"
                    data-cursor="hover"
                  >
                    <Download size={20} strokeWidth={2.5} />
                    <span className="font-bold tracking-wide">Download CV</span>
                  </a>
                </Magnetic>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <ExperienceSection />

      <CertificatesSection certificates={certificates} />

      <SkillsSection skills={skills} />
      <ServicesSection services={services} />
    </>
  )
}
