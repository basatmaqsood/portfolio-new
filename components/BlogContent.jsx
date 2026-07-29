"use client"
import Image from "next/image"
import { AccentSplit } from "@/components/motion/SplitText"
import MediaCard from "@/components/motion/MediaCard"

export default function BlogContent({ blogPosts }) {
  const sortedData = [...blogPosts].sort((a, b) => {
    return new Date(b.published_at) - new Date(a.published_at)
  })

  return (
    <section>
      <AccentSplit before="My Thoughts &" accent="Perspectives" className="text-4xl font-bold mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedData.map((post, index) => (
          <MediaCard
            key={post.id}
            index={index}
            href={post.link}
            badge="Article"
            title={post.title}
            description={post.description}
            ctaLabel="Read Article"
            titleAs="h2"
            image={
              <Image
                src={post.cover?.url || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            }
          />
        ))}
      </div>
    </section>
  )
}
