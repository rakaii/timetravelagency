import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LocaleProvider } from "@/hooks/use-locale"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TimeTravelAgency — Journey Through History",
  description:
    "Experience history like never before with immersive AI-powered temporal journeys. Step into any era — from prehistoric wilderness to the Renaissance and beyond.",
  generator: "v0.app",
  keywords: ["time travel", "historical tours", "immersive experiences", "luxury travel", "temporal journeys"],
  openGraph: {
    title: "TimeTravelAgency",
    description: "The most extraordinary journeys in human history.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background dark`}>
      <body className="font-sans antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
