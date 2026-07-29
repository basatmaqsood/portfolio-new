"use client"

import PageTransition from "@/components/motion/PageTransition"

export default function ClientPageShell({ children }) {
  return <PageTransition>{children}</PageTransition>
}
