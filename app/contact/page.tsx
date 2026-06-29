"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Clock, ChevronRight, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useLocale } from "@/hooks/use-locale"
import { destinations } from "@/data/destinations"

export default function ContactPage() {
  const { t } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    destination: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const c = t.contact

  const infoItems = [
    { icon: Mail, label: "Email", value: c.info.email },
    { icon: Phone, label: "Phone", value: c.info.phone },
    { icon: Clock, label: "Availability", value: c.info.hours },
  ]

  const inputClass =
    "w-full px-4 py-3 text-sm bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--electric)]/50 transition-colors duration-200"

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.65 0.22 255 / 0.07) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/5 text-[var(--electric)] text-xs font-medium tracking-widest uppercase mb-5">
                {c.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mb-4">
                {c.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                {c.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Info */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {/* Contact info cards */}
              <div className="flex flex-col gap-4">
                {infoItems.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[var(--electric)]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                        {label}
                      </p>
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why contact us */}
              <div className="rounded-2xl border border-[var(--electric)]/20 bg-[var(--electric)]/5 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  What happens next?
                </h3>
                <ul className="flex flex-col gap-3">
                  {[
                    "A dedicated temporal concierge contacts you within 24 hours",
                    "We build a personalized itinerary based on your preferences",
                    "You receive a full temporal calibration briefing",
                    "Confirm your booking and step through the portal",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-xs font-semibold text-[var(--electric)] bg-[var(--electric)]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div className="rounded-2xl border border-border bg-card/40 p-8">
                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Message Sent</h3>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                      {c.form.success}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: "", email: "", destination: "", message: "" })
                      }}
                      className="mt-2 text-sm text-[var(--electric)] hover:text-[var(--electric)]/80 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="name"
                          className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
                        >
                          {c.form.name}
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="email"
                          className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
                        >
                          {c.form.email}
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="destination"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
                      >
                        {c.form.destination}
                      </label>
                      <select
                        id="destination"
                        name="destination"
                        value={form.destination}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{c.form.selectDestination}</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.title}
                          </option>
                        ))}
                        <option value="unsure">Not sure yet — help me choose</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
                      >
                        {c.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your ideal journey, travel dates, group size, or any questions..."
                        rows={5}
                        className={`${inputClass} resize-none`}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold bg-[var(--electric)] text-background hover:bg-[var(--electric)]/90 transition-colors duration-200"
                    >
                      {c.form.send}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
