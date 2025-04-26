"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function TestimonialsSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const testimonials = [
    {
      id: 1,
      name: "William M.",
      text: "John expertly blends design with functionality, transforming our product into a work user-friendly experience that our customers love!",
      avatar: "/placeholder.svg",
    },
  ]

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="testimonials-heading"
    >
      <h2 id="testimonials-heading" className="section-title">
        What Clients Say <br />
        About My <span className="text-purple-500">Work</span>
      </h2>

      <div className="relative">
        <motion.div className="bg-zinc-900 rounded-lg p-6" variants={fadeInUp}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col">
              <p className="text-zinc-300 mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="font-medium">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="absolute -top-2 -right-2 flex gap-1">
          <button
            className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            aria-label="Previous testimonial"
          >
            <ChevronUp size={18} aria-hidden="true" />
          </button>
          <button
            className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            aria-label="Next testimonial"
          >
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}
