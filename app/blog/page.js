import { getBlogPosts } from "@/lib/api"
import BlogContent from "@/components/BlogContent"

export default async function Blog() {
  // Fetch blog posts data at build time with ISR
  const blogPosts = await getBlogPosts()

  return <BlogContent blogPosts={blogPosts} />
}
