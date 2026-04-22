"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Download, User, Calendar, MapPin, Mail, Briefcase, Check } from "lucide-react"
import SkillsSection from "./sections/SkillsSection"
import ServicesSection from "./sections/ServicesSection"

import ExperienceSection from "./sections/ExperienceSection"

const experiences = [
  {
    id: 1,
    company: "Celerity Global",
    role: "Full Stack Developer (Remote)",
    date: "Oct 2025 - Present",
    location: "Remote",
    points: [
      "Developing and maintaining scalable web applications using NestJS and Next.js, focusing on building reusable server-side modules and type-safe API contracts.",
      "Collaborating in a high-velocity, remote team environment, participating in peer code reviews and technical grooming sessions to maintain high code quality standards.",
      "Streamlining frontend-backend integration by implementing centralized state management and optimized data-fetching patterns, reducing unnecessary re-renders and API overhead."
    ]
  },
  {
    id: 2,
    company: "Fiverr",
    role: "Level 1 Seller (Freelance Full Stack Developer)",
    date: "Feb 2025 - Present",
    location: "Remote",
    points: [
      "Successfully delivered 15+ full-stack projects for international clients, maintaining a 100% 5-star rating through transparent communication and technical reliability.",
      "Translated complex client business requirements into functional web solutions, managing the full development lifecycle from database schema design to production deployment."
    ]
  },
  {
    id: 3,
    company: "Lantrotech",
    role: "Web Development Intern",
    date: "Jun 2025 - Sep 2025",
    location: "Islamabad, Pakistan",
    points: [
      "Built and optimized responsive user interfaces with React and Next.js, improving client-side performance and accessibility across various device types.",
      "Developed and documented modular backend services using NestJS, ensuring clean separation of concerns and maintainable logic for future feature scaling.",
      "Engaged in an Agile development environment, contributing to daily stand-ups and sprint retrospectives to ensure consistent project momentum."
    ]
  }
];

export default function AboutContent({ profileData, skills, certificates, services }) {
  const [imageError, setImageError] = useState(false)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }


  // Use pfp.png from public folder
  const profileImage = "/pfp.png"

  return (
    <>
      <motion.section className="mb-16" initial="hidden" animate="visible" variants={fadeInUp}>
        <motion.h1 className="text-4xl font-bold mb-6" variants={fadeInUp}>
          About <span className="text-purple-500">Me</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={fadeInUp}>
            <div className="relative h-full rounded-lg overflow-hidden">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                fill
                className="object-top object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImageError(true)}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col justify-between">
            <div className="space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-zinc-100">{profileData?.Name || "Basat Maqsood"}</h2>
              <h3 className="text-purple-500 text-xl font-medium">{profileData?.job || "Software Engineer"}</h3>
              <p className="text-zinc-400 leading-relaxed text-base italic border-l-2 border-zinc-800 pl-4 py-1">
                &quot;{profileData?.bio || "Hi I am Basat, a Software Engineering student at UET Taxila, passionate about building scalable, user-centric solutions."}&quot;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-lg group hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <User size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">Name</span>
                  <span className="text-zinc-100 font-medium">{profileData?.Name || "Basat Maqsood"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-lg group hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Calendar size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">Age</span>
                  <span className="text-zinc-100 font-medium">{profileData?.age || "21"} Years</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-lg group hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">Location</span>
                  <span className="text-zinc-100 font-medium">{profileData?.citizenship || "Pakistan"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-lg group hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">E-mail</span>
                  <span className="text-zinc-100 font-medium truncate">
                    <a href={`mailto:${profileData?.email || "itzbasatmaqsood@gmail.com"}`} className="hover:text-purple-400 transition-colors">
                      {profileData?.email || "itzbasatmaqsood@gmail.com"}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {profileData?.cv && profileData.cv.length > 0 && (
              <div className="pt-2">
                <a
                  href={profileData.cv?.[0]?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex items-center gap-3 py-3 px-8 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 active:scale-95"
                >
                  <Download size={20} strokeWidth={2.5} />
                  <span className="font-bold tracking-wide">Download CV</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <ExperienceSection />

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-title">
            My <span className="text-purple-500">Certificates</span>
          </h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">{cert.title}</h3>
                  <p className="text-zinc-400">{cert.issued_by}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}
              <SkillsSection skills={skills} />

        <ServicesSection services={services} />

    </>
  )
}
