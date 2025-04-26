"use client"
import { motion } from "framer-motion"
import parse from "html-react-parser"

export default function ServicesSection({ services }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Fallback if no services are provided
  const fallbackServices = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-laptop"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>',
      title: "Frontend Development",
      description: "Crafting modern, responsive, and visually engaging user interfaces for websites and applications.",
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-server-cog"><path d="m10.852 14.772-.383.923"/><path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923"/><path d="m13.148 9.228.383-.923"/><path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544"/><path d="m14.772 10.852.923-.383"/><path d="m14.772 13.148.923.383"/><path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"/><path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"/><path d="M6 18h.01"/><path d="M6 6h.01"/><path d="m9.228 10.852-.923-.383"/><path d="m9.228 13.148-.923.383"/></svg>',
      title: "Backend Development",
      description: "Developing robust and scalable server-side solutions to power your applications effectively.",
    },
  ]

  const displayServices = services?.length > 0 ? services : fallbackServices

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="services-heading"
    >
      <h2 id="services-heading" className="section-title">
        My <span className="text-purple-500">Services</span>
      </h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
        {displayServices.map((service, index) => (
          <motion.div
            key={index}
            className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start gap-4">
              <div className="text-purple-500 mt-1">{parse(service.icon)}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-zinc-400">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
