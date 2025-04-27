import { getBlogPosts } from "@/lib/api"
import BlogContent from "@/components/BlogContent"

export const metadata = {
  title: "Basat Maqsood - Software Engineer - Blogs",
  description:
    "Software Engineer | Full Stack Web Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
  keywords:
    "Basat Maqsood, Software Engineer, Full Stack Developer, MERN Stack, Web Development, Responsive Web Applications",
  authors: [{ name: "Basat Maqsood", url: "https://basatmaqsood.com" }],
  creator: "Basat Maqsood",
  openGraph: {
    title: "Basat Maqsood - Software Engineer",
    description:
      "Software Engineer | Full Stack Web Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
    url: "https://basatmaqsood.com",
    siteName: "Basat Maqsood",
    images: [
      {
        url: "https://res.cloudinary.com/dr7askqqy/image/upload/v1745730051/og_527f46ac1e.png",
        width: 1200,
        height: 630,
        alt: "Basat Maqsood - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basat Maqsood - Software Engineer",
    description:
      "Software Engineer | Full Stack Web Developer | Expertise in MERN Stack. Passionate about building Responsive Web applications and solving complex business problems.",
    images: ["https://res.cloudinary.com/dr7askqqy/image/upload/v1745730051/og_527f46ac1e.png"],
    creator: "@basatmaqsood",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  generator: "v0.dev",
};

export default async function Blog() {
  // Fetch blog posts data at build time with ISR
  const blogPosts = await getBlogPosts()

  return <BlogContent blogPosts={blogPosts} />
}
