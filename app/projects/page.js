import { getProjects } from "@/lib/api"
import ProjectsContent from "@/components/ProjectsContent"

export default async function Projects() {
  // Fetch projects data at build time with ISR
  const projects = await getProjects()

  return <ProjectsContent projects={projects} />
}
