"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState("all")

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

  // Get unique categories
  const categories = projects
    ? ["all", ...new Set(projects.map((project) => project.category))]
    : ["all", "live", "video", "package"]

  // Filter projects by category
  const filteredProjects = projects
    ? filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter)
    : []

  // Fallback projects if none are provided
  const fallbackProjects = [
    {
      id: 1,
      title: "Revo",
      category: "live",
      description:
        "A modern SaaS planner application with task management, calendar integration, and team collaboration features.",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      id: 2,
      title: "NginAI",
      category: "live",
      description: "A sleek UI/UX template for AI-powered applications with dark mode and customizable components.",
      image: "/placeholder.svg",
      link: "#",
    },
  ].filter((project) => filter === "all" || project.category === filter)

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : fallbackProjects

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="section-title">
        Recent Projects <br />
        and <span className="text-purple-500">Achievements</span>
      </h2>

      <motion.div className="flex flex-wrap gap-4 mb-10" variants={fadeInUp}>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              filter === category ? "bg-purple-600" : "bg-zinc-800"
            } transition-colors`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
        {displayProjects.map((project) => (
          <motion.div
            key={project.id}
            className="card overflow-hidden group"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <Link href={project.link || "#"} target="_blank" rel="noopener noreferrer">
              <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                <Image
                  src={project.cover?.url || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold text-xl mb-1">{project.title}</h3>
              <p className="text-purple-500 text-sm mb-3">{project.category}</p>
              <p className="text-zinc-400">{project.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
