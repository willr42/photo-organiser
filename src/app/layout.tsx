import type { Metadata } from "next"
import "./globals.css"
import { MetadataProvider } from "@/lib/providers"

export const metadata: Metadata = {
  title: "Photo Organiser",
  description: "Organise your photo's metadata.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MetadataProvider>{children}</MetadataProvider>
      </body>
    </html>
  )
}
