"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function AboutContent({ profileData, skills, certificates }) {
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

  // Use skills from API or fallback
  const skillsData =
    skills?.length > 0
      ? skills
      : [
          { name: "HTML/CSS", category: "Frontend", level: 95 },
          { name: "JavaScript", category: "Frontend", level: 90 },
          { name: "React.js", category: "Frontend", level: 85 },
          { name: "Next.js", category: "Frontend", level: 80 },
          { name: "UI/UX Design", category: "Frontend", level: 75 },
          { name: "Tailwind CSS", category: "Frontend", level: 90 },
        ]

  // Group skills by category
  const frontendSkills = skillsData.filter((skill) => skill.category === "Frontend")
  const backendSkills = skillsData.filter((skill) => skill.category === "Backend")

  const experiences = [
    {
      company: "Creative Solutions",
      position: "Senior Frontend Developer",
      period: "2021 - Present",
      description:
        "Led frontend development for multiple high-profile clients, implementing responsive designs and optimizing performance.",
    },
    {
      company: "WebTech Agency",
      position: "Frontend Developer",
      period: "2018 - 2021",
      description:
        "Developed and maintained client websites, collaborated with designers to implement pixel-perfect interfaces.",
    },
    {
      company: "Digital Innovations",
      position: "Junior Developer",
      period: "2016 - 2018",
      description: "Assisted in website development, learned modern frontend technologies and best practices.",
    },
  ]

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
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                fill
                className="object-cover"
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

      {/* Skills Section */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="section-title">
          My <span className="text-purple-500">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Skills */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold mb-4">Frontend</h3>
            <motion.div className="space-y-4" variants={staggerContainer}>
              {frontendSkills.map((skill, index) => (
                <motion.div key={index} className="mb-4" variants={fadeInUp}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-purple-500">{skill.level || 85}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || 85}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold mb-4">Backend</h3>
            <motion.div className="space-y-4" variants={staggerContainer}>
              {backendSkills.map((skill, index) => (
                <motion.div key={index} className="mb-4" variants={fadeInUp}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-purple-500">{skill.level || 80}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || 80}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
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

      {/* Experience Section */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="section-title">
          Work <span className="text-purple-500">Experience</span>
        </h2>

        <motion.div className="relative border-l border-zinc-800 pl-8 ml-4" variants={staggerContainer}>
          {experiences.map((exp, index) => (
            <motion.div key={index} className="mb-12 relative" variants={fadeInUp}>
              <div className="absolute -left-12 w-6 h-6 bg-purple-500 rounded-full" />
              <div className="bg-zinc-900 p-6 rounded-lg">
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-500 text-sm rounded-full mb-3">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                <h4 className="text-zinc-400 mb-4">{exp.company}</h4>
                <p className="text-zinc-300">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  )
}
