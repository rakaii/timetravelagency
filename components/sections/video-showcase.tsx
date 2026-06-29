"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export function VideoShowcase() {
  const { t } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.65_0.22_255_/_0.08)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Experience Time Travel
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch as our travelers journey across centuries, experiencing moments that shaped history.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative group rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-auto display-block bg-black"
            poster="/images/hero-bg.png"
            controls
            playsInline
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-video_rBryHB5B-S4TC8isdcJQjjCLgh8ahtMsq50lo2B.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric)]/0 to-[var(--electric)]/0 group-hover:from-[var(--electric)]/10 group-hover:to-[var(--electric)]/5 transition-all duration-300 pointer-events-none" />

          {/* Play button overlay (when paused) */}
          {!isPlaying && (
            <motion.button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center z-10 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--electric)] text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </motion.button>
          )}
        </motion.div>

        {/* Info text */}
        <motion.div
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-6 sm:gap-8 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">4K Quality</h3>
            <p className="text-sm text-muted-foreground">Crystal clear footage captured from our most immersive temporal expeditions.</p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Expert Curated</h3>
            <p className="text-sm text-muted-foreground">Every frame selected by our team of historical consultants and cinematographers.</p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Immersive Soundscape</h3>
            <p className="text-sm text-muted-foreground">Experience authentic audio from historical periods reconstructed by sound engineers.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
