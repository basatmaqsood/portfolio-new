"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import SkillsSection from "./sections/SkillsSection"
import ServicesSection from "./sections/ServicesSection"

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


  // Use profile image from API or fallback
  const profileImage =
    imageError || !profileData?.dp2 ? profileData?.dp?.url || "/profile-formal.jpeg" : profileData.dp2.url

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

          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">{profileData?.Name || "Basat Maqsood"}</h2>
            <h3 className="text-purple-500 text-xl mb-4">{profileData?.job || "Frontend Developer"}</h3>
            <p className="text-zinc-400 mb-6">
              {profileData?.bio ||
                "Hi I am Basat, a Frontend developer with a passion for creating beautiful, functional, and user-centered digital experiences. With over 5 years of experience in the field, I am always looking for new and innovative ways to bring my clients' visions to life."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-zinc-400">Name:</p>
                <p className="font-medium">{profileData?.Name || "Basat Maqsood"}</p>
              </div>
              <div>
                <p className="text-zinc-400">Email:</p>
                <p className="font-medium">{profileData?.email || "itzbasatmaqsood@gmail.com"}</p>
              </div>
              <div>
                <p className="text-zinc-400">Age:</p>
                <p className="font-medium">{profileData?.age || "20"}</p>
              </div>
              <div>
                <p className="text-zinc-400">From:</p>
                <p className="font-medium">{profileData?.citizenship || "Pakistan"}</p>
              </div>
            </div>

            {profileData?.cv && profileData.cv.length > 0 && (
              <a
                href={profileData.cv[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button inline-flex"
              >
                Download CV
              </a>
            )}
          </motion.div>
        </div>
      </motion.section>



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
