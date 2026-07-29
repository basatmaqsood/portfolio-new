"use client"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from "@emailjs/browser"
import SplitText from "@/components/motion/SplitText"
import Reveal from "@/components/motion/Reveal"
import Magnetic from "@/components/motion/Magnetic"
import TiltCard from "@/components/motion/TiltCard"
import { childReveal, staggerContainer } from "@/components/motion/variants"

export default function ContactContent({ profileData, contactInfo }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    "bot-field": "",
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
    setSubmitStatus(null)

    if (formData["bot-field"]) {
      setSubmitStatus("success")
      return
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    try {
      setIsSubmitting(true)
      const recaptchaToken = await recaptchaRef.current?.executeAsync()
      if (!recaptchaToken) throw new Error("reCAPTCHA verification failed")

      const emailData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        "g-recaptcha-response": recaptchaToken,
      }

      await emailjs.send("service_p5vtbeo", "template_h603yi6", emailData, "QMyTR54nwEYUqRZSL")

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "", "bot-field": "" })
      recaptchaRef.current?.reset()
    } catch (error) {
      console.error("Failed to send message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const email = contactInfo?.email || profileData?.email || "me@basatmaqsood.com"
  const phone = contactInfo?.phone || "+923260185306"
  const address = contactInfo?.address || profileData?.address || "Islamabad, Pakistan"

  const contactItems = [
    { icon: <Mail size={18} />, title: "Email", value: email, link: `mailto:${email}` },
    { icon: <Phone size={18} />, title: "Phone", value: phone, link: `tel:${phone}` },
    { icon: <MapPin size={18} />, title: "Location", value: address, link: "#" },
  ]

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <div className="mb-12">
        <SplitText as="h1" text="Contact" className="text-4xl font-bold mb-4 tracking-tight" />
        <Reveal variant="blur">
          <p className="text-muted-foreground">Feel free to reach out for collaborations or inquiries.</p>
        </Reveal>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={staggerContainer}
        style={{ perspective: 900 }}
      >
        {contactItems.map((item, index) => (
          <TiltCard key={index} maxTilt={6} className="rounded-none">
            <a
              href={item.link}
              className="flex items-center gap-4 bg-surface border border-border p-4 rounded-none transition-colors h-full"
              data-cursor="hover"
            >
              <div className="text-brand-500 shrink-0">{item.icon}</div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{item.title}</p>
                <p className="text-sm font-medium text-foreground/90 truncate">{item.value}</p>
              </div>
            </a>
          </TiltCard>
        ))}
      </motion.div>

      <Reveal variant="clip" className="bg-surface border border-border p-8 rounded-none">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="space-y-2" variants={childReveal}>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-surface border border-border rounded-none p-3 text-foreground focus:border-brand-500 outline-none transition-all placeholder:text-foreground/50"
                placeholder="Your name"
                data-cursor="hover"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={childReveal}>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-surface border border-border rounded-none p-3 text-foreground focus:border-brand-500 outline-none transition-all placeholder:text-foreground/50"
                placeholder="Your email"
                data-cursor="hover"
              />
            </motion.div>
          </div>

          <motion.div className="space-y-2" variants={childReveal}>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-border rounded-none p-3 text-foreground focus:border-brand-500 outline-none transition-all placeholder:text-foreground/50"
              placeholder="Subject"
              data-cursor="hover"
            />
          </motion.div>

          <motion.div className="space-y-2" variants={childReveal}>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-surface border border-border rounded-none p-3 text-foreground focus:border-brand-500 outline-none transition-all resize-none placeholder:text-foreground/50"
              placeholder="Your message"
              data-cursor="hover"
            />
          </motion.div>

          <Magnetic strength={0.2}>
            <button
              type="submit"
              className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-brand-foreground font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isSubmitting}
              data-cursor="hover"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Send Message <Send size={14} />
                </>
              )}
            </button>
          </Magnetic>

          <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6LfKRywrAAAAANSTKm347JdHZnKFT8e8yyEzxqV2" />

          {submitStatus === "success" && (
            <p className="text-xs font-bold text-green-500 uppercase tracking-widest">Message sent successfully.</p>
          )}
          {submitStatus === "error" && (
            <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Error sending message.</p>
          )}
        </form>
      </Reveal>
    </motion.section>
  )
}
