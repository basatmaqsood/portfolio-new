"use client"
import { motion, useReducedMotion } from "framer-motion"
import {
  Laptop,
  ServerCog,
  Settings,
  ShoppingCart,
  Globe,
  Unplug,
  Layers,
} from "lucide-react"
import { AccentSplit } from "@/components/motion/SplitText"
import { easeLuxury } from "@/components/motion/variants"

const viewport = { once: true, amount: 0.25, margin: "0px 0px -5% 0px" }

const cardIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeLuxury,
      delay: Math.min(i * 0.08, 0.35),
    },
  }),
}

const iconIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.12 },
  },
}

const textIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeLuxury, delay: 0.15 },
  },
}

function getServiceIcon(title = "") {
  const t = title.toLowerCase()
  if (t.includes("front")) return Laptop
  if (t.includes("back")) return ServerCog
  if (t.includes("full") || t.includes("stack")) return Settings
  if (t.includes("commerce") || t.includes("shop")) return ShoppingCart
  if (t.includes("portfolio") || t.includes("personal")) return Globe
  if (t.includes("api")) return Unplug
  return Layers
}

const fallbackServices = [
  {
    title: "Frontend Development",
    description: "Crafting modern, responsive, and visually engaging user interfaces for websites and applications.",
  },
  {
    title: "Backend Development",
    description: "Developing robust and scalable server-side solutions to power your applications effectively.",
  },
]

export default function ServicesSection({ services }) {
  const reduce = useReducedMotion()
  const displayServices = services?.length > 0 ? services : fallbackServices

  return (
    <section className="mb-20" aria-labelledby="services-heading">
      <AccentSplit before="My" accent="Services" className="section-title" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayServices.map((service, index) => {
          const Icon = getServiceIcon(service.title)

          return (
            <motion.div
              key={service.id || index}
              className="group relative bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-purple-500/30 hover:bg-zinc-800/80 transition-colors duration-300 overflow-hidden"
              custom={index}
              variants={reduce ? undefined : cardIn}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={viewport}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-500 origin-top"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={reduce ? undefined : { scaleY: 1 }}
                viewport={viewport}
                transition={{ duration: 0.55, ease: easeLuxury, delay: 0.15 + index * 0.06 }}
                aria-hidden
              />

              <div className="flex items-start gap-4 pl-2">
                <motion.div
                  className="text-purple-500 mt-1 shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors"
                  variants={reduce ? undefined : iconIn}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                >
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </motion.div>

                <motion.div className="min-w-0 flex-1" variants={reduce ? undefined : textIn}>
                  <h3 className="text-xl font-bold mb-2 text-zinc-100">{service.title}</h3>
                  <div className="w-8 h-px bg-purple-500/70 mb-3" aria-hidden />
                  <p className="text-zinc-400 leading-relaxed">{service.description}</p>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
