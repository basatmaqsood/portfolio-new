"use client"

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { useIsTouchDevice } from "@/hooks/useMousePosition"

export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
  as = "div",
  ...props
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const isTouch = useIsTouchDevice()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 })

  const Component = motion[as] || motion.div

  if (reduce || isTouch) {
    const Tag = as === "div" ? "div" : as
    return (
      <Tag className={className} data-cursor="hover" {...props}>
        {children}
      </Tag>
    )
  }

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      {...props}
    >
      {children}
    </Component>
  )
}
