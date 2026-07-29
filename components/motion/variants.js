/** Shared cinematic motion tokens */

export const easeLuxury = [0.22, 1, 0.36, 1]

export const springSoft = { type: "spring", stiffness: 120, damping: 18 }
export const springSnappy = { type: "spring", stiffness: 320, damping: 22 }

export const viewportOnce = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" }

/** Soft entrance — reliable on refresh / mount */
export const clipReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeLuxury },
  },
}

export const clipRevealX = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeLuxury },
  },
}

export const blurIn = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeLuxury },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

export const childReveal = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeLuxury },
  },
}

export const wordChild = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: easeLuxury },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeLuxury },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.22, ease: easeLuxury },
  },
}
