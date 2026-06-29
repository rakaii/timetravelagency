"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Thermometer,
  BarChart3,
  Backpack,
  Star,
  Calendar,
  Shield,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useLocale } from "@/hooks/use-locale"
import { destinations } from "@/data/destinations"
import type { Destination } from "@/types"

const dangerConfig: Record<
  Destination["dangerLevel"],
  { color: string; bg: string; border: string; bar: string }
> = {
  Low: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    bar: "bg-emerald-400",
  },
  Moderate: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    bar: "bg-amber-400",
  },
  High: {
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    bar: "bg-orange-400",
  },
  Extreme: {
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    bar: "bg-red-400",
  },
}

const difficultyBar: Record<Destination["difficulty"], number> = {
  Easy: 25,
  Moderate: 50,
  Challenging: 75,
  Expert: 100,
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
      {children}
    </h2>
  )
}

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const { t } = useLocale()
  const destination = destinations.find((d) => d.slug === slug)

  if (!destination) notFound()

  const danger = dangerConfig[destination.dangerLevel]
  const diffPct = difficultyBar[destination.difficulty]

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        {/* Hero image banner */}
        <section className="relative h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.08_0_0/0.35)_0%,oklch(0.08_0_0/0.70)_60%,oklch(0.08_0_0)_100%)]" />

          {/* Back link */}
          <div className="absolute top-6 left-6 z-10">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-sm text-foreground/80 hover:text-foreground hover:bg-black/70 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.common.backToDestinations}
            </Link>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-medium rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-foreground">
                  {destination.era}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-muted-foreground">
                  {destination.period}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-lg border backdrop-blur-sm flex items-center gap-1.5 ${danger.bg} ${danger.border} ${danger.color}`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {destination.dangerLevel}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
                {destination.title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Main content */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SectionTitle>{t.destinationDetail.overview}</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">{destination.description}</p>
                <p className="text-muted-foreground/70 leading-relaxed text-sm border-l-2 border-[var(--electric)]/30 pl-4 italic">
                  {destination.historicalContext}
                </p>
              </motion.section>

              {/* Activities */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SectionTitle>
                  <Star className="w-5 h-5 text-[var(--gold)]" />
                  {t.destinationDetail.activities}
                </SectionTitle>
                <ul className="flex flex-col gap-2">
                  {destination.activities.map((activity, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-white/12 transition-colors duration-200"
                    >
                      <ChevronRight className="w-4 h-4 text-[var(--electric)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{activity}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Equipment */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <SectionTitle>
                  <Backpack className="w-5 h-5 text-[var(--electric)]" />
                  {t.destinationDetail.equipment}
                </SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destination.recommendedEquipment.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric)] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Safety Tips */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SectionTitle>
                  <Shield className="w-5 h-5 text-amber-400" />
                  {t.destinationDetail.safety}
                </SectionTitle>
                <ul className="flex flex-col gap-2">
                  {destination.safetyTips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/10"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Gallery */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <SectionTitle>{t.destinationDetail.gallery}</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {destination.galleryImages.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={src}
                        alt={`${destination.title} gallery ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Right: Sidebar */}
            <aside className="flex flex-col gap-6">
              {/* Booking card */}
              <motion.div
                className="sticky top-24 flex flex-col gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {/* Price + book */}
                <div className="rounded-2xl bg-card border border-border p-6">
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {t.destinationDetail.from}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-foreground">
                        ${destination.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {t.destinationDetail.perPerson}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="block w-full py-3.5 text-center text-sm font-semibold bg-[var(--electric)] text-white rounded-xl hover:bg-[var(--electric)]/90 transition-colors duration-200 mb-3"
                  >
                    {t.destinationDetail.bookNow}
                  </Link>

                  <Link
                    href="/#quiz"
                    className="block w-full py-3 text-center text-sm text-muted-foreground border border-border rounded-xl hover:border-white/20 hover:text-foreground transition-all duration-200"
                  >
                    Not sure? Take the quiz
                  </Link>
                </div>

                {/* Travel info */}
                <div className="rounded-2xl bg-card border border-border p-6 flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                    {t.destinationDetail.travelInfo}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-[var(--electric)]" />
                      {t.destinationDetail.duration}
                    </div>
                    <span className="text-sm font-medium text-foreground">{destination.duration}</span>
                  </div>

                  {/* Climate */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                      <Thermometer className="w-4 h-4 text-[var(--electric)]" />
                      {t.destinationDetail.climate}
                    </div>
                    <span className="text-sm text-muted-foreground text-right leading-snug">
                      {destination.climate}
                    </span>
                  </div>

                  {/* Danger level */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 text-[var(--electric)]" />
                      {t.destinationDetail.dangerLevel}
                    </div>
                    <span className={`text-sm font-medium ${danger.color}`}>
                      {destination.dangerLevel}
                    </span>
                  </div>

                  {/* Difficulty bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BarChart3 className="w-4 h-4 text-[var(--electric)]" />
                        {t.destinationDetail.difficulty}
                      </div>
                      <span className="text-sm font-medium text-foreground">{destination.difficulty}</span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${danger.bar}`}
                        style={{ width: `${diffPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Related destinations */}
                <div className="rounded-2xl bg-card border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
                    Other Destinations
                  </h3>
                  <div className="flex flex-col gap-3">
                    {destinations
                      .filter((d) => d.id !== destination.id)
                      .slice(0, 3)
                      .map((d) => (
                        <Link
                          key={d.id}
                          href={`/destinations/${d.slug}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={d.image}
                              alt={d.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-[var(--electric)] transition-colors duration-200 truncate">
                              {d.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{d.era}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                  <Link
                    href="/destinations"
                    className="mt-4 block text-center text-xs text-[var(--electric)] hover:text-[var(--electric)]/80 transition-colors"
                  >
                    View all destinations
                  </Link>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
