"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function BlogSection({ blogPosts }) {
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

  // Fallback blog posts if none are provided
  const fallbackBlogPosts = [
    {
      id: 1,
      title: "Starting and Growing a Career in Web Design",
      date: "Apr 9, 2023",
      image: "/placeholder.svg",
      excerpt:
        "Learn the essential steps to kickstart your career in web design and how to grow your skills over time.",
      category: "Career",
    },
    {
      id: 2,
      title: "Create a Landing Page That Performs Great!",
      date: "Mar 15, 2023",
      image: "/placeholder.svg",
      excerpt: "Discover the key elements that make landing pages convert visitors into customers effectively.",
      category: "Design",
    },
  ]

  const displayBlogPosts = blogPosts?.length > 0 ? blogPosts : fallbackBlogPosts

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      aria-labelledby="blog-heading"
    >
      <h2 id="blog-heading" className="section-title">
        Design Thoughts <br />
        and <span className="text-purple-500">Perspectives</span>
      </h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
        {displayBlogPosts.map((post) => (
          <motion.article key={post.id} className="group" variants={fadeInUp} whileHover={{ y: -5 }}>
            <Link href={post.link || `#`} target="_blank" rel="noopener noreferrer">
              <div className="relative h-48 mb-3 overflow-hidden rounded-md">
                <Image
                  src={post.cover?.url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-sm text-xs px-2 py-1 rounded">
                  {post.publish_date || "Recent"}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">{post.title}</h3>
              <p className="text-zinc-400">{post.description?.substring(0, 120)}...</p>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  )
}
