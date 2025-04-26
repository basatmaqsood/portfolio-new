"use client"
import { memo } from "react"

function Background() {
  // Create an array of 144 elements
  const gridItems = Array.from({ length: 144 }, (_, i) => i)

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-2 p-2 opacity-40">
        {gridItems.map((i) => (
          <div
            key={i}
            className="border border-purple-500/40 rounded-sm transition-colors duration-1000 hover:border-purple-500/70"
          />
        ))}
      </div>

      {/* Gradient Effects */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-cyan-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(Background)
