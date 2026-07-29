"use client"

import { memo, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { useIsTouchDevice } from "@/hooks/useMousePosition"

function CustomCursor() {
  const reduce = useReducedMotion()
  const isTouch = useIsTouchDevice()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const dotX = useSpring(rawX, { stiffness: 500, damping: 35, mass: 0.2 })
  const dotY = useSpring(rawY, { stiffness: 500, damping: 35, mass: 0.2 })
  const ringX = useSpring(rawX, { stiffness: 140, damping: 22, mass: 0.35 })
  const ringY = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.35 })

  useEffect(() => {
    if (reduce || isTouch) return

    document.documentElement.classList.add("has-custom-cursor")

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onOver = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const interactive = target.closest(
        'a, button, [data-cursor="hover"], input, textarea, summary, label'
      )
      setHovering(Boolean(interactive))
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseover", onOver)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseover", onOver)
    }
  }, [reduce, isTouch, rawX, rawY])

  if (reduce || isTouch) return null

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 0.5 : 1,
        }}
        aria-hidden
      />
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.65 : 1,
        }}
        aria-hidden
      />
    </>
  )
}

export default memo(CustomCursor)
