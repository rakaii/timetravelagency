export type Locale = "en" | "fr"

export interface Destination {
  id: string
  slug: string
  title: string
  era: string
  period: string
  shortDescription: string
  description: string
  historicalContext: string
  image: string
  galleryImages: string[]
  dangerLevel: "Low" | "Moderate" | "High" | "Extreme"
  vibe: string
  duration: string
  price: number
  climate: string
  difficulty: "Easy" | "Moderate" | "Challenging" | "Expert"
  recommendedEquipment: string[]
  activities: string[]
  safetyTips: string[]
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  stars: number
  destination: string
  review: string
  reviewFr: string
}

export interface QuizQuestion {
  id: number
  question: string
  questionFr: string
  options: { label: string; labelFr: string; value: string }[]
}

export interface NavItem {
  label: string
  labelFr: string
  href: string
  isSection?: boolean
}
