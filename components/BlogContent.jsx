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
    return new Date(b.published_at) - new Date(a.published_at);
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
        <motion.h1 className="text-4xl font-bold mb-10" variants={fadeInUp}>
          My Thoughts & <span className="text-purple-500">Perspectives</span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {sortedData.map((post) => (
            <motion.article 
              key={post.id} 
              className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden group transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1 flex flex-col"
              variants={fadeInUp}
            >
              <Link href={`${post.link}`} target="_blank" className="block h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-purple-500 focus:rounded-none">
                <div className="relative h-60 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800 rounded-none">
                  <Image
                    src={post.cover?.url || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-zinc-900/90 border border-zinc-700 text-xs font-bold px-4 py-1.5 rounded-none text-zinc-100 uppercase tracking-tighter transition-colors group-hover:bg-purple-600 group-hover:border-purple-500">
                    Article
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-bold text-2xl mb-3 text-zinc-100 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">{post.title}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-zinc-800/50 flex items-center justify-between text-sm">
                      <div className="text-zinc-500 font-bold flex items-center gap-2 tracking-tighter uppercase">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        {post.published_at?.split('T')[0] || post.published_at}
                      </div>
                      <div className="flex items-center text-purple-500 font-bold tracking-widest uppercase text-[10px]">
                        <span className="mr-3 group-hover:text-purple-400 transition-colors">Read Article</span>
                        <div className="w-8 h-8 rounded-none bg-zinc-800 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                      </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </>
  )
}
