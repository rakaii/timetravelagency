"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ChevronRight } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export function Hero() {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const titleParts = t.hero.title.split("Through Time")

  const handleScrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient overlay — bottom fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--background)_100%)]" />
        {/* Top fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_15%)]" />
      </motion.div>

      {/* Animated ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.65 0.22 255 / 0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.80 0.14 88 / 0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{ opacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/5 text-[var(--electric)] text-xs font-medium tracking-widest uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric)] animate-pulse" />
          Temporal Journeys — Est. 2031
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-balance leading-none mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {titleParts.length > 1 ? (
            <>
              {titleParts[0]}
              <span className="text-[#d4af37] drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                Through Time
              </span>
              {titleParts[1]}
            </>
          ) : (
            t.hero.title
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium bg-[var(--electric)] text-white rounded-xl hover:bg-[var(--electric)]/90 transition-all duration-200 shadow-[0_0_30px_oklch(0.65_0.22_255_/_0.3)]"
          >
            {t.hero.exploreDestinations}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border border-border text-foreground rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-200"
          >
            {t.hero.bookJourney}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        aria-label={t.hero.scrollToExplore}
      >
        <span className="text-xs tracking-widest uppercase">{t.hero.scrollToExplore}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}
