"use client"

import { motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { easeLuxury } from "./variants"

/**
 * Soft page entrance without AnimatePresence mode="wait".
 * Wait-mode + App Router RSC children can leave the next page stuck at opacity 0
 * (blank screen until hard refresh) — especially on "/".
 */
export default function PageTransition({ children }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className="w-full">{children}</div>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeLuxury }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
