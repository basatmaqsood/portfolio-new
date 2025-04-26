"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronUp } from "lucide-react"

export default function ContactSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      className="mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="contact-heading"
    >
      <div className="bg-zinc-900 rounded-lg p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 id="contact-heading" className="text-2xl font-bold mb-2">
            Let&apos;s <br />
            <span className="text-purple-500">collaborate</span>
          </h2>
          <p className="text-zinc-400 mb-6 max-w-md">
            Unlock the potential of your product with expert design and development. Let&apos;s create something that
            not only meets your goals but also delights your users.
          </p>
          <Link
            href="/contact"
            className="cta-button inline-flex focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Let&apos;s Talk
          </Link>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <ChevronUp size={18} aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
