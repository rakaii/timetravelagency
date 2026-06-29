"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Bot, User } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

interface Message {
  role: "user" | "assistant"
  content: string
}

const demoResponses: Record<string, string> = {
  "Which destination should I choose?":
    "Based on first-time travelers, I'd recommend Paris 1889 — it offers a perfect blend of luxury, historical significance, and manageable danger level. The Belle Époque atmosphere is truly unmatched. Would you like more details about this destination?",
  "Is the Cretaceous dangerous?":
    "The Cretaceous Period is rated Extreme danger and is only available to Expert-level travelers. You will be accompanied by armed guides in a Temporal Shield Suit at all times. That said, it's our most breathtaking destination — witnessing titanosaurs is life-changing. Shall I walk you through the safety protocols?",
  "What should I wear in Florence?":
    "For Renaissance Florence 1504, we provide a complete period-accurate wardrobe — doublet, hose, and leather boots for gentlemen; elaborate brocade gowns for ladies. You'll also receive a pre-travel Italian language module. Everything is tailored to your measurements before departure.",
  "How much does Paris 1889 cost?":
    "Paris 1889 starts at $12,800 per person for a 7-day journey. This includes period attire, a private temporal guide, authentic Belle Époque accommodation, curated dining experiences, and tickets to the Universal Exposition. Would you like to book a consultation with our concierge team?",
}

// French responses
const demoResponsesFr: Record<string, string> = {
  "Quelle destination choisir ?":
    "Pour les premiers voyageurs, je recommande Paris 1889 — un mélange parfait de luxe, d'importance historique et d'un niveau de danger gérable. L'atmosphère de la Belle Époque est vraiment incomparable. Souhaitez-vous plus de détails ?",
  "Le Crétacé est-il dangereux ?":
    "La période Crétacée est notée danger Extrême et n'est disponible que pour les voyageurs de niveau Expert. Vous serez accompagné de guides armés en Combinaison Bouclier Temporel à tout moment. Voulez-vous que je vous explique les protocoles de sécurité ?",
  "Que porter à Florence ?":
    "Pour Florence de la Renaissance en 1504, nous fournissons une garde-robe complète d'époque — pourpoint, chausses et bottes en cuir pour les messieurs ; des robes en brocart élaborées pour les dames. Vous recevrez également un module de langue italienne avant le départ.",
  "Combien coûte Paris 1889 ?":
    "Paris 1889 commence à 12 800 $ par personne pour un voyage de 7 jours. Cela inclut les tenues d'époque, un guide temporel privé, un hébergement authentique Belle Époque et des expériences gastronomiques. Souhaitez-vous réserver une consultation ?",
}

export function AIPreview() {
  const { t, locale } = useLocale()
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.aiPreview.welcomeMessage },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const responses = locale === "fr" ? demoResponsesFr : demoResponses
  const prompts = locale === "fr"
    ? ["Quelle destination choisir ?", "Le Crétacé est-il dangereux ?", "Que porter à Florence ?", "Combien coûte Paris 1889 ?"]
    : t.aiPreview.suggestedPrompts

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return
    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const found = Object.entries(responses).find(([key]) =>
        text.toLowerCase().includes(key.toLowerCase().slice(0, 15))
      )
      const reply =
        found?.[1] ??
        (locale === "fr"
          ? "Excellente question ! Je suis là pour vous aider à planifier votre voyage temporel parfait. Contactez notre équipe de conciergerie pour une consultation personnalisée."
          : "That's a great question! I'm here to help you plan the perfect temporal journey. Please reach out to our concierge team for a personalized consultation.")
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.22 255 / 0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/5 text-[var(--electric)] text-xs font-medium tracking-widest uppercase mb-6">
              {t.aiPreview.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance mb-5">
              {t.aiPreview.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t.aiPreview.subtitle}
            </p>

            {/* Suggested prompts */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground tracking-wide uppercase mb-1">Try asking:</p>
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl hover:bg-white/5 hover:border-white/15 transition-all duration-200 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: chat */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card/80">
                <div className="w-8 h-8 rounded-full bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[var(--electric)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.aiPreview.assistantName}</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-4 p-5 h-72 overflow-y-auto" aria-live="polite">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-[var(--electric)]/10 border border-[var(--electric)]/20"
                        : "bg-white/10 border border-white/15"
                    }`}>
                      {msg.role === "assistant"
                        ? <Bot className="w-3.5 h-3.5 text-[var(--electric)]" />
                        : <User className="w-3.5 h-3.5 text-foreground" />
                      }
                    </div>
                    {/* Bubble */}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-secondary text-foreground rounded-tl-sm"
                        : "bg-[var(--electric)]/15 border border-[var(--electric)]/20 text-foreground rounded-tr-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-[var(--electric)]" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary text-xs text-muted-foreground italic">
                      {t.common.typing}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-border p-4">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.aiPreview.placeholder}
                    className="flex-1 px-4 py-2.5 text-sm bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--electric)]/40 transition-colors"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 rounded-xl bg-[var(--electric)] text-white flex items-center justify-center hover:bg-[var(--electric)]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                    aria-label={t.common.send}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
