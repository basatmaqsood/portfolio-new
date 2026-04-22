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
            className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1 flex flex-col"
            variants={fadeInUp}
          >
            <Link href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-purple-500 focus:rounded-lg">
              <div className="relative h-52 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800">
                <Image
                  src={project.cover?.url || project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                {project.category && (
                   <div className="absolute top-4 right-4 z-20 bg-zinc-900/90 border border-zinc-700 text-xs font-medium px-3 py-1 rounded-lg text-zinc-300 capitalize">
                      {project.category}
                   </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2 text-zinc-100 group-hover:text-purple-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                
                <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between text-sm">
                    <span className="text-zinc-500 font-medium flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>{project.date || "2024"}</span>
                    <div className="flex items-center text-purple-500 font-medium">
                      <span className="mr-2 group-hover:text-purple-400 transition-colors">View</span>
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
