"use client"

import { motion, useReducedMotion } from "framer-motion"
import { blurIn } from "./variants"

export default function TiltCard({
  children,
  className = "",
  maxTilt,
  reveal = true,
  as = "div",
  ...props
}) {
  const reduce = useReducedMotion()
  const Component = motion[as] || motion.div

  return (
    <Component
      className={`group relative ${className}`}
      initial={reveal && !reduce ? "hidden" : false}
      animate={reveal && !reduce ? "visible" : undefined}
      variants={reveal && !reduce ? blurIn : undefined}
      data-cursor="hover"
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  )
}
