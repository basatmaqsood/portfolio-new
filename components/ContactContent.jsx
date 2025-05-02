"use client"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import parse from "html-react-parser"
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from "@emailjs/browser"

export default function ContactContent({ profileData, contactInfo, socialLinks }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    "bot-field": "", // Honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const recaptchaRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset status
    setSubmitStatus(null)

    // Honeypot check - if filled, silently reject (bot detected)
    if (formData["bot-field"]) {
      console.warn("Spam bot detected")
      // Fake success to confuse bots
      setSubmitStatus("success")
      return
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    // Message length validation
    if (formData.message.length > 1000) {
      alert("Message is too long. Please limit to 1000 characters.")
      return
    }

    try {
      setIsSubmitting(true)

      // Execute reCAPTCHA
      const recaptchaToken = await recaptchaRef.current?.executeAsync()

      if (!recaptchaToken) {
        throw new Error("reCAPTCHA verification failed")
      }

      // Prepare data for EmailJS
      const emailData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        "g-recaptcha-response": recaptchaToken,
      }

      // Send email via EmailJS
      const res = await emailjs.send(
        "service_p5vtbeo", // Replace with your EmailJS service ID
        "template_h603yi6", // Replace with your EmailJS template ID
        emailData,
        "QMyTR54nwEYUqRZSL", // Replace with your EmailJS public key
      )

      console.log("Email sent successfully:", res)
      setSubmitStatus("success")

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        "bot-field": "",
      })

      // Reset reCAPTCHA
      recaptchaRef.current?.reset()
    } catch (error) {
      console.error("Failed to send message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
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
            {/* Honeypot field - hidden from users but visible to bots */}
            <input
              type="text"
              name="bot-field"
              value={formData["bot-field"]}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

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
                  maxLength={100}
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
                  maxLength={100}
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
                maxLength={150}
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
                maxLength={1000}
              />
              <p className="text-xs text-zinc-500 mt-1">{formData.message.length}/1000 characters</p>
            </div>

            {/* Invisible reCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6LfKRywrAAAAANSTKm347JdHZnKFT8e8yyEzxqV2" // Replace with your reCAPTCHA site key
            />

            <button type="submit" className="cta-button flex items-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {/* Status messages */}
            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/20 text-green-400 rounded-md">
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-500/20 text-red-400 rounded-md">
                Failed to send message. Please try again or contact me directly via email.
              </div>
            )}
          </form>
        </motion.div>
      </motion.section>
    </>
  )
}
