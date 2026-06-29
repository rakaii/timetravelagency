"use client"

import { motion } from "framer-motion"
import { Bot, Globe, User, BookOpen, Star, Shield } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

const featureIcons = [Bot, Globe, User, BookOpen, Star, Shield]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function About() {
  const { t } = useLocale()

  const features = [
    { key: "ai" as const, icon: featureIcons[0] },
    { key: "immersive" as const, icon: featureIcons[1] },
    { key: "personalized" as const, icon: featureIcons[2] },
    { key: "accuracy" as const, icon: featureIcons[3] },
    { key: "premium" as const, icon: featureIcons[4] },
    { key: "safe" as const, icon: featureIcons[5] },
  ]

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)] text-xs font-medium tracking-widest uppercase mb-4">
            {t.about.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance mb-5">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-white/15 hover:bg-card/80 transition-all duration-300 cursor-default"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at top left, oklch(0.65 0.22 255 / 0.04), transparent 60%)" }} />

              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center mb-4 group-hover:bg-[var(--electric)]/15 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[var(--electric)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t.about.features[key].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.features[key].description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
