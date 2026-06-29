"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: ReturnType<typeof getTranslations>
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = localStorage.getItem("tta-locale") as Locale | null
    if (stored === "en" || stored === "fr") {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("tta-locale", newLocale)
  }

  const t = getTranslations(locale)

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
