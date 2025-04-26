"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ToolsSection() {
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

  const tools = [
    { id: 1, name: "SiteFlow", category: "Design System", icon: "/placeholder.svg" },
    { id: 2, name: "Pixelo", category: "Design Tool", icon: "/placeholder.svg" },
    { id: 3, name: "JuiceBox", category: "Frontend Compiler", icon: "/placeholder.svg" },
    { id: 4, name: "TaskAI", category: "AI Assistant", icon: "/placeholder.svg" },
    { id: 5, name: "NodeSpace", category: "Headless CMS", icon: "/placeholder.svg" },
    { id: 6, name: "WebCraft", category: "SaaS Framework", icon: "/placeholder.svg" },
  ]

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="tools-heading"
    >
      <h2 id="tools-heading" className="section-title">
        Top-Tier Tools for <br />
        Exceptional <span className="text-purple-500">Results</span>
      </h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={staggerContainer}>
        {tools.map((tool) => (
          <motion.div key={tool.id} className="tool-card" variants={fadeInUp} whileHover={{ y: -3 }}>
            <div className="w-10 h-10 bg-zinc-800 rounded-md flex items-center justify-center">
              <Image src={tool.icon || "/placeholder.svg"} alt={tool.name} width={24} height={24} loading="lazy" />
            </div>
            <div>
              <h3 className="font-medium">{tool.name}</h3>
              <p className="text-zinc-400 text-sm">{tool.category}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
