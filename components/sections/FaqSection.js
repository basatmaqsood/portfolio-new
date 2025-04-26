"use client"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function FaqSection() {
  const [activeQuestion, setActiveQuestion] = useState(null)

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

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

  const faqs = [
    {
      id: 1,
      question: "What services do you offer?",
      answer: "I offer web design, frontend development, UI/UX design, and responsive website creation.",
    },
    {
      id: 2,
      question: "What is your design process?",
      answer: "My design process includes discovery, wireframing, design, development, testing, and deployment.",
    },
    {
      id: 3,
      question: "How do you handle project timelines?",
      answer: "I create a detailed project plan with milestones and regular check-ins to ensure timely delivery.",
    },
    {
      id: 4,
      question: "Can you work with existing teams?",
      answer: "Yes, I can collaborate with your existing team members and adapt to your workflow.",
    },
    {
      id: 5,
      question: "What tools do you use?",
      answer: "I use industry-standard tools like Figma, Adobe XD, VS Code, and various frontend frameworks.",
    },
  ]

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="section-title">
        Frequently <br />
        Asked <span className="text-purple-500">Questions</span>
      </h2>

      <motion.div variants={staggerContainer}>
        {faqs.map((faq, index) => (
          <motion.div key={faq.id} className="faq-item" variants={fadeInUp}>
            <button
              className="faq-question"
              onClick={() => toggleQuestion(index)}
              aria-expanded={activeQuestion === index}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <span>{faq.question}</span>
              {activeQuestion === index ? (
                <ChevronUp size={18} aria-hidden="true" />
              ) : (
                <ChevronDown size={18} aria-hidden="true" />
              )}
            </button>
            {activeQuestion === index && (
              <motion.div
                id={`faq-answer-${faq.id}`}
                className="py-3 text-zinc-400"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
