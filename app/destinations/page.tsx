"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { DestinationCard } from "@/components/ui/destination-card"
import { useLocale } from "@/hooks/use-locale"
import { destinations } from "@/data/destinations"

const filters = [
  { key: "all", eras: null },
  { key: "belleEpoque", eras: ["Belle Époque"] },
  { key: "renaissance", eras: ["Renaissance"] },
  { key: "prehistoric", eras: ["Prehistoric"] },
  { key: "classical", eras: ["Classical Antiquity"] },
  { key: "spaceAge", eras: ["Space Age"] },
  { key: "feudal", eras: ["Edo Period"] },
] as const

export default function DestinationsPage() {
  const { t } = useLocale()
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filtered = useMemo(() => {
    const filterDef = filters.find((f) => f.key === activeFilter)
    return destinations.filter((d) => {
      const matchesSearch =
        search === "" ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.era.toLowerCase().includes(search.toLowerCase()) ||
        d.shortDescription.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        !filterDef?.eras || filterDef.eras.includes(d.era as never)
      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  const filterLabels: Record<string, string> = {
    all: t.destinationsPage.filters.all,
    belleEpoque: t.destinationsPage.filters.belleEpoque,
    renaissance: t.destinationsPage.filters.renaissance,
    prehistoric: t.destinationsPage.filters.prehistoric,
    classical: t.destinationsPage.filters.classical,
    spaceAge: t.destinationsPage.filters.spaceAge,
    feudal: t.destinationsPage.filters.feudal,
  }

  return (
    <>
      <main className="pt-20">
        {/* Header */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
              style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, oklch(0.65 0.22 255 / 0.06) 0%, transparent 70%)" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/5 text-[var(--electric)] text-xs font-medium tracking-widest uppercase mb-5">
                {destinations.length} {t.destinationsPage.title.split(" ")[0]}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mb-4">
                {t.destinationsPage.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                {t.destinationsPage.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.destinationsPage.search}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--electric)]/40 transition-colors"
              />
            </div>
          </motion.div>

          {/* Filter chips */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 cursor-pointer ${
                  activeFilter === f.key
                    ? "border-[var(--electric)] bg-[var(--electric)]/10 text-[var(--electric)]"
                    : "border-border text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                {filterLabels[f.key]}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <motion.div
              className="text-center py-20 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t.destinationsPage.noResults}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
