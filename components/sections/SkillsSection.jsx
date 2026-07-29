"use client"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { AccentSplit } from "@/components/motion/SplitText"
import Magnetic from "@/components/motion/Magnetic"
import { easeLuxury } from "@/components/motion/variants"

const viewport = { once: true, amount: 0.15, margin: "0px 0px -5% 0px" }

const chipContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
}

const chipItem = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeLuxury },
  },
}

const tileIn = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeLuxury,
      delay: Math.min(i * 0.04, 0.4),
    },
  }),
}

export default function SkillsSection({ skills }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const reduce = useReducedMotion()

  const categories = ["all", ...new Set((skills || []).map((skill) => skill.category))]

  const filteredSkills =
    activeCategory === "all" ? skills || [] : (skills || []).filter((skill) => skill.category === activeCategory)

  const fallbackSkills = [
    { name: "HTML/CSS", category: "Frontend" },
    { name: "JavaScript", category: "Languages" },
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Tailwind CSS", category: "Frontend" },
  ].filter((skill) => activeCategory === "all" || skill.category === activeCategory)

  const displaySkills = filteredSkills.length > 0 ? filteredSkills : fallbackSkills

  return (
    <section className="mb-20" aria-labelledby="skills-heading">
      <AccentSplit before="My" accent="Skills" className="section-title" />

      <LayoutGroup>
        <motion.div
          className="flex flex-wrap gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={chipContainer}
        >
          {categories.map((category) => (
            <motion.div key={category} variants={chipItem}>
              <Magnetic strength={0.3}>
                <button
                  className={`relative px-4 py-2 rounded-full overflow-hidden transition-colors ${
                    activeCategory === category ? "text-brand-foreground" : "bg-surface-elevated text-muted-foreground"
                  }`}
                  onClick={() => setActiveCategory(category)}
                  data-cursor="hover"
                >
                  {activeCategory === category && (
                    <motion.span
                      layoutId="skillChip"
                      className="absolute inset-0 bg-brand-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </button>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" layout>
        <AnimatePresence mode="popLayout">
          {displaySkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${skill.category}`}
              layout
              custom={index}
              variants={reduce ? undefined : tileIn}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={viewport}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            >
              <Magnetic strength={0.18}>
                <div
                  className="relative bg-surface p-4 rounded-lg text-center border border-border/60 hover:border-brand-500/40 hover:bg-surface-elevated/90 transition-colors overflow-hidden group"
                  data-cursor="hover"
                >
                  {!reduce && (
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 0] }}
                      viewport={viewport}
                      transition={{ duration: 0.8, delay: 0.1 + Math.min(index * 0.03, 0.25) }}
                      aria-hidden
                    />
                  )}

                  <span className="relative z-10 block text-brand-500 font-medium">{skill.name}</span>
                  <div className="mx-auto mt-2 mb-1 h-px w-8 bg-brand-500/60" aria-hidden />
                  <p className="relative z-10 text-xs text-muted-foreground mt-1">{skill.category}</p>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
