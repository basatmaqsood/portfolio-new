"use client"
import { motion } from "framer-motion"

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer
      className="text-center text-zinc-500 text-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <p>
        Made by <span className="text-purple-500">Basat</span> | Powered by Framer
      </p>
      <div className="flex justify-center gap-2 mt-2">
        <button
          className="text-xs bg-zinc-900 px-2 py-1 rounded hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Copy Email"
          onClick={() => {
            navigator.clipboard.writeText("itzbasatmaqsood@gmail.com")
            alert("Email copied to clipboard!")
          }}
        >
          Copy Email
        </button>
        <a
          href="tel:+921234567890"
          className="text-xs bg-zinc-900 px-2 py-1 rounded hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Call Me"
        >
          Call Me
        </a>
        <a
          href="https://wa.me/921234567890"
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
