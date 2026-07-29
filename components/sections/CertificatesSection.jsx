"use client"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Award, ExternalLink, BadgeCheck } from "lucide-react"
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
      delay: Math.min(i * 0.08, 0.4),
    },
  }),
}

const iconIn = {
  hidden: { opacity: 0, scale: 0.7, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 },
  },
}

const textIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeLuxury, delay: 0.14 },
  },
}

function getIssuerLabel(issuedBy = "") {
  const raw = issuedBy.replace(/^Issued by:\s*/i, "").trim()
  return raw || issuedBy
}

export default function CertificatesSection({ certificates = [] }) {
  const reduce = useReducedMotion()

  if (!certificates.length) return null

  return (
    <section className="mb-16">
      <AccentSplit before="My" accent="Certificates" className="section-title" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id || index}
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
              transition={{ duration: 0.55, ease: easeLuxury, delay: 0.12 + index * 0.05 }}
              aria-hidden
            />

            <Link
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 pl-2 focus:outline-none"
              data-cursor="hover"
            >
              <motion.div
                className="text-purple-500 mt-0.5 shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors"
                variants={reduce ? undefined : iconIn}
              >
                <Award size={22} strokeWidth={2} aria-hidden />
              </motion.div>

              <motion.div className="min-w-0 flex-1" variants={reduce ? undefined : textIn}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold mb-2 text-zinc-100 group-hover:text-purple-400 transition-colors">
                    {cert.title}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="shrink-0 mt-1 text-zinc-500 group-hover:text-purple-400 transition-colors"
                    aria-hidden
                  />
                </div>

                <div className="w-8 h-px bg-purple-500/70 mb-3" aria-hidden />

                <p className="text-zinc-400 text-sm flex items-center gap-2">
                  <BadgeCheck size={14} className="text-purple-500 shrink-0" aria-hidden />
                  <span>{getIssuerLabel(cert.issued_by)}</span>
                </p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
