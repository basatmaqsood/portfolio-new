"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import parse from "html-react-parser"

export default function ContactContent({ profileData, contactInfo, socialLinks }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Message sent! (This is a demo)")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
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

  // Use contact info from API or fallback to profile data
  const email = contactInfo?.email || profileData?.email || "itzbasatmaqsood@gmail.com"
  const phone = contactInfo?.phone || "+92 123 456 7890"
  const address = contactInfo?.address || profileData?.address || "Islamabad, Pakistan"

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      title: "Email",
      value: email,
      link: `mailto:${email}`,
    },
    {
      icon: <Phone className="w-5 h-5 text-purple-500" />,
      title: "Phone",
      value: phone,
      link: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: <MapPin className="w-5 h-5 text-purple-500" />,
      title: "Location",
      value: address,
      link: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
    },
  ]

  return (
    <>
      <motion.section initial="hidden" animate="visible" variants={fadeInUp}>
        <motion.h1 className="text-4xl font-bold mb-6" variants={fadeInUp}>
          Get in <span className="text-purple-500">Touch</span>
        </motion.h1>

        <motion.p className="text-zinc-400 mb-10 max-w-2xl" variants={fadeInUp}>
          Feel free to reach out if you want to collaborate with me, or simply have a chat.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-zinc-400">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <motion.div className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Connect with me</h2>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link.startsWith("http") ? social.link : `https://${social.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-3"
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                >
                  <div className="text-purple-500">{parse(social.icon)}</div>
                  <span>{social.title}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div className="bg-zinc-900 p-8 rounded-lg" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-6">Send me a message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-zinc-800 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
              />
            </div>

            <button type="submit" className="cta-button flex items-center gap-2">
              Send Message <Send size={16} />
            </button>
          </form>
        </motion.div>
      </motion.section>
    </>
  )
}
