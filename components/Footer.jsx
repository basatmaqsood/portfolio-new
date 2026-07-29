"use client"
import { motion } from "framer-motion"
import Magnetic from "@/components/motion/Magnetic"
import Reveal from "@/components/motion/Reveal"
import { easeLuxury } from "@/components/motion/variants"

export default function Footer() {
  return (
    <footer className="text-center text-muted-foreground text-sm mb-4 mt-4">
      <Reveal variant="blur" className="inline-block">
        <motion.div
          className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-transparent via-brand-500/70 to-transparent origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: easeLuxury }}
        />
        <p>
          Made with ❤ by <span className="text-brand-500">Basat Maqsood</span>
        </p>
      </Reveal>

      <div className="flex justify-center gap-2 mt-2">
        {[
          { href: "mailto:me@basatmaqsood.com", label: "Email Me" },
          { href: "tel:+923078776306", label: "Call Me" },
          { href: "https://wa.me/923078776306", label: "WhatsApp", external: true },
        ].map((item) => (
          <Magnetic key={item.label} strength={0.35}>
            <a
              href={item.href}
              className="text-xs bg-surface px-2 py-1 rounded hover:bg-surface-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 inline-block"
              aria-label={item.label}
              data-cursor="hover"
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </a>
          </Magnetic>
        ))}
      </div>
    </footer>
  )
}
