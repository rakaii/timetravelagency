"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { destinations } from "@/data/destinations"
import { DestinationCard } from "@/components/ui/destination-card"

export function FeaturedDestinations() {
  const { t } = useLocale()
  const featured = destinations.slice(0, 3)

  return (
    <section id="destinations" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/5 text-[var(--electric)] text-xs font-medium tracking-widest uppercase mb-4">
              {t.destinations.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance mb-3">
              {t.destinations.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              {t.destinations.subtitle}
            </p>
          </div>

          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            {t.destinations.exploreAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
