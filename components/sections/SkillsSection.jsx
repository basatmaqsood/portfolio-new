"use client"
import { motion } from "framer-motion"
import { useState } from "react"

export default function SkillsSection({ skills }) {
  const [activeCategory, setActiveCategory] = useState("all")

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
  const categories = ["all", ...new Set(skills.map((skill) => skill.category))]
  
  // Filter skills by category
  const filteredSkills =  activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory)

  // Fallback skills if none are provided
  const fallbackSkills = [
    { name: "HTML/CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Tailwind CSS", category: "Frontend" },
  ].filter((skill) => activeCategory === "all" || skill.category === activeCategory)

  const displaySkills = filteredSkills.length > 0 ? filteredSkills : fallbackSkills

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="section-title">
        My <span className="text-purple-500">Skills</span>
      </h2>

      <motion.div className="flex flex-wrap gap-4 mb-10" variants={fadeInUp}>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category ? "bg-purple-600" : "bg-zinc-800"
            } transition-colors`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" variants={staggerContainer}   initial="hidden"
  animate="visible">
        {displaySkills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-zinc-900 p-4 rounded-lg text-center hover:bg-zinc-800 transition-colors"
            variants={fadeInUp}
            whileHover={{ y: -3 }}
          >
            <span className="text-purple-500 font-medium">{skill.name}</span>
            <p className="text-xs text-zinc-400 mt-1">{skill.category}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
