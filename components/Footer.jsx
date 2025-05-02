"use client"
import { motion } from "framer-motion"

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer
      className="text-center text-zinc-500 text-sm mb-4 mt-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <p>
        Made with ❤ by <span className="text-purple-500">Basat Maqsood</span>
      </p>
      <div className="flex justify-center gap-2 mt-2">
        <a href="mailto:itzbasatmaqsood@gmail.com"
                  className="text-xs bg-zinc-900 px-2 py-1 rounded hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Email Me"
        >
          Email Me
        </a>
        <a
          href="tel:+923078776306"
          className="text-xs bg-zinc-900 px-2 py-1 rounded hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Call Me"
        >
          Call Me
        </a>
        <a
          href="https://wa.me/923078776306"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-zinc-900 px-2 py-1 rounded hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Contact on WhatsApp"
        >
          WhatsApp
        </a>
      </div>
    </motion.footer>
  )
}
