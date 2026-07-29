"use client"

import { motion, useReducedMotion } from "framer-motion"
import { easeLuxury, staggerFast, wordChild } from "./variants"

export default function SplitText({
  text,
  as = "h2",
  className = "",
  mode = "words",
  delay = 0,
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.h2

  if (reduce || !text) {
    const Static = as
    return <Static className={className}>{text}</Static>
  }

  const parts =
    mode === "chars"
      ? Array.from(text)
      : String(text).split(/(\s+)/).filter(Boolean)

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: mode === "chars" ? 0.02 : 0.06,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) {
          return <span key={`s-${i}`}> </span>
        }
        return (
          <span
            key={`${part}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ perspective: 600 }}
          >
            <motion.span
              className="inline-block"
              variants={wordChild}
              style={{ transformOrigin: "bottom" }}
            >
              {part}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

export function AccentSplit({
  before,
  accent,
  after = "",
  className = "",
  accentClassName = "text-brand-700",
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <h2 className={className}>
        {before} <span className={accentClassName}>{accent}</span>
        {after}
      </h2>
    )
  }

  return (
    <motion.h2
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerFast}
    >
      <span className="inline-block overflow-hidden align-bottom">
        <motion.span className="inline-block" variants={wordChild}>
          {before}
        </motion.span>
      </span>{" "}
      <span className={`inline-block overflow-hidden align-bottom ${accentClassName}`}>
        <motion.span
          className="inline-block"
          variants={wordChild}
          transition={{ duration: 0.75, ease: easeLuxury, delay: 0.08 }}
        >
          {accent}
        </motion.span>
      </span>
      {after}
    </motion.h2>
  )
}
