import React from "react";
import { Timeline } from "./ui/timeline";

const Entry = ({
  role,
  company,
  description,
  achievements,
}: {
  role: string;
  company: string;
  description: string;
  achievements: string[];
}) => (
  <div className="pb-2">
    <h4 className="text-white text-lg font-bold mb-1">{role}</h4>
    <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">{company}</p>
    <p className="text-gray-400 text-sm font-mono leading-relaxed mb-5">{description}</p>
    <div className="space-y-2">
      {achievements.map((a, i) => (
        <div key={i} className="flex gap-3 text-gray-500 text-sm font-mono">
          <span className="text-zinc-600 shrink-0">→</span>
          <span>{a}</span>
        </div>
      ))}
    </div>
  </div>
);

export function EmploymentTimeline() {
  const employmentData = [
    {
      title: "Apr 2025 – Present",
      content: (
        <Entry
          role="Software Engineer"
          company="Seeq Corporation · Remote / Seattle, WA"
          description="Led AI integration initiatives across Seeq's platform, including internal Copilot development for data analysis and time series workflows. Enhanced interoperability with Microsoft's ecosystem using custom APIs and AI assistants. Developed backend features using TypeScript, Python, and Gradle in a large-scale monorepo."
          achievements={[
            "Improved developer productivity by optimizing LLM prompt chains, formatting logic, and retrieval-based agents",
            "Created automated testing frameworks for UI components and backend logic with Playwright and Jest",
          ]}
        />
      ),
    },
    {
      title: "Nov 2024 – Present",
      content: (
        <Entry
          role="Founder"
          company="PlanGenie · Fall City, WA"
          description="Conceptualized and developed an AI-powered task management platform tailored for neurodivergent individuals. Integrated advanced AI models for intelligent task breakdown and scheduling. Designed a user-friendly interface to facilitate natural task creation and organization for individuals with ADHD."
          achievements={[
            "Developed scalable backend architecture supporting secure user authentication and subscription-based services",
            "Collaborated with neurodivergent communities to ensure the platform meets their unique needs and challenges",
          ]}
        />
      ),
    },
    {
      title: "Jul 2024 – Present",
      content: (
        <Entry
          role="Founder"
          company="Tan.ai · Fall City, WA"
          description="Developed and launched an AI-driven iOS application providing personalized tanning advice. Created a secure, account-free authentication process using UUID-based user identification. Optimized backend architecture through AWS integration, enhancing data security and reducing latency by 25%."
          achievements={[
            "Implemented a custom-trained AI model for skin tone detection using OpenAI's API",
            "Utilized image analysis techniques to generate data-driven user insights",
          ]}
        />
      ),
    },
    {
      title: "Jan 2024 – Present",
      content: (
        <Entry
          role="Co-founder · President of Algorithms & Analytics"
          company="Vcrypt Software LLC · Corvallis, OR"
          description="Led development of backend systems for financial market data solutions using Rust, Python, and React Native. Integrated Stripe for payments and OAuth for secure authentication. Designed and deployed trading algorithms including long-term, intra-week, and high-frequency strategies."
          achievements={[
            "Enhanced data processing efficiency by 30% through algorithm optimization",
            "Secured initial funding by demonstrating business acumen and algorithmic performance",
          ]}
        />
      ),
    },
  ];

  return (
    <div className="w-full bg-black">
      <Timeline data={employmentData} />
    </div>
  );
}
