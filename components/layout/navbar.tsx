"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Menu, X, Sun, Moon } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { useTheme } from "@/hooks/use-theme"
import type { Locale } from "@/types"

const navLinks = [
  { key: "home" as const, href: "/", sectionId: undefined },
  { key: "about" as const, href: "/#about", sectionId: "about" },
  { key: "destinations" as const, href: "/destinations", sectionId: undefined },
  { key: "howItWorks" as const, href: "/#how-it-works", sectionId: "how-it-works" },
  { key: "quiz" as const, href: "/#quiz", sectionId: "quiz" },
  { key: "contact" as const, href: "/contact", sectionId: undefined },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, locale, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleNavClick = (href: string, sectionId?: string) => {
    setMobileOpen(false)
    if (sectionId) {
      if (pathname === "/") {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: "smooth" })
      } else {
        router.push(`/#${sectionId}`)
      }
    } else {
      router.push(href)
    }
  }

  const getLabelForKey = (key: keyof typeof t.nav) => t.nav[key]

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    destinations: t.nav.destinations,
    howItWorks: t.nav.howItWorks,
    quiz: t.nav.quiz,
    contact: t.nav.contact,
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="TimeTravelAgency home">
              <div className="relative">
                <Clock
                  className="w-7 h-7 text-[var(--electric)] group-hover:rotate-12 transition-transform duration-300"
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 w-7 h-7 rounded-full bg-[var(--electric)]/10 group-hover:bg-[var(--electric)]/20 transition-colors duration-300 blur-sm" />
              </div>
              <span className="text-foreground font-semibold text-sm tracking-wide hidden sm:block">
                TimeTravelAgency
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href, link.sectionId)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  {navLabels[link.key]}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Moon className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>

              {/* Language switcher */}
              <div className="flex items-center rounded-lg bg-white/5 border border-border overflow-hidden text-xs font-medium">
                {(["en", "fr"] as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLocale(lang)}
                    className={`px-3 py-1.5 transition-colors duration-200 cursor-pointer ${
                      locale === lang
                        ? "bg-[var(--electric)]/20 text-[var(--electric)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={`Switch to ${lang === "en" ? "English" : "French"}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Sign In */}
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">
                {t.nav.signIn}
              </button>

              {/* Book Journey CTA */}
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium bg-[var(--electric)] text-white rounded-lg hover:bg-[var(--electric)]/90 transition-colors duration-200"
              >
                {t.nav.bookJourney}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t.common.close : t.common.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Clock className="w-6 h-6 text-[var(--electric)]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold">TimeTravelAgency</span>
                </Link>
                <button
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t.common.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.key}
                    onClick={() => handleNavClick(link.href, link.sectionId)}
                    className="text-left px-4 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    {navLabels[link.key]}
                  </motion.button>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="px-6 pb-8 flex flex-col gap-3">
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full py-3 text-sm font-medium text-center border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4" strokeWidth={1.5} />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" strokeWidth={1.5} />
                      Dark Mode
                    </>
                  )}
                </button>

                {/* Language */}
                <div className="flex items-center gap-2">
                  {(["en", "fr"] as Locale[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLocale(lang)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                        locale === lang
                          ? "border-[var(--electric)] bg-[var(--electric)]/10 text-[var(--electric)]"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang === "en" ? "English" : "Français"}
                    </button>
                  ))}
                </div>
                <button className="w-full py-3 text-sm border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors cursor-pointer">
                  {t.nav.signIn}
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 text-sm font-medium text-center bg-[var(--electric)] text-white rounded-xl hover:bg-[var(--electric)]/90 transition-colors"
                >
                  {t.nav.bookJourney}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
