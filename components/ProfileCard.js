"use client"
import Image from "next/image"
import { Download, Linkedin, Github, Mail, Twitter, Link as LinkIcon, Facebook, Instagram, Youtube, MapPin, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { TypeAnimation } from "react-type-animation"
import Magnetic from "@/components/motion/Magnetic"
import { clipReveal, staggerContainer, childReveal } from "@/components/motion/variants"

const getIcon = (title) => {
  const t = title.toLowerCase()
  if (t.includes("linkedin")) return <Linkedin size={18} strokeWidth={2.5} />
  if (t.includes("github")) return <Github size={18} strokeWidth={2.5} />
  if (t.includes("email") || t.includes("mail")) return <Mail size={18} strokeWidth={2.5} />
  if (t.includes("twitter") || t.includes("x")) return <Twitter size={18} strokeWidth={2.5} />
  if (t.includes("facebook")) return <Facebook size={18} strokeWidth={2.5} />
  if (t.includes("instagram")) return <Instagram size={18} strokeWidth={2.5} />
  if (t.includes("youtube")) return <Youtube size={18} strokeWidth={2.5} />
  if (t.includes("whatsapp")) return <MessageCircle size={18} strokeWidth={2.5} />
  return <LinkIcon size={18} strokeWidth={2.5} />
}

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

  const profileImage =
    imageError || !profileData.dp ? profileData.dp2?.url || "/profile-casual.jpeg" : profileData.dp?.url || "/profile-casual.jpeg"

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-none p-7 sticky top-24 transition-colors duration-300 hover:border-zinc-700 flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div
        className="relative w-28 h-28 rounded-none overflow-hidden mb-5 border-2 border-zinc-800"
        variants={clipReveal}
      >
        <Image
          src={profileImage || "/placeholder.svg"}
          alt={profileData?.Name || "Profile"}
          fill
          className="object-cover"
          sizes="112px"
          priority
          onError={() => setImageError(true)}
        />
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-zinc-100 tracking-tight mb-2 text-center"
        variants={childReveal}
      >
        {profileData?.Name || "Basat Maqsood"}
      </motion.h2>

      <motion.div variants={childReveal}>
        <TypeAnimation
          sequence={["Frontend Developer", 4000, "MERN Stack Developer", 4000, "Software Engineer", 4000]}
          speed={50}
          className="text-purple-400 font-medium mb-5 text-base text-center block"
          repeat={Infinity}
        />
      </motion.div>

      <motion.p className="text-zinc-400 text-sm flex items-center gap-2 mb-6" variants={childReveal}>
        <MapPin size={16} className="text-purple-500" />
        {profileData?.address || "Islamabad, Pakistan"}
      </motion.p>

      <motion.div className="flex flex-wrap justify-center gap-3 mb-8 w-full" variants={childReveal}>
        {socialLinks?.map((social, index) => (
          <Magnetic key={index} strength={0.4}>
            <a
              href={social.link}
              className="w-10 h-10 rounded-none bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors duration-300"
              aria-label={social.title}
              title={social.title}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
            >
              {getIcon(social.title)}
            </a>
          </Magnetic>
        ))}
      </motion.div>

      <motion.div className="w-full mb-4" variants={childReveal}>
        <Magnetic strength={0.25} className="w-full">
          <Link
            href="/contact"
            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-6 rounded-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            data-cursor="hover"
          >
            Let&apos;s Talk
          </Link>
        </Magnetic>
      </motion.div>

      {profileData?.cv && profileData.cv.length > 0 && (
        <motion.div className="w-full" variants={childReveal}>
          <Magnetic strength={0.25} className="w-full">
            <a
              href={profileData.cv?.[0]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-6 rounded-none border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Download CV"
              data-cursor="hover"
            >
              <Download size={16} strokeWidth={2.5} />
              <span className="font-medium">Download CV</span>
            </a>
          </Magnetic>
        </motion.div>
      )}
    </motion.div>
  )
}
