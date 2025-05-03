"use client"
import { Home, User, Briefcase, FileText, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { icon: <Home className="nav-icon" />, path: "/", label: "Home" },
    { icon: <User className="nav-icon" />, path: "/about", label: "About" },
    { icon: <Briefcase className="nav-icon" />, path: "/projects", label: "Projects" },
    { icon: <FileText className="nav-icon" />, path: "/blog", label: "Blog" },
    { icon: <Mail className="nav-icon" />, path: "/contact", label: "Contact" },
  ]

  // Animation variants for the nav item
  const navItemVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.2,
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    active: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12,
      },
    },
  }

  // Animation variants for the background glow
  const glowVariants = {
    initial: { opacity: 0, scale: 0 },
    hover: {
      opacity: 0.3,
      scale: 1.5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-xl flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="relative p-2 rounded-full"
            aria-label={item.label}
            aria-current={pathname === item.path ? "page" : undefined}
          >
            <motion.div
              className="relative"
              variants={navItemVariants}
              initial="initial"
              whileHover="hover"
              animate={pathname === item.path ? "active" : "initial"}
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
              />
              <span className="sr-only">{item.label}</span>
              {item.icon}
              {/* Active indicator with vertical gap */}
              {pathname === item.path && (
                <motion.span
                  className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-500 rounded-full"
                  layoutId="navIndicator"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}