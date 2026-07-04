import planGenieImage from "../assets/plangenie.jpg"
import tanaiImage from "../assets/tanai.jpeg"
import vcryptImage from "../assets/vcrypt.png"

export interface Project {
  id: number
  name: string
  tech: string
  description: string
  color: string
  image: string
  tags: string[]
  liveUrl?: string
  retired?: boolean
  mockupContent: {
    title: string
    subtitle: string
    interface: string
  }
}

/**
 * Single source of truth for the featured projects. Consumed by both the homepage
 * FeaturedProjects section and the condensed Résumé view so the two never drift.
 */
export const projects: Project[] = [
  {
    id: 1,
    name: "TradeMind",
    tech: "React + TypeScript",
    description: "TradeMind is a smart trading journal and analytics platform helping traders boost profitability through automation and behavioral insights. Launched in 2025, it's already serving 1,000+ monthly active users.",
    color: "from-green-600 via-emerald-700 to-teal-800",
    image: "https://wxvmssqfidodxyoxjtju.supabase.co/storage/v1/object/public/non-protected-route-imgs/Landing-Page/image-dashboard.png",
    tags: ["AI Analytics", "Trading", "Full Stack"],
    liveUrl: "https://trademind.pro",
    mockupContent: {
      title: "TradeMind",
      subtitle: "Smart Trading Journal & Analytics Platform",
      interface: "trading",
    },
  },
  {
    id: 2,
    name: "PlanGenie",
    tech: "React + AI",
    description: "An AI-powered task management platform built specifically for neurodivergent minds. PlanGenie adapts to your unique thought process, helping break down complex tasks and providing a natural organization flow.",
    color: "from-purple-600 via-purple-700 to-indigo-800",
    image: planGenieImage,
    tags: ["AI Agent", "Accessibility", "Task Management"],
    liveUrl: "https://plangenie.net",
    retired: true,
    mockupContent: {
      title: "PlanGenie",
      subtitle: "AI-Powered Task Management for Neurodivergent Minds",
      interface: "productivity",
    },
  },
  {
    id: 3,
    name: "Tan.ai",
    tech: "React Native + AI",
    description: "An AI-driven iOS app offering personalized tanning advice using custom-trained models. Currently in beta testing phase with planned release in Summer 2024.",
    color: "from-orange-600 via-amber-700 to-yellow-800",
    image: tanaiImage,
    tags: ["AI", "iOS", "Health & Wellness"],
    liveUrl: "https://tanai.app/",
    retired: true,
    mockupContent: {
      title: "Tan.ai",
      subtitle: "AI-Powered Personalized Tanning Advice",
      interface: "mobile",
    },
  },
  {
    id: 4,
    name: "Vcrypt Software",
    tech: "Rust",
    description: "Cloud-based trading algorithms with a Rust backend. Advanced financial technology solutions for modern trading.",
    color: "from-blue-600 via-indigo-700 to-purple-800",
    image: vcryptImage,
    tags: ["Fintech", "Rust", "Trading Algorithms"],
    liveUrl: "https://vcryptfinancial.com",
    retired: true,
    mockupContent: {
      title: "Vcrypt Software",
      subtitle: "Cloud-Based Trading Algorithms",
      interface: "trading",
    },
  },
]
