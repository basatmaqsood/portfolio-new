"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronUp, MessageSquare, Sparkles } from "lucide-react"

export default function ContactSection() {
  // Enhanced animation variants with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.section
      className="mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      aria-labelledby="contact-heading"
    >
      <div className="bg-zinc-900 rounded-2xl p-10 relative overflow-hidden shadow-xl">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-900/30 opacity-80" />

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <motion.div variants={floatingVariants} initial="initial" animate="animate">
            <Sparkles size={40} className="text-purple-400" />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 opacity-10">
          <motion.div variants={floatingVariants} initial="initial" animate="animate" custom={1}>
            <MessageSquare size={60} className="text-purple-400" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <motion.div variants={itemVariants} className="mb-2">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-900/50 text-purple-300 text-sm font-medium mb-3">
              Ready to start?
            </span>
          </motion.div>

          <motion.h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
            variants={itemVariants}
          >
            Let&apos;s create something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              extraordinary together
            </span>
          </motion.h2>

          <motion.p className="text-zinc-400 mb-8 text-lg max-w-lg" variants={itemVariants}>
            Unlock the potential of your product with expert design and development. Let&apos;s build something that not
            only meets your goals but creates lasting impressions with your audience.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/contact">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 
                           text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-purple-900/30
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <span>Let&apos;s Talk</span>
                <ChevronUp size={16} className="transform rotate-45" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Animated corner element */}
        <motion.div
          className="absolute bottom-0 right-0 p-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-900/30"
            whileHover={{
              scale: 1.1,
              rotate: 90,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <ChevronUp size={24} className="text-white" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
 