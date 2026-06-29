"use client"

import Link from "next/link"
import { useState } from "react"
import { Clock, Share2, Rss, Send, Hash } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export function Footer() {
  const { t } = useLocale()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  const footerSections = [
    {
      title: t.footer.company.title,
      links: t.footer.company.links,
      hrefs: ["/about", "/about", "/about", "/about"],
    },
    {
      title: t.footer.destinations.title,
      links: t.footer.destinations.links,
      hrefs: [
        "/destinations/paris-1889",
        "/destinations/florence-1504",
        "/destinations/cretaceous-period",
        "/destinations/ancient-rome-44bc",
        "/destinations",
      ],
    },
    {
      title: t.footer.resources.title,
      links: t.footer.resources.links,
      hrefs: ["/contact", "/contact", "/contact", "/contact"],
    },
    {
      title: t.footer.support.title,
      links: t.footer.support.links,
      hrefs: ["/contact", "/contact", "/contact", "/contact"],
    },
  ]

  const socialLinks = [
    { icon: Share2, href: "#", label: "X / Twitter" },
    { icon: Hash, href: "#", label: "Instagram" },
    { icon: Rss, href: "#", label: "YouTube" },
    { icon: Send, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <Clock
                className="w-7 h-7 text-[var(--electric)] group-hover:rotate-12 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <span className="text-foreground font-semibold text-sm tracking-wide">TimeTravelAgency</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.tagline}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-[var(--electric)] hover:border-[var(--electric)]/30 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">{section.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link, i) => (
                    <li key={link}>
                      <Link
                        href={section.hrefs[i] ?? "#"}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-2 tracking-wide">
              {t.footer.newsletter.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {t.footer.newsletter.subtitle}
            </p>
            {subscribed ? (
              <p className="text-xs text-[var(--electric)]">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter.placeholder}
                  className="w-full px-3 py-2.5 text-sm bg-white/5 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--electric)]/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-medium bg-[var(--electric)]/10 text-[var(--electric)] border border-[var(--electric)]/20 rounded-lg hover:bg-[var(--electric)]/20 transition-colors"
                >
                  {t.footer.newsletter.button}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            {[
              { label: t.footer.legal.privacy, href: "#" },
              { label: t.footer.legal.terms, href: "#" },
              { label: t.footer.legal.cookies, href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
