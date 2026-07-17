export interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  url?: string;
  retired?: boolean;
}

export const projects: Project[] = [
  {
    id: 5,
    name: 'Juice',
    description:
      'A privacy-first macOS menu-bar app that reveals the apps draining your battery, with per-app watt-hour history, charge timelines, and plain-English energy insights.',
    tags: ['macOS', 'SwiftUI', 'Battery Analytics'],
    url: 'https://getjuice.vercel.app/',
  },
  {
    id: 1,
    name: 'TradeMind',
    description:
      "TradeMind is a smart trading journal and analytics platform helping traders boost profitability through automation and behavioral insights. Launched in 2025, it's already serving 1,000+ monthly active users.",
    tags: ['AI Analytics', 'Trading', 'Full Stack'],
    url: 'https://trademind.pro',
  },
  {
    id: 2,
    name: 'PlanGenie',
    description:
      'An AI-powered task management platform built specifically for neurodivergent minds. PlanGenie adapts to your unique thought process, helping break down complex tasks and providing a natural organization flow.',
    tags: ['AI Agent', 'Accessibility', 'Task Management'],
    retired: true,
  },
  {
    id: 3,
    name: 'Tan.ai',
    description:
      'An AI-driven iOS app offering personalized tanning advice using custom-trained models. Currently in beta testing phase with planned release in Summer 2024.',
    tags: ['AI', 'iOS', 'Health & Wellness'],
    retired: true,
  },
  {
    id: 4,
    name: 'Vcrypt Software',
    description:
      'Cloud-based trading algorithms with a Rust backend. Advanced financial technology solutions for modern trading.',
    tags: ['Fintech', 'Rust', 'Trading Algorithms'],
    retired: true,
  },
];
