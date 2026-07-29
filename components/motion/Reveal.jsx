"use client"

import { motion, useReducedMotion } from "framer-motion"
import { clipReveal, clipRevealX, blurIn } from "./variants"

const presets = {
  clip: clipReveal,
  clipX: clipRevealX,
  blur: blurIn,
}

export default function Reveal({
  children,
  as = "div",
  variant = "blur",
  className = "",
  delay = 0,
  ...props
}) {
  const reduce = useReducedMotion()
  const Component = motion[as] || motion.div
  const variants = presets[variant] || blurIn

  if (reduce) {
    const Tag = as === "div" ? "div" : as
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {children}
    </Component>
  )
}
