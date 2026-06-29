"use client"

import { motion } from "framer-motion"
import { Map, Settings, Bot, CheckCircle } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

const stepIcons = [Map, Settings, Bot, CheckCircle]

export function HowItWorks() {
  const { t } = useLocale()

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.60 0.22 295 / 0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--purple-accent)]/30 bg-[var(--purple-accent)]/5 text-[var(--purple-accent)] text-xs font-medium tracking-widest uppercase mb-4">
            {t.howItWorks.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance mb-5">
            {t.howItWorks.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.div
                key={step.number}
                className="relative group"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                {/* Connector line (desktop) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-8px)] w-full h-px bg-[linear-gradient(to_right,var(--border),transparent)] z-0" />
                )}

                <div className="relative p-6 rounded-2xl border border-border bg-card/60 hover:border-white/15 hover:bg-card/80 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-4xl font-bold text-[var(--electric)]/20 leading-none select-none">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center group-hover:bg-[var(--electric)]/15 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[var(--electric)]" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
