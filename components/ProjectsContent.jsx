"use client"
import Image from "next/image"
import ExperienceSection from "./sections/ExperienceSection"
import { AccentSplit } from "@/components/motion/SplitText"
import MediaCard from "@/components/motion/MediaCard"

export default function ProjectsContent({ projects }) {
  const sortedData = [...projects].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

  return (
    <>
      <ExperienceSection />

      <section className="mt-16">
        <AccentSplit before="Hobby" accent="Projects" className="text-4xl font-bold mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedData.map((project, index) => (
            <MediaCard
              key={project.id}
              index={index}
              href={project.link || "#"}
              badge={project.category}
              title={project.title}
              description={project.description}
              ctaLabel="Launch Project"
              image={
                <Image
                  src={project.cover?.url || "/placeholder.svg"}
                  alt={project.title}
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
    </>
  )
}
