"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

const avatarColors = [
  "from-[var(--electric)] to-[var(--purple-accent)]",
  "from-[var(--gold)] to-orange-500",
  "from-emerald-400 to-teal-600",
]

const avatarInitials = ["EB", "MC", "SR"]

export function Testimonials() {
  const { t } = useLocale()

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)] text-xs font-medium tracking-widest uppercase mb-4">
            {t.testimonials.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance mb-5">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <motion.article
              key={item.name}
              className="relative p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-white/15 hover:bg-card/80 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              {/* Quote mark */}
              <div className="absolute top-5 right-6 text-5xl leading-none text-[var(--electric)]/10 font-serif select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 relative z-10">
                &ldquo;{item.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {avatarInitials[i]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.destination}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
