import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { FeaturedDestinations } from "@/components/sections/featured-destinations"
import { HowItWorks } from "@/components/sections/how-it-works"
import { AIPreview } from "@/components/sections/ai-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { Quiz } from "@/components/sections/quiz"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedDestinations />
        <HowItWorks />
        <AIPreview />
        <Testimonials />
        <Quiz />
      </main>
      <Footer />
    </>
  )
}
