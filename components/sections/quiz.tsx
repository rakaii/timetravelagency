"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, RotateCcw } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { destinations } from "@/data/destinations"
import type { Destination } from "@/types"

// Destination recommendation logic
function getRecommendation(answers: number[]): Destination {
  const [q1, q2, q3, q4] = answers

  // Cultural/Artistic + Renaissance/Prehistoric + Art & Architecture + Museums => Florence
  if ((q1 === 0 || q3 === 2) && q2 === 2) return destinations[1] // Florence
  // Adventure + Prehistoric + Wild Nature + Wildlife => Cretaceous
  if (q1 === 1 || q2 === 3 || q3 === 1 || q4 === 1) return destinations[2] // Cretaceous
  // Historical + Modern History + Political Drama + Historic events => Rome or Apollo
  if (q2 === 0 && q4 === 3) return destinations[5] // Apollo 1969
  if (q2 === 1) return destinations[3] // Rome
  if (q3 === 3) return destinations[3] // Rome
  // Luxury + Belle Époque + Vibrant Cities + Monuments => Paris
  if (q1 === 2 || q3 === 0) return destinations[0] // Paris
  // Serene + Feudal => Edo
  if (q4 === 0 && q2 === 0) return destinations[4] // Edo
  return destinations[0] // Default: Paris
}

export function Quiz() {
  const { t, locale } = useLocale()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<Destination | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const questions = t.quiz.questions
  const isLastQuestion = currentQ === questions.length - 1
  const totalQuestions = questions.length

  const handleSelect = (idx: number) => {
    setSelected(idx)
  }

  const handleNext = () => {
    if (selected === null) return
    const newAnswers = [...answers, selected]

    if (isLastQuestion) {
      setAnswers(newAnswers)
      setResult(getRecommendation(newAnswers))
    } else {
      setAnswers(newAnswers)
      setCurrentQ((q) => q + 1)
      setSelected(null)
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setAnswers([])
    setResult(null)
    setSelected(null)
  }

  const progressPct = ((currentQ) / totalQuestions) * 100

  return (
    <section id="quiz" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)] text-xs font-medium tracking-widest uppercase mb-4">
            {t.quiz.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance mb-4">
            {t.quiz.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {t.quiz.subtitle}
          </p>
        </motion.div>

        {/* Quiz card */}
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="quiz"
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs text-muted-foreground tracking-wide">
                  {t.quiz.question} {currentQ + 1} {t.quiz.of} {totalQuestions}
                </span>
                <span className="text-xs text-[var(--electric)]">
                  {Math.round(((currentQ) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full h-1 bg-secondary rounded-full mb-7 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--electric)] rounded-full"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-5">
                    {questions[currentQ].question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                    {questions[currentQ].options.map((option, i) => (
                      <button
                        key={option}
                        onClick={() => handleSelect(i)}
                        className={`px-4 py-3.5 text-sm text-left rounded-xl border transition-all duration-200 cursor-pointer ${
                          selected === i
                            ? "border-[var(--electric)] bg-[var(--electric)]/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-white/20 hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={selected === null}
                    className="w-full py-3.5 text-sm font-medium bg-[var(--electric)] text-white rounded-xl hover:bg-[var(--electric)]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLastQuestion ? t.quiz.seeResult : t.quiz.next}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="rounded-2xl border border-border bg-card overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Result image */}
              <div className="relative h-48">
                <Image
                  src={result.image}
                  alt={result.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_30%,oklch(0.12_0_0)_100%)]" />
                <div className="absolute bottom-4 left-5">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-foreground">
                    {result.era}
                  </span>
                </div>
              </div>

              {/* Result content */}
              <div className="p-6 sm:p-8">
                <p className="text-xs text-[var(--gold)] tracking-widest uppercase mb-2">{t.quiz.result.subtitle}</p>
                <h3 className="text-2xl font-bold text-foreground mb-2">{result.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{result.shortDescription}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/destinations/${result.slug}`}
                    className="flex-1 py-3 text-sm font-medium text-center bg-[var(--electric)] text-white rounded-xl hover:bg-[var(--electric)]/90 transition-colors"
                  >
                    {t.quiz.result.cta}
                  </Link>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 text-sm font-medium text-center border border-border text-muted-foreground rounded-xl hover:bg-white/5 hover:text-foreground transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t.quiz.tryAgain}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
