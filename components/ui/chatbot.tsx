"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { destinations } from "@/data/destinations"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

// Simple keyword-based response engine (no backend needed)
function getResponse(input: string, locale: "en" | "fr"): string {
  const q = input.toLowerCase()

  const isFr = locale === "fr"

  // Destination-specific
  if (q.includes("paris") || q.includes("belle epoque") || q.includes("belle époque")) {
    return isFr
      ? "Paris 1889 est notre destination la plus prisée ! Vous assisterez à la construction de la Tour Eiffel lors de l'Exposition Universelle. À partir de 12 800 $ par personne, c'est 7 jours de splendeur Belle Époque. Niveau de danger : Faible."
      : "Paris 1889 is our most beloved destination! You'll witness the Eiffel Tower under construction during the World's Fair. Starting at $12,800 per person, it's 7 days of Belle Époque splendor. Danger level: Low — perfect for first-time travelers."
  }

  if (q.includes("florence") || q.includes("renaissance") || q.includes("michelangelo")) {
    return isFr
      ? "Florence 1504 vous plonge au cœur de la Renaissance. Vous assisterez à l'inauguration du David de Michel-Ange et visiterez les ateliers des plus grands artistes. 10 jours à partir de 15 500 $. Niveau de danger : Modéré."
      : "Florence 1504 places you at the heart of the Renaissance. You'll witness Michelangelo's David unveiled and visit the workshops of history's greatest artists. 10 days from $15,500. Danger level: Moderate — some political tensions exist."
  }

  if (q.includes("cretaceous") || q.includes("dinosaur") || q.includes("prehistoric") || q.includes("crétacé") || q.includes("dinosaure")) {
    return isFr
      ? "Le Crétacé est notre destination la plus extrême ! Vous observerez des troupeaux de titanosaures depuis des véhicules blindés et assisterez à des éruptions volcaniques. 5 jours à partir de 28 000 $. Niveau de danger : EXTRÊME — réservé aux voyageurs expérimentés."
      : "The Cretaceous is our most extreme adventure! You'll observe titanosaur herds from armored vehicles and witness volcanic eruptions. 5 days from $28,000. Danger level: EXTREME — reserved for experienced travelers only."
  }

  if (q.includes("rome") || q.includes("caesar") || q.includes("roman") || q.includes("césar") || q.includes("romain")) {
    return isFr
      ? "La Rome Antique en 44 av. J.-C. vous emmène au cœur de la chute de la République romaine. Assistez aux débats du Sénat et explorez le Forum Romanum. 8 jours à partir de 19 200 $. Niveau de danger : Élevé."
      : "Ancient Rome 44 BC places you at the dramatic fall of the Roman Republic. Attend Senate debates, explore the Forum Romanum. 8 days from $19,200. Danger level: High — political violence is a real risk, but our guides ensure your safety."
  }

  if (q.includes("edo") || q.includes("japan") || q.includes("samurai") || q.includes("japon")) {
    return isFr
      ? "Edo Japon 1603 vous immerge dans la culture des samouraïs à l'aube du Shogunat Tokugawa. Cérémonie du thé, théâtre kabuki, entraînement des samouraïs. 9 jours à partir de 17 400 $. Niveau de danger : Modéré."
      : "Edo Japan 1603 immerses you in samurai culture at the dawn of the Tokugawa Shogunate. Tea ceremonies, kabuki theater, samurai training observation. 9 days from $17,400. Danger level: Moderate."
  }

  if (q.includes("apollo") || q.includes("moon") || q.includes("1969") || q.includes("nasa") || q.includes("lune")) {
    return isFr
      ? "Apollo 11 en 1969 vous place dans la salle de contrôle de mission pendant que Neil Armstrong marche sur la Lune. Notre destination la plus courte et la plus abordable — 3 jours à partir de 9 600 $. Niveau de danger : Faible."
      : "Apollo 11, 1969 places you in Mission Control as Neil Armstrong walks on the Moon. Our shortest and most affordable destination — 3 days from $9,600. Danger level: Low."
  }

  // Price / cost questions
  if (q.includes("price") || q.includes("cost") || q.includes("how much") || q.includes("expensive") || q.includes("prix") || q.includes("combien") || q.includes("coût")) {
    return isFr
      ? "Nos destinations varient de 9 600 $ (Apollo 11) à 28 000 $ (Crétacé). Voici un aperçu :\n• Apollo 11 : 9 600 $\n• Paris 1889 : 12 800 $\n• Florence 1504 : 15 500 $\n• Edo Japon : 17 400 $\n• Rome Antique : 19 200 $\n• Crétacé : 28 000 $\n\nTous les tarifs incluent les équipements d'époque, les guides et la calibration temporelle."
      : "Our destinations range from $9,600 (Apollo 11) to $28,000 (Cretaceous). Here's a quick overview:\n• Apollo 11: $9,600\n• Paris 1889: $12,800\n• Florence 1504: $15,500\n• Edo Japan: $17,400\n• Ancient Rome: $19,200\n• Cretaceous: $28,000\n\nAll prices include period-accurate equipment, private guides, and temporal calibration."
  }

  // Safety / danger questions
  if (q.includes("safe") || q.includes("danger") || q.includes("dangerous") || q.includes("risk") || q.includes("sécurité") || q.includes("risque")) {
    return isFr
      ? "La sécurité est notre priorité absolue ! Chaque voyage utilise notre technologie Temporal Shield et des guides certifiés. Les niveaux de danger varient :\n• Faible : Paris 1889, Apollo 11\n• Modéré : Florence 1504, Edo Japon\n• Élevé : Rome Antique\n• Extrême : Crétacé\n\nNous n'avons jamais perdu un voyageur en 15 ans d'exploitation."
      : "Safety is our absolute priority! Every journey uses our proprietary Temporal Shield Technology and certified guides. Danger levels range from Low (Paris, Apollo 11) to Extreme (Cretaceous). We maintain a 100% safe return record across 15 years of operation."
  }

  // What to wear / packing
  if (q.includes("wear") || q.includes("pack") || q.includes("cloth") || q.includes("equipment") || q.includes("porter") || q.includes("vêtement") || q.includes("équipement")) {
    return isFr
      ? "Tout votre équipement d'époque est fourni ! Tenues, accessoires, monnaie de l'époque et modules linguistiques sont inclus dans votre forfait. Vous n'avez besoin d'apporter que vos effets personnels modernes. Pour le Crétacé, une combinaison Temporal Shield obligatoire est fournie."
      : "All period-accurate equipment is provided! Attire, accessories, period currency, and language modules are all included. You only need to bring modern personal items. For the Cretaceous, a mandatory Temporal Shield Suit is provided."
  }

  // Recommendation / which destination
  if (q.includes("recommend") || q.includes("which") || q.includes("best") || q.includes("suggest") || q.includes("recommand") || q.includes("quel") || q.includes("meilleur")) {
    return isFr
      ? "Ça dépend de vos intérêts ! Je vous recommande :\n• Pour les amateurs d'art et de culture : Florence 1504\n• Pour la romance et l'élégance : Paris 1889\n• Pour l'aventure extrême : Crétacé\n• Pour l'histoire politique : Rome Antique\n• Pour la sérénité : Edo Japon\n• Pour l'histoire moderne : Apollo 11\n\nVoulez-vous passer notre quiz de destination pour une recommandation personnalisée ?"
      : "It depends on your interests! My recommendations:\n• Art & culture lovers: Florence 1504\n• Romance & elegance: Paris 1889\n• Extreme adventure: Cretaceous Period\n• Political drama: Ancient Rome\n• Serenity & culture: Edo Japan\n• Modern history: Apollo 11\n\nWould you like to take our destination quiz for a personalized recommendation?"
  }

  // Booking
  if (q.includes("book") || q.includes("reserv") || q.includes("réserv") || q.includes("purchase") || q.includes("buy")) {
    return isFr
      ? "Pour réserver votre voyage, rendez-vous sur notre page Contact et notre équipe de conciergerie vous contactera dans les 24 heures. Nous personnaliserons chaque détail de votre voyage temporel !"
      : "To book your journey, visit our Contact page and our concierge team will reach out within 24 hours. We'll work with you to customize every detail of your temporal adventure!"
  }

  // Greeting
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("bonjour") || q.includes("salut")) {
    return isFr
      ? "Bonjour ! Je suis Chronos, votre guide temporel IA. Je peux vous aider à choisir une destination, expliquer les périodes historiques, conseiller sur l'équipement ou répondre à toutes vos questions. Où dans le temps souhaitez-vous voyager ?"
      : "Hello! I'm Chronos, your AI temporal guide. I can help you choose a destination, explain historical periods, advise on equipment, or answer any questions. Where in time would you like to go?"
  }

  // How does it work
  if (q.includes("how") || q.includes("work") || q.includes("process") || q.includes("comment") || q.includes("fonctionne")) {
    return isFr
      ? "Voici comment fonctionne un voyage avec TimeTravelAgency :\n1. Choisissez votre destination\n2. Personnalisez avec notre concierge\n3. Session de calibration temporelle\n4. Équipez-vous de votre matériel d'époque\n5. Passez le portail temporel !\n\nNous gérons chaque détail — des tenues aux points d'extraction d'urgence."
      : "Here's how a TimeTravelAgency journey works:\n1. Choose your destination\n2. Customize with your personal concierge\n3. Temporal calibration session\n4. Equip with period-accurate gear\n5. Step through the temporal portal!\n\nWe handle every detail — from attire to emergency extraction points."
  }

  // Default
  return isFr
    ? "C'est une excellente question ! Pour des informations plus détaillées, je vous recommande de visiter notre page Destinations ou de contacter directement notre équipe de conciergerie. Puis-je vous aider avec autre chose — le choix d'une destination, les tarifs, ou les questions de sécurité ?"
    : "That's a great question! For more detailed information, I recommend visiting our Destinations page or contacting our concierge team directly. Can I help you with anything else — choosing a destination, pricing, safety, or equipment?"
}

export function Chatbot() {
  const { t, locale } = useLocale()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message when opened for first time
  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true)
      const welcome: Message = {
        id: "welcome",
        role: "assistant",
        content: t.aiPreview.welcomeMessage,
      }
      setMessages([welcome])
    }
  }, [open, initialized, t.aiPreview.welcomeMessage])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600))

    const responseText = getResponse(trimmed, locale)
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: responseText,
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMsg])
  }, [input, isTyping, locale])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handlePrompt = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="chat-button"
              onClick={() => setOpen(true)}
              className="relative w-14 h-14 rounded-full bg-[var(--electric)] text-white shadow-lg shadow-[var(--electric)]/30 hover:bg-[var(--electric)]/90 transition-colors duration-200 flex items-center justify-center cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              aria-label="Open chat assistant"
            >
              <MessageCircle className="w-6 h-6" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-[var(--electric)]/50 animate-ping" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-panel"
              className="absolute bottom-0 right-0 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/50"
              style={{ height: "520px" }}
              initial={{ scale: 0.85, opacity: 0, y: 20, transformOrigin: "bottom right" }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-[var(--electric)]/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--electric)]/15 border border-[var(--electric)]/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[var(--electric)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.aiPreview.assistantName}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label={t.common.close}
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label={t.common.close}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--electric)]/10 border border-[var(--electric)]/20 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-[var(--electric)]" />
                    </div>
                    <p className="text-sm text-muted-foreground">Starting conversation...</p>
                  </div>
                )}

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        msg.role === "assistant"
                          ? "bg-[var(--electric)]/15 border border-[var(--electric)]/30"
                          : "bg-white/8 border border-white/15"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Bot className="w-3.5 h-3.5 text-[var(--electric)]" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-foreground/70" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                        msg.role === "assistant"
                          ? "bg-muted text-muted-foreground rounded-tl-sm"
                          : "bg-[var(--electric)]/15 text-foreground border border-[var(--electric)]/20 rounded-tr-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="flex gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-[var(--electric)]/15 border border-[var(--electric)]/30 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-[var(--electric)]" />
                      </div>
                      <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-muted flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Suggested prompts */}
              {messages.length <= 1 && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                  {t.aiPreview.suggestedPrompts.slice(0, 3).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handlePrompt(prompt)}
                      className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground hover:border-[var(--electric)]/40 hover:text-[var(--electric)] transition-colors duration-200 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 pt-1 border-t border-border">
                <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 border border-border focus-within:border-[var(--electric)]/40 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.aiPreview.placeholder}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                    disabled={isTyping}
                    aria-label="Chat input"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-7 h-7 rounded-lg bg-[var(--electric)] text-white flex items-center justify-center hover:bg-[var(--electric)]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer flex-shrink-0"
                    aria-label={t.common.send}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
