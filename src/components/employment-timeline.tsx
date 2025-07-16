import React from "react";
import { Timeline } from "./ui/timeline";
import { ScrollFadeIn } from "./scroll-animations";

export function EmploymentTimeline() {
  const employmentData = [
    {
      title: "April 2025 – Present",
      content: (
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Software Engineer</h4>
            <p className="text-orange-400 font-semibold mb-4">Seeq Corporation • Remote / Seattle, WA</p>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-normal mb-6">
            Led AI integration initiatives across Seeq’s platform, including internal Copilot development for data analysis and time series workflows. Enhanced interoperability with Microsoft’s ecosystem (Teams, Outlook, Azure) using custom APIs and AI assistants. Developed backend features using TypeScript, Python, and Gradle in a large-scale monorepo.
          </p>
          <div className="mb-6">
            <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Improved developer productivity by optimizing LLM prompt chains, formatting logic, and retrieval-based agents</div>
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Created automated testing frameworks for UI components and backend logic with Playwright and Jest</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "November 2024 - Present",
      content: (
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Founder</h4>
            <p className="text-orange-400 font-semibold mb-4">PlanGenie • Fall City, WA</p>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-normal mb-6">
            Conceptualized and developed an AI-powered task management platform tailored for neurodivergent individuals. Integrated advanced AI models for intelligent task breakdown and scheduling. Designed a user-friendly interface to facilitate natural task creation and organization for individuals with ADHD.
          </p>
          <div className="mb-6">
            <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Developed scalable backend architecture supporting secure user authentication and subscription-based services</div>
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Collaborated with neurodivergent communities to ensure the platform meets their unique needs and challenges</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "July 2024 - Present",
      content: (
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Founder</h4>
            <p className="text-orange-400 font-semibold mb-4">Tan.ai • Fall City, WA</p>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-normal mb-6">
            Developed and launched an AI-driven iOS application providing personalized tanning advice. Created a secure, account-free authentication process using UUID-based user identification. Optimized backend architecture through AWS integration, enhancing data security and reducing latency by 25%.
          </p>
          <div className="mb-6">
            <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Implemented a custom-trained AI model for skin tone detection using OpenAI's API</div>
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Utilized image analysis techniques to generate data-driven user insights</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "January 2024 - Present",
      content: (
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Co-founder / President of Algorithms and Analytics</h4>
            <p className="text-orange-400 font-semibold mb-4">Vcrypt Software LLC • Corvallis, OR</p>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-normal mb-6">
            Led the development of backend systems for financial market data solutions using Rust, Python, and React Native. Integrated Stripe for payments and OAuth for secure authentication. Designed and deployed trading algorithms, including long-term, intra-week, and high-frequency strategies.
          </p>
          <div className="mb-6">
            <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Enhanced data processing efficiency by 30% through algorithm optimization</div>
              <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">✅ Secured initial funding by demonstrating business acumen and algorithmic performance</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black">
      <ScrollFadeIn>
        <Timeline data={employmentData} />
      </ScrollFadeIn>
    </div>
  );
}