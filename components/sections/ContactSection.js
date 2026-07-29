"use client"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ChevronUp, MessageSquare, Sparkles } from "lucide-react"
import Magnetic from "@/components/motion/Magnetic"
import Reveal from "@/components/motion/Reveal"
import { blurIn, childReveal, easeLuxury, staggerContainer } from "@/components/motion/variants"

export default function ContactSection() {
  const reduce = useReducedMotion()

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: reduce ? 0 : [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.section
      className="mb-10"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      aria-labelledby="contact-heading"
    >
      <div className="bg-surface rounded-2xl p-10 relative overflow-hidden shadow-xl">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-brand-900/30 opacity-80"
          animate={
            reduce
              ? undefined
              : {
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="absolute top-10 right-10 opacity-20">
          <motion.div variants={floatingVariants} initial="initial" animate="animate">
            <Sparkles size={40} className="text-brand-700" />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 opacity-10">
          <motion.div variants={floatingVariants} initial="initial" animate="animate">
            <MessageSquare size={60} className="text-brand-700" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.div variants={childReveal} className="mb-2">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-800 text-sm font-medium mb-3">
              Ready to start?
            </span>
          </motion.div>

          <Reveal variant="clip" className="mb-3">
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
              Let&apos;s create something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-800">
                extraordinary together
              </span>
            </h2>
          </Reveal>

          <motion.p className="text-muted-foreground mb-8 text-lg max-w-lg" variants={childReveal}>
            Unlock the potential of your product with expert design and development. Let&apos;s build something that not
            only meets your goals but creates lasting impressions with your audience.
          </motion.p>

          <motion.div variants={childReveal}>
            <Magnetic strength={0.28}>
              <Link href="/contact" data-cursor="hover">
                <motion.span
                  className="inline-flex px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600
                             text-brand-foreground font-medium rounded-lg items-center gap-2 shadow-lg shadow-brand-700/20
                             focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-surface"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 28px rgba(20, 115, 90, 0.28)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                >
                  <span>Let&apos;s Talk</span>
                  <ChevronUp size={16} className="transform rotate-45" aria-hidden="true" />
                </motion.span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 right-0 p-6"
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: easeLuxury }}
        >
          <Magnetic strength={0.45}>
            <motion.a
              href="/contact"
              className="w-14 h-14 bg-gradient-to-tr from-brand-700 to-brand-500 rounded-full flex items-center justify-center shadow-lg shadow-brand-700/25"
              whileHover={{
                scale: 1.12,
                rotate: 90,
                boxShadow: "0 0 24px rgba(20, 115, 90, 0.32)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              data-cursor="hover"
              aria-label="Go to contact"
            >
              <ChevronUp size={24} className="text-brand-foreground" aria-hidden="true" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </motion.section>
  )
}
