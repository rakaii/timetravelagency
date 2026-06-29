"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, AlertTriangle, Sparkles, Timer, DollarSign } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import type { Destination } from "@/types"

const dangerColors: Record<Destination["dangerLevel"], string> = {
  Low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Moderate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  High: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Extreme: "text-red-400 bg-red-400/10 border-red-400/20",
}

interface DestinationCardProps {
  destination: Destination
  index?: number
}

export function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const { t } = useLocale()

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-white/15 transition-all duration-400"
      style={{ ["--hover-shadow" as string]: "0 20px 60px -10px oklch(0 0 0 / 0.5)" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,oklch(0.12_0_0)_100%)]" />

        {/* Era badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-foreground">
            {destination.era}
          </span>
        </div>

        {/* Danger badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border backdrop-blur-sm flex items-center gap-1 ${dangerColors[destination.dangerLevel]}`}>
            <AlertTriangle className="w-3 h-3" />
            {destination.dangerLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-[var(--electric)] transition-colors duration-200">
          {destination.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {destination.shortDescription}
        </p>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] flex-shrink-0" />
            <span className="truncate">{destination.vibe}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Timer className="w-3.5 h-3.5 text-[var(--electric)] flex-shrink-0" />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground col-span-2">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              {t.destinations.from}{" "}
              <span className="text-foreground font-semibold">
                ${destination.price.toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/destinations/${destination.slug}`}
          className="block w-full py-2.5 text-sm font-medium text-center border border-border text-muted-foreground rounded-xl hover:bg-white/5 hover:text-foreground hover:border-white/20 transition-all duration-200"
        >
          {t.destinations.explore}
        </Link>
      </div>
    </motion.article>
  )
}
