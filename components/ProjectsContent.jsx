"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsContent({ projects }) {
  const [filter, setFilter] = useState("featured")

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  const sortedData = projects.sort((a, b) => a.sort - b.sort);


  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const filteredProjects = filter === "all" ? sortedData : sortedData.filter((project) => project.category.includes(filter))

  // console.log("Filtered Projects:", filteredProjects)

  return (
    <>
      <motion.section initial="hidden" animate="visible" variants={fadeInUp}>
        <motion.h1 className="text-4xl font-bold mb-6" variants={fadeInUp}>
          My <span className="text-purple-500">Projects</span>
        </motion.h1>

        <motion.div className="flex flex-wrap gap-4 mb-10" variants={fadeInUp}>
        <button
            className={`px-4 py-2 rounded-full ${filter === "featured" ? "bg-purple-600" : "bg-zinc-800"} transition-colors`}
            onClick={() => setFilter("featured")}
          >
            Featured
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === "all" ? "bg-purple-600" : "bg-zinc-800"} transition-colors`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`px-4 py-2 rounded-full ${filter === "live" ? "bg-purple-600" : "bg-zinc-800"} transition-colors`}
            onClick={() => setFilter("live")}
          >
            Live
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === "package" ? "bg-purple-600" : "bg-zinc-800"} transition-colors`}
            onClick={() => setFilter("package")}
          >
            Package
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === "video" ? "bg-purple-600" : "bg-zinc-800"} transition-colors`}
            onClick={() => setFilter("video")}
          >
            Video
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          key={filter}
          variants={staggerContainer}
          initial="hidden"          
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="card overflow-hidden group"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <Link target="_blank" href={`${project.link}`} className="block">
              <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                <Image
                  src={project.cover.url || "/placeholder.svg"}
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
    </>
  )
}
