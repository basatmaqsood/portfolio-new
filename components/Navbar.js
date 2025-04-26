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

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="relative p-2 rounded-full transition-all hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            aria-label={item.label}
            aria-current={pathname === item.path ? "page" : undefined}
          >
            <span className="sr-only">{item.label}</span>
            {item.icon}
            {pathname === item.path && (
              <motion.span
                className="absolute -bottom-2 left-1/2 w-1 h-1 bg-purple-500 rounded-full"
                layoutId="navIndicator"
                aria-hidden="true"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
