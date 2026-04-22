"use client"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from "@emailjs/browser"

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

      await emailjs.send(
        "service_p5vtbeo",
        "template_h603yi6",
        emailData,
        "QMyTR54nwEYUqRZSL",
      )

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const email = contactInfo?.email || profileData?.email || "itzbasatmaqsood@gmail.com"
  const phone = contactInfo?.phone || "+923260185306"
  const address = contactInfo?.address || profileData?.address || "Islamabad, Pakistan"

  const contactItems = [
    { icon: <Mail size={18} />, title: "Email", value: email, link: `mailto:${email}` },
    { icon: <Phone size={18} />, title: "Phone", value: phone, link: `tel:${phone}` },
    { icon: <MapPin size={18} />, title: "Location", value: address, link: "#" },
  ]

  return (
    <motion.section initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Contact</h1>
        <p className="text-zinc-400">Feel free to reach out for collaborations or inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactItems.map((item, index) => (
          <a key={index} href={item.link} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-none transition-colors">
            <div className="text-purple-500 shrink-0">{item.icon}</div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{item.title}</p>
              <p className="text-sm font-medium text-zinc-200 truncate">{item.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-none">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-zinc-100 focus:border-purple-500 outline-none transition-all placeholder:text-zinc-100/50"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-zinc-100 focus:border-purple-500 outline-none transition-all placeholder:text-zinc-100/50"
                placeholder="Your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-zinc-100 focus:border-purple-500 outline-none transition-all placeholder:text-zinc-100/50"
              placeholder="Subject"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-zinc-100 focus:border-purple-500 outline-none transition-all resize-none placeholder:text-zinc-100/50"
              placeholder="Your message"
            />
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <>Send Message <Send size={14} /></>}
          </button>

          <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6LfKRywrAAAAANSTKm347JdHZnKFT8e8yyEzxqV2" />

          {submitStatus === "success" && <p className="text-xs font-bold text-green-500 uppercase tracking-widest">Message sent successfully.</p>}
          {submitStatus === "error" && <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Error sending message.</p>}
        </form>
      </div>
    </motion.section>
  )
}
