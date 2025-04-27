"use client"

import { useRef, useEffect, useState, useCallback, memo } from "react"

function ParticleBackground() {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef([])
  const animationFrameRef = useRef(0)
  const mouseRef = useRef({ x: null, y: null, radius: 150 })

  // Updated colors to gray and purple dark tones
  const colors = ["#4B5563", "#6B7280", "#4A3F6B", "#2D3748", "#5B21B6", "#4C1D95"]

  // Initialize particles
  const initParticles = useCallback(() => {
    if (!dimensions.width || !dimensions.height) return

    const particles = []
    const particleCount = Math.floor((dimensions.width * dimensions.height) / 10000)

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random() * 3 + 1
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: depth * 1.5,
        baseSize: depth * 1.5, // Store original size for hover effect
        speedX: (Math.random() - 0.5) * (0.2 * depth),
        speedY: (Math.random() - 0.5) * (0.2 * depth),
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.1 + Math.random() * 0.4,
        baseOpacity: 0.1 + Math.random() * 0.4, // Store original opacity for hover effect
        depth,
        // Add properties for hover effect
        originalX: 0,
        originalY: 0,
        isHovered: false,
      })
    }

    particlesRef.current = particles
  }, [dimensions])

  // Draw particles on canvas
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

      // Use hex opacity format
      const opacityHex = Math.floor(particle.opacity * 255)
        .toString(16)
        .padStart(2, "0")

      ctx.fillStyle = particle.color + opacityHex
      ctx.fill()
    })
  }, [])

  // Update particle positions with hover effect
  const updateParticles = useCallback(() => {
    if (!dimensions.width || !dimensions.height) return

    particlesRef.current = particlesRef.current.map((particle) => {
      // Store original position if not already stored
      if (particle.originalX === 0) {
        particle.originalX = particle.x
        particle.originalY = particle.y
      }

      // Update position
      let x = particle.x + particle.speedX
      let y = particle.y + particle.speedY

      // Bounce off edges
      if (x < 0 || x > dimensions.width) {
        particle.speedX *= -1
        x = x < 0 ? 0 : dimensions.width
      }

      if (y < 0 || y > dimensions.height) {
        particle.speedY *= -1
        y = y < 0 ? 0 : dimensions.height
      }

      // Handle mouse interaction
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const dx = mouseRef.current.x - x
        const dy = mouseRef.current.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Check if particle is within mouse radius
        if (distance < mouseRef.current.radius) {
          // Calculate repulsion force (stronger when closer)
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius

          // Apply repulsion
          const angle = Math.atan2(dy, dx)
          const repulsionX = Math.cos(angle) * force * -5 // Increase for stronger effect
          const repulsionY = Math.sin(angle) * force * -5

          // Apply repulsion to speed
          particle.speedX += repulsionX * 0.2
          particle.speedY += repulsionY * 0.2

          // Limit max speed during repulsion
          const maxSpeed = 2 * particle.depth
          particle.speedX = Math.max(Math.min(particle.speedX, maxSpeed), -maxSpeed)
          particle.speedY = Math.max(Math.min(particle.speedY, maxSpeed), -maxSpeed)

          // Visual hover effects
          particle.size = particle.baseSize * (1 + force * 0.5)
          particle.opacity = particle.baseOpacity * (1 + force * 0.5)
          particle.isHovered = true
        } else if (particle.isHovered) {
          // Gradually return to original state
          particle.size = particle.baseSize + (particle.size - particle.baseSize) * 0.9
          particle.opacity = particle.baseOpacity + (particle.opacity - particle.baseOpacity) * 0.9

          if (Math.abs(particle.size - particle.baseSize) < 0.1) {
            particle.isHovered = false
            particle.size = particle.baseSize
            particle.opacity = particle.baseOpacity
          }
        }
      }

      // Occasionally change direction slightly for more natural movement
      if (Math.random() < 0.01) {
        particle.speedX += (Math.random() - 0.5) * 0.1
        particle.speedY += (Math.random() - 0.5) * 0.1

        // Limit max speed
        const maxSpeed = 0.5 * particle.depth
        particle.speedX = Math.max(Math.min(particle.speedX, maxSpeed), -maxSpeed)
        particle.speedY = Math.max(Math.min(particle.speedY, maxSpeed), -maxSpeed)
      }

      return {
        ...particle,
        x,
        y,
      }
    })
  }, [dimensions])

  // Animation loop
  const animate = useCallback(() => {
    updateParticles()
    drawParticles()
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        })
        canvasRef.current.width = clientWidth
        canvasRef.current.height = clientHeight
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Initialize particles when dimensions change
  useEffect(() => {
    initParticles()
  }, [dimensions, initParticles])

  // Start animation
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate])

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Gradient Effects */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-gray-800/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ParticleBackground)
