"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Brain, Globe, User, BookOpen, Plane, Shield, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useLocale } from "@/hooks/use-locale"

const featureIcons = {
  ai: Brain,
  immersive: Globe,
  personalized: User,
  accuracy: BookOpen,
  premium: Plane,
  safe: Shield,
}

const teamMembers = [
  {
    name: "Dr. Helena Voss",
    role: "Chief Temporal Officer",
    bio: "Former CERN physicist and Oxford historian. Leads all temporal calibration protocols.",
    image: "/images/hero-bg.png",
  },
  {
    name: "Prof. Amir Khalil",
    role: "Head of Historical Accuracy",
    bio: "PhD in Classical Studies. Ensures every journey reflects authentic historical reality.",
    image: "/images/paris-1889.png",
  },
  {
    name: "Yuki Tanaka",
    role: "AI Systems Director",
    bio: "Former DeepMind researcher. Architected the Chronos AI recommendation engine.",
    image: "/images/edo-japan.png",
  },
]

const stats = [
  { value: "12,400+", label: "Journeys Completed" },
  { value: "47", label: "Historical Eras" },
  { value: "99.97%", label: "Safety Record" },
  { value: "4.98 / 5", label: "Traveler Rating" },
]

export default function AboutPage() {
  const { t } = useLocale()

  const features = [
    { key: "ai" as const, ...t.about.features.ai },
    { key: "immersive" as const, ...t.about.features.immersive },
    { key: "personalized" as const, ...t.about.features.personalized },
    { key: "accuracy" as const, ...t.about.features.accuracy },
    { key: "premium" as const, ...t.about.features.premium },
    { key: "safe" as const, ...t.about.features.safe },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--electric) 0%, transparent 70%)" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/5 text-[var(--electric)] text-xs font-medium tracking-widest uppercase mb-5">
                {t.about.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mb-6">
                {t.about.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                {t.about.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-border bg-card/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ key, title, description }, i) => {
              const Icon = featureIcons[key]
              return (
                <motion.div
                  key={key}
                  className="p-6 rounded-2xl border border-border bg-card/40 hover:border-[var(--electric)]/30 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--electric)]" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">The Minds Behind the Journeys</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our team of physicists, historians, and AI researchers work together to make every journey extraordinary.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="rounded-2xl border border-border bg-card/40 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-0.5">{member.name}</h3>
                  <p className="text-xs text-[var(--electric)] mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-2xl border border-[var(--electric)]/20 bg-[var(--electric)]/5 p-10 lg:p-14 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Ready to Begin Your Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Explore our destinations or speak with a temporal concierge to plan your perfect historical adventure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--electric)] text-background text-sm font-semibold hover:bg-[var(--electric)]/90 transition-colors"
              >
                Explore Destinations
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
