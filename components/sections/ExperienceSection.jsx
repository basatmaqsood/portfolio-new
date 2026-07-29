"use client"
import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { AccentSplit } from "@/components/motion/SplitText"
import { childReveal, easeLuxury, staggerContainer } from "@/components/motion/variants"

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
      "Streamlining frontend-backend integration by implementing centralized state management and optimized data-fetching patterns, reducing unnecessary re-renders and API overhead.",
    ],
  },
  {
    id: 2,
    company: "Fiverr",
    role: "Level 1 Seller (Freelance Full Stack Developer)",
    date: "Feb 2025 - Present",
    location: "Remote",
    points: [
      "Successfully delivered 15+ full-stack projects for international clients, maintaining a 100% 5-star rating through transparent communication and technical reliability.",
      "Translated complex client business requirements into functional web solutions, managing the full development lifecycle from database schema design to production deployment.",
    ],
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
      "Engaged in an Agile development environment, contributing to daily stand-ups and sprint retrospectives to ensure consistent project momentum.",
    ],
  },
]

const scrollViewport = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" }

export default function ExperienceSection() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  })

  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="mb-20">
      <AccentSplit before="Professional" accent="Experience" className="section-title" />

      <div className="relative ml-3 md:ml-6 mt-10">
        {/* Track */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-elevated" aria-hidden />

        {/* Scroll-driven fill line */}
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700"
          style={{
            height: "100%",
            scaleY: reduce ? 1 : lineScale,
          }}
          aria-hidden
        />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative pl-8 md:pl-10"
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
            >
              <motion.div
                className="absolute w-4 h-4 bg-surface border-2 border-brand-500 rounded-full -left-[7.5px] top-6 flex items-center justify-center z-10"
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    boxShadow: "0 0 16px 2px rgba(20, 115, 90,0.28)",
                    transition: { type: "spring", stiffness: 280, damping: 16, delay: 0.05 },
                  },
                }}
              >
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              </motion.div>

              <motion.div
                className="bg-surface border border-border rounded-lg p-6 md:p-8 hover:border-border transition-colors duration-300 group"
                variants={childReveal}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5 gap-4 border-b border-border/80 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-brand-700 transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="text-base font-medium text-brand-500 mt-1 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                        <path d="M10 6h4" />
                        <path d="M10 10h4" />
                        <path d="M10 14h4" />
                        <path d="M10 18h4" />
                      </svg>
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <span className="bg-surface-elevated/50 text-muted-foreground border border-border px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap mb-2">
                      {exp.date}
                    </span>
                    <span className="text-muted-foreground text-sm flex items-center gap-1.5 font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      className="text-muted-foreground leading-relaxed text-sm md:text-base flex gap-3"
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.45, ease: easeLuxury, delay: 0.06 * i },
                        },
                      }}
                    >
                      <span className="text-brand-500 mt-1 shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
