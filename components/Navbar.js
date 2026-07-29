"use client"
import { Home, Briefcase, FileText, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Magnetic from "@/components/motion/Magnetic"
import { easeLuxury } from "@/components/motion/variants"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { icon: <Home className="nav-icon" />, path: "/", label: "Home" },
    { icon: <Briefcase className="nav-icon" />, path: "/work", label: "Work" },
    { icon: <FileText className="nav-icon" />, path: "/blog", label: "Blog" },
    { icon: <Mail className="nav-icon" />, path: "/contact", label: "Contact" },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4"
      initial={{ y: -80, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: easeLuxury }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="bg-surface/80 backdrop-blur-md px-6 py-3 rounded-xl flex items-center gap-6 md:gap-8 border border-border/60">
        {navItems.map((item) => (
          <Magnetic key={item.path} strength={0.4}>
            <Link
              href={item.path}
              className="relative p-2 rounded-full block"
              aria-label={item.label}
              aria-current={pathname === item.path ? "page" : undefined}
              data-cursor="hover"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.18, y: -3 }}
                animate={pathname === item.path ? { scale: 1.08, y: -1 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 16 }}
              >
                <motion.div
                  className="absolute inset-0 bg-brand-600/15 rounded-full blur-md"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ opacity: 0.35, scale: 1.5 }}
                />
                <span className="sr-only">{item.label}</span>
                {item.icon}
                {pathname === item.path && (
                  <motion.span
                    className="absolute bottom-[-8px] left-0 w-full h-1 bg-brand-500 rounded-full"
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            </Link>
          </Magnetic>
        ))}
      </div>
    </motion.nav>
  )
}
