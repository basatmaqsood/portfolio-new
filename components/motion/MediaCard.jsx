"use client"

import { motion, useReducedMotion } from "framer-motion"
import { easeLuxury } from "./variants"

const viewport = { once: true, amount: 0.28, margin: "0px 0px -6% 0px" }

const cardShell = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeLuxury,
      when: "beforeChildren",
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
}

const imageMask = (fromRight) => ({
  hidden: {
    clipPath: fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
})

const imageZoom = {
  hidden: { scale: 1.22, filter: "saturate(0.5) brightness(0.65)" },
  visible: {
    scale: 1,
    filter: "saturate(1) brightness(1)",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
}

const curtain = (fromRight) => ({
  hidden: { scaleX: 1 },
  visible: {
    scaleX: 0,
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.04 },
  },
})

const contentBlock = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeLuxury },
  },
}

const titleReveal = {
  hidden: { opacity: 0, y: "115%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const eyebrowIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeLuxury },
  },
}

const footerRise = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeLuxury },
  },
}

const cornerSweep = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: easeLuxury, delay: 0.25 },
  },
}

/**
 * Premium media card: curtain wipe, image settle, title mask, accent draws.
 */
export default function MediaCard({
  index = 0,
  href,
  image,
  badge,
  title,
  description,
  ctaLabel = "View",
  external = true,
  titleAs = "h3",
}) {
  const reduce = useReducedMotion()
  const fromRight = index % 2 === 1
  const TitleTag = titleAs
  const num = String(index + 1).padStart(2, "0")

  if (reduce) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden group flex flex-col hover:border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <div className="relative h-56 w-full overflow-hidden border-b border-zinc-800">
          {image}
        </div>
        <div className="px-5 py-4 flex flex-col gap-2.5">
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
              {badge}
            </span>
          )}
          <TitleTag className="font-bold text-lg text-zinc-100 line-clamp-2 leading-snug">{title}</TitleTag>
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{description}</p>
          <div className="pt-3 mt-1 border-t border-zinc-800/50 flex items-center justify-between">
            <span className="text-purple-500 font-bold tracking-widest uppercase text-[10px]">{ctaLabel}</span>
            <div className="w-7 h-7 bg-zinc-800 flex items-center justify-center text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </a>
    )
  }

  return (
    <motion.article
      className="relative bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden group flex flex-col hover:border-purple-500/40 transition-colors duration-500"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={cardShell}
    >
      <svg
        className="pointer-events-none absolute top-0 left-0 w-10 h-10 z-30 text-purple-500"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <motion.path d="M0 22 V0 H22" stroke="currentColor" strokeWidth="1.5" variants={cornerSweep} />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 right-0 w-10 h-10 z-30 text-purple-500 rotate-180"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <motion.path d="M0 22 V0 H22" stroke="currentColor" strokeWidth="1.5" variants={cornerSweep} />
      </svg>

      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex flex-col focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        data-cursor="hover"
      >
        <div className="relative h-56 w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
          <motion.div
            className="absolute inset-0 z-20 bg-zinc-950"
            style={{ transformOrigin: fromRight ? "right center" : "left center" }}
            variants={curtain(fromRight)}
            aria-hidden
          />

          <motion.div className="absolute inset-0" variants={imageMask(fromRight)}>
            <motion.div className="absolute inset-0" variants={imageZoom}>
              {image}
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 z-[15] bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12"
            initial={{ x: "-130%", opacity: 0 }}
            whileInView={{ x: "240%", opacity: [0, 1, 0] }}
            viewport={viewport}
            transition={{ duration: 1.05, ease: easeLuxury, delay: 0.5 }}
            aria-hidden
          />
        </div>

        <div className="px-5 py-4 flex flex-col relative pl-6 gap-2.5">
          <motion.div
            className="absolute left-0 top-4 bottom-4 w-0.5 bg-purple-500 origin-top"
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: { duration: 0.75, ease: easeLuxury, delay: 0.2 },
              },
            }}
            aria-hidden
          />

          <motion.div className="flex items-center gap-2.5" variants={eyebrowIn}>
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">{num}</span>
            {badge && (
              <>
                <span className="h-px w-4 bg-zinc-700" aria-hidden />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
                  {badge}
                </span>
              </>
            )}
          </motion.div>

          <div className="overflow-hidden">
            <motion.div variants={titleReveal}>
              <TitleTag className="font-bold text-lg leading-snug text-zinc-100 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                {title}
              </TitleTag>
            </motion.div>
          </div>

          <motion.p className="text-zinc-400 text-sm leading-relaxed line-clamp-2" variants={contentBlock}>
            {description}
          </motion.p>

          <motion.div
            className="pt-3 mt-0.5 border-t border-zinc-800/60 flex items-center justify-between gap-3"
            variants={footerRise}
          >
            <span className="text-purple-500 font-bold tracking-[0.18em] uppercase text-[10px] group-hover:text-purple-400 transition-colors">
              {ctaLabel}
            </span>
            <div className="w-7 h-7 rounded-none bg-zinc-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </a>
    </motion.article>
  )
}
