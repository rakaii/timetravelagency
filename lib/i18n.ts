import type { Locale } from "@/types"

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      destinations: "Destinations",
      howItWorks: "How It Works",
      quiz: "Quiz",
      contact: "Contact",
      signIn: "Sign In",
      bookJourney: "Book Journey",
      language: "EN",
    },
    // Hero
    hero: {
      title: "Travel Through Time",
      subtitle:
        "Experience history like never before with immersive temporal journeys. Step into any era—from prehistoric wilderness to the Renaissance and beyond.",
      exploreDestinations: "Explore Destinations",
      bookJourney: "Book Your Journey",
      scrollToExplore: "Scroll to explore",
    },
    // About
    about: {
      badge: "Who We Are",
      title: "The Future of Historical Experience",
      subtitle:
        "TimeTravelAgency combines cutting-edge temporal technology with luxury travel planning to deliver the most extraordinary journeys in human history.",
      features: {
        ai: {
          title: "AI-Powered Recommendations",
          description:
            "Our proprietary AI analyzes your preferences, risk tolerance, and historical interests to craft the perfect temporal itinerary.",
        },
        immersive: {
          title: "Immersive Historical Journeys",
          description:
            "Every detail is meticulously recreated — from period-accurate attire to authentic cuisine and language immersion modules.",
        },
        personalized: {
          title: "Personalized Experiences",
          description:
            "No two journeys are alike. Your private temporal guide adapts each experience to your pace, interests, and desired level of historical engagement.",
        },
        accuracy: {
          title: "Historical Accuracy",
          description:
            "Our team of PhD historians, archaeologists, and cultural experts ensures every aspect of your journey reflects authentic history.",
        },
        premium: {
          title: "Premium Travel Planning",
          description:
            "From temporal calibration to post-journey psychological support, we handle every detail of your extraordinary adventure.",
        },
        safe: {
          title: "Certified Temporal Safety",
          description:
            "Our proprietary Temporal Shield Technology and certified guides ensure your journey adheres to the strictest safety protocols.",
        },
      },
    },
    // Destinations
    destinations: {
      badge: "Featured Destinations",
      title: "Choose Your Era",
      subtitle: "From the Belle Époque to the age of dinosaurs, your perfect journey awaits.",
      exploreAll: "View All Destinations",
      explore: "Explore",
      dangerLevel: "Danger",
      vibe: "Vibe",
      duration: "Duration",
      from: "From",
      era: "Era",
    },
    // How it works
    howItWorks: {
      badge: "The Process",
      title: "Your Journey in Four Steps",
      subtitle: "From first inquiry to temporal departure, we handle every detail.",
      steps: [
        {
          number: "01",
          title: "Choose Your Era",
          description:
            "Browse our curated catalog of historical destinations or let our AI recommend the perfect era based on your interests and personality.",
        },
        {
          number: "02",
          title: "Customize Your Journey",
          description:
            "Work with your personal temporal concierge to tailor every aspect of your trip — duration, activities, accommodation style, and risk level.",
        },
        {
          number: "03",
          title: "Talk with the AI Assistant",
          description:
            "Our intelligent assistant answers all your questions, provides historical briefings, and prepares you mentally and culturally for your journey.",
        },
        {
          number: "04",
          title: "Confirm Your Booking",
          description:
            "Complete your temporal calibration session, receive your period equipment, and step through the portal to your chosen moment in history.",
        },
      ],
    },
    // AI Preview
    aiPreview: {
      badge: "AI Assistant",
      title: "Meet Your Temporal Guide",
      subtitle: "Our AI assistant is available 24/7 to help you plan the perfect journey.",
      placeholder: "Ask anything about your journey...",
      suggestedPrompts: [
        "Which destination should I choose?",
        "Is the Cretaceous dangerous?",
        "What should I wear in Florence?",
        "How much does Paris 1889 cost?",
      ],
      assistantName: "Chronos",
      welcomeMessage:
        "Hello! I'm Chronos, your AI temporal guide. I can help you choose a destination, explain historical periods, advise on packing, or answer any questions about our journeys. Where in time would you like to go?",
    },
    // Testimonials
    testimonials: {
      badge: "Traveler Reviews",
      title: "Voices from Across Time",
      subtitle: "Thousands of travelers have experienced the extraordinary. Here are a few of their stories.",
      items: [
        {
          name: "Eleanor Blackwood",
          destination: "Paris 1889",
          review:
            "Standing at the base of the Eiffel Tower as it was being constructed was an experience beyond words. The Belle Époque Paris felt completely real — the smells, the sounds, the elegance. TimeTravelAgency exceeded every expectation.",
        },
        {
          name: "Dr. Marcus Chen",
          destination: "Florence 1504",
          review:
            "As an art historian, visiting Michelangelo's studio was the culmination of my academic career. The historical accuracy was extraordinary — I even recognized specific techniques I had only read about. Absolutely transformative.",
        },
        {
          name: "Sophia Reinholt",
          destination: "Cretaceous Period",
          review:
            "The Cretaceous exceeded every expectation. Watching a titanosaur herd from the armored vehicle was humbling beyond description. I returned home with a profound new understanding of Earth's history. Unforgettable.",
        },
      ],
    },
    // Quiz
    quiz: {
      badge: "Destination Quiz",
      title: "Find Your Perfect Era",
      subtitle: "Answer four questions and let our AI match you with your ideal historical destination.",
      question: "Question",
      of: "of",
      next: "Next",
      seeResult: "See My Destination",
      tryAgain: "Try Again",
      result: {
        title: "Your Perfect Destination",
        subtitle: "Based on your answers, we recommend:",
        cta: "Book This Journey",
      },
      questions: [
        {
          question: "What type of experience are you looking for?",
          options: ["Cultural & Artistic", "Adventure & Nature", "Luxury & Elegance", "Historical & Educational"],
        },
        {
          question: "Which historical period interests you the most?",
          options: ["Modern History", "Ancient Origins", "Renaissance", "Prehistoric"],
        },
        {
          question: "Which environment do you prefer?",
          options: ["Vibrant Cities", "Wild Nature", "Art & Architecture", "Political Drama"],
        },
        {
          question: "What is your ideal activity?",
          options: ["Visiting monuments", "Observing wildlife", "Exploring museums", "Attending historic events"],
        },
      ],
    },
    // Footer
    footer: {
      tagline: "The most extraordinary journeys in human history.",
      company: {
        title: "Company",
        links: ["About Us", "Careers", "Press", "Partners"],
      },
      destinations: {
        title: "Destinations",
        links: ["Paris 1889", "Florence 1504", "Cretaceous Period", "Ancient Rome", "All Destinations"],
      },
      resources: {
        title: "Resources",
        links: ["Travel Guide", "Safety Protocols", "Historical Briefings", "Equipment Guide"],
      },
      support: {
        title: "Support",
        links: ["Help Center", "Booking Support", "Medical & Safety", "Emergency Contact"],
      },
      newsletter: {
        title: "Newsletter",
        subtitle: "Receive exclusive destination updates and early booking access.",
        placeholder: "Your email address",
        button: "Subscribe",
      },
      social: "Follow Us",
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy",
      },
      copyright: "© 2026 TimeTravelAgency. All rights reserved.",
    },
    // Destinations Page
    destinationsPage: {
      title: "All Destinations",
      subtitle: "Explore every era in our curated catalog of temporal journeys.",
      search: "Search destinations...",
      filters: {
        all: "All Eras",
        belleEpoque: "Belle Époque",
        renaissance: "Renaissance",
        prehistoric: "Prehistoric",
        classical: "Classical Antiquity",
        spaceAge: "Space Age",
        feudal: "Feudal Japan",
      },
      noResults: "No destinations found.",
      bookNow: "Book Now",
      learnMore: "Learn More",
    },
    // Contact Page
    contact: {
      badge: "Get in Touch",
      title: "Plan Your Journey",
      subtitle: "Our temporal concierge team is ready to assist you.",
      form: {
        name: "Full Name",
        email: "Email Address",
        destination: "Preferred Destination",
        message: "Your Message",
        send: "Send Message",
        success: "Your message has been sent. We will contact you within 24 hours.",
        selectDestination: "Select a destination",
      },
      info: {
        email: "concierge@timetravelagency.com",
        phone: "+1 (888) TEMPORAL",
        hours: "Available 24/7 — Across All Time Zones",
      },
    },
    // Destination Detail
    destinationDetail: {
      overview: "Overview",
      travelInfo: "Travel Information",
      equipment: "Recommended Equipment",
      activities: "Activities",
      gallery: "Gallery",
      safety: "Safety Tips",
      bookNow: "Book This Journey",
      climate: "Climate",
      duration: "Duration",
      difficulty: "Difficulty",
      dangerLevel: "Danger Level",
      price: "Starting Price",
      from: "From",
      perPerson: "per person",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred.",
      backToDestinations: "Back to Destinations",
      learnMore: "Learn More",
      close: "Close",
      open: "Open",
      menu: "Menu",
      send: "Send",
      typing: "Chronos is thinking...",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      destinations: "Destinations",
      howItWorks: "Comment Ça Marche",
      quiz: "Quiz",
      contact: "Contact",
      signIn: "Connexion",
      bookJourney: "Réserver",
      language: "FR",
    },
    hero: {
      title: "Voyagez à Travers le Temps",
      subtitle:
        "Vivez l'histoire comme jamais auparavant avec des voyages temporels immersifs. Plongez dans n'importe quelle époque — de la préhistoire à la Renaissance et au-delà.",
      exploreDestinations: "Explorer les Destinations",
      bookJourney: "Réserver Votre Voyage",
      scrollToExplore: "Défiler pour explorer",
    },
    about: {
      badge: "Qui Nous Sommes",
      title: "L'Avenir de l'Expérience Historique",
      subtitle:
        "TimeTravelAgency combine une technologie temporelle de pointe avec une planification de voyage de luxe pour offrir les voyages les plus extraordinaires de l'histoire humaine.",
      features: {
        ai: {
          title: "Recommandations IA",
          description:
            "Notre IA exclusive analyse vos préférences, votre tolérance au risque et vos intérêts historiques pour créer l'itinéraire temporel parfait.",
        },
        immersive: {
          title: "Voyages Historiques Immersifs",
          description:
            "Chaque détail est méticuleusement recréé — des tenues d'époque à la cuisine authentique et aux modules d'immersion linguistique.",
        },
        personalized: {
          title: "Expériences Personnalisées",
          description:
            "Aucun voyage ne se ressemble. Votre guide temporel privé adapte chaque expérience à votre rythme et à vos intérêts.",
        },
        accuracy: {
          title: "Précision Historique",
          description:
            "Notre équipe d'historiens et d'archéologues garantit que chaque aspect de votre voyage reflète l'histoire authentique.",
        },
        premium: {
          title: "Planification de Voyage Premium",
          description:
            "De la calibration temporelle au soutien psychologique post-voyage, nous gérons chaque détail de votre aventure extraordinaire.",
        },
        safe: {
          title: "Sécurité Temporelle Certifiée",
          description:
            "Notre technologie de Bouclier Temporel brevetée et nos guides certifiés garantissent les protocoles de sécurité les plus stricts.",
        },
      },
    },
    destinations: {
      badge: "Destinations Vedettes",
      title: "Choisissez Votre Époque",
      subtitle: "De la Belle Époque à l'ère des dinosaures, votre voyage parfait vous attend.",
      exploreAll: "Voir Toutes les Destinations",
      explore: "Explorer",
      dangerLevel: "Danger",
      vibe: "Ambiance",
      duration: "Durée",
      from: "À partir de",
      era: "Époque",
    },
    howItWorks: {
      badge: "Le Processus",
      title: "Votre Voyage en Quatre Étapes",
      subtitle: "De la première demande au départ temporel, nous gérons chaque détail.",
      steps: [
        {
          number: "01",
          title: "Choisissez Votre Époque",
          description:
            "Parcourez notre catalogue de destinations historiques ou laissez notre IA recommander l'époque parfaite selon vos intérêts.",
        },
        {
          number: "02",
          title: "Personnalisez Votre Voyage",
          description:
            "Travaillez avec votre concierge temporel pour personnaliser chaque aspect — durée, activités, style d'hébergement et niveau de risque.",
        },
        {
          number: "03",
          title: "Parlez à l'Assistant IA",
          description:
            "Notre assistant intelligent répond à toutes vos questions, fournit des briefings historiques et vous prépare culturellement pour votre voyage.",
        },
        {
          number: "04",
          title: "Confirmez Votre Réservation",
          description:
            "Terminez votre session de calibration temporelle, recevez votre équipement d'époque et passez le portail vers le moment choisi.",
        },
      ],
    },
    aiPreview: {
      badge: "Assistant IA",
      title: "Rencontrez Votre Guide Temporel",
      subtitle: "Notre assistant IA est disponible 24h/24 pour vous aider à planifier le voyage parfait.",
      placeholder: "Posez n'importe quelle question sur votre voyage...",
      suggestedPrompts: [
        "Quelle destination choisir ?",
        "Le Crétacé est-il dangereux ?",
        "Que porter à Florence ?",
        "Combien coûte Paris 1889 ?",
      ],
      assistantName: "Chronos",
      welcomeMessage:
        "Bonjour ! Je suis Chronos, votre guide temporel IA. Je peux vous aider à choisir une destination, expliquer les périodes historiques, conseiller sur les bagages ou répondre à toutes vos questions. Où dans le temps souhaitez-vous voyager ?",
    },
    testimonials: {
      badge: "Avis des Voyageurs",
      title: "Voix à Travers le Temps",
      subtitle: "Des milliers de voyageurs ont vécu l'extraordinaire. Voici quelques-unes de leurs histoires.",
      items: [
        {
          name: "Eleanor Blackwood",
          destination: "Paris 1889",
          review:
            "Se tenir à la base de la Tour Eiffel pendant sa construction était une expérience au-delà des mots. Le Paris de la Belle Époque semblait totalement réel — les odeurs, les sons, l'élégance. TimeTravelAgency a dépassé toutes mes attentes.",
        },
        {
          name: "Dr. Marcus Chen",
          destination: "Florence 1504",
          review:
            "En tant qu'historien de l'art, visiter l'atelier de Michel-Ange était le point culminant de ma carrière académique. La précision historique était extraordinaire. Absolument transformateur.",
        },
        {
          name: "Sophia Reinholt",
          destination: "Crétacé",
          review:
            "Le Crétacé a dépassé toutes les attentes. Regarder un troupeau de titanosaures depuis le véhicule blindé était humiliant au-delà de toute description. Inoubliable.",
        },
      ],
    },
    quiz: {
      badge: "Quiz de Destination",
      title: "Trouvez Votre Époque Parfaite",
      subtitle: "Répondez à quatre questions et laissez notre IA vous associer à la destination historique idéale.",
      question: "Question",
      of: "sur",
      next: "Suivant",
      seeResult: "Voir Ma Destination",
      tryAgain: "Recommencer",
      result: {
        title: "Votre Destination Parfaite",
        subtitle: "Selon vos réponses, nous recommandons :",
        cta: "Réserver Ce Voyage",
      },
      questions: [
        {
          question: "Quel type d'expérience recherchez-vous ?",
          options: ["Culturel & Artistique", "Aventure & Nature", "Luxe & Élégance", "Historique & Éducatif"],
        },
        {
          question: "Quelle période historique vous intéresse le plus ?",
          options: ["Histoire Moderne", "Origines Antiques", "Renaissance", "Préhistoire"],
        },
        {
          question: "Quel environnement préférez-vous ?",
          options: ["Villes Animées", "Nature Sauvage", "Art & Architecture", "Drame Politique"],
        },
        {
          question: "Quelle est votre activité idéale ?",
          options: ["Visiter des monuments", "Observer la faune", "Explorer des musées", "Assister à des événements historiques"],
        },
      ],
    },
    footer: {
      tagline: "Les voyages les plus extraordinaires de l'histoire humaine.",
      company: {
        title: "Entreprise",
        links: ["À Propos", "Carrières", "Presse", "Partenaires"],
      },
      destinations: {
        title: "Destinations",
        links: ["Paris 1889", "Florence 1504", "Période Crétacée", "Rome Antique", "Toutes les Destinations"],
      },
      resources: {
        title: "Ressources",
        links: ["Guide de Voyage", "Protocoles de Sécurité", "Briefings Historiques", "Guide d'Équipement"],
      },
      support: {
        title: "Assistance",
        links: ["Centre d'Aide", "Support Réservation", "Médical & Sécurité", "Contact d'Urgence"],
      },
      newsletter: {
        title: "Newsletter",
        subtitle: "Recevez des mises à jour exclusives sur les destinations et un accès anticipé aux réservations.",
        placeholder: "Votre adresse e-mail",
        button: "S'abonner",
      },
      social: "Suivez-Nous",
      legal: {
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation",
        cookies: "Politique de Cookies",
      },
      copyright: "© 2026 TimeTravelAgency. Tous droits réservés.",
    },
    destinationsPage: {
      title: "Toutes les Destinations",
      subtitle: "Explorez chaque époque dans notre catalogue de voyages temporels.",
      search: "Rechercher des destinations...",
      filters: {
        all: "Toutes les Époques",
        belleEpoque: "Belle Époque",
        renaissance: "Renaissance",
        prehistoric: "Préhistoire",
        classical: "Antiquité Classique",
        spaceAge: "Ère Spatiale",
        feudal: "Japon Féodal",
      },
      noResults: "Aucune destination trouvée.",
      bookNow: "Réserver",
      learnMore: "En Savoir Plus",
    },
    contact: {
      badge: "Contactez-Nous",
      title: "Planifiez Votre Voyage",
      subtitle: "Notre équipe de conciergerie temporelle est prête à vous assister.",
      form: {
        name: "Nom Complet",
        email: "Adresse E-mail",
        destination: "Destination Préférée",
        message: "Votre Message",
        send: "Envoyer le Message",
        success: "Votre message a été envoyé. Nous vous contacterons dans les 24 heures.",
        selectDestination: "Sélectionner une destination",
      },
      info: {
        email: "concierge@timetravelagency.com",
        phone: "+1 (888) TEMPORAL",
        hours: "Disponible 24h/24 — Dans tous les fuseaux horaires",
      },
    },
    destinationDetail: {
      overview: "Aperçu",
      travelInfo: "Informations de Voyage",
      equipment: "Équipement Recommandé",
      activities: "Activités",
      gallery: "Galerie",
      safety: "Conseils de Sécurité",
      bookNow: "Réserver Ce Voyage",
      climate: "Climat",
      duration: "Durée",
      difficulty: "Difficulté",
      dangerLevel: "Niveau de Danger",
      price: "Prix de Départ",
      from: "À partir de",
      perPerson: "par personne",
    },
    common: {
      loading: "Chargement...",
      error: "Une erreur s'est produite.",
      backToDestinations: "Retour aux Destinations",
      learnMore: "En Savoir Plus",
      close: "Fermer",
      open: "Ouvrir",
      menu: "Menu",
      send: "Envoyer",
      typing: "Chronos réfléchit...",
    },
  },
}

export type TranslationKey = typeof translations.en

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en
}
