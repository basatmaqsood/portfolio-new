"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function BlogContent({ blogPosts }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }


  const sortedData = blogPosts.sort((a, b) => {
    return new Date(b.publish_date) - new Date(a.publish_date);
  });
  
  

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <motion.section initial="hidden" animate="visible" variants={fadeInUp}>
        <motion.h1 className="text-4xl font-bold mb-6" variants={fadeInUp}>
          My Thoughts and <span className="text-purple-500">Perspectives</span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {sortedData.map((post) => (
            <motion.article key={post.id} className="group" variants={fadeInUp} whileHover={{ y: -5 }}>
              <Link href={`${post.link}`}>
                <div className="relative h-56 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={post.cover.url || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-sm text-xs px-2 py-1 rounded">
                    {post.publish_date}
                  </div>
                  {/* <div className="absolute top-3 right-3 bg-purple-600 text-xs px-2 py-1 rounded">{post.category}</div> */}
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">{post.title}</h2>
                <p className="text-zinc-400">{post.description.substring(0,100)}...<a href={post.link} className="text-purple-500">Read More</a></p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </>
  )
}
