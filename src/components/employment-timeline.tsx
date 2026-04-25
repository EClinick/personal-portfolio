import React from "react";
import { Timeline } from "./ui/timeline";
import { useMinimalMode } from "../contexts/MinimalModeContext";

interface Job {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
}

const jobs: Job[] = [
  {
    period: "Apr 2025 – Present",
    role: "Software Engineer",
    company: "Seeq Corporation",
    location: "Remote / Seattle, WA",
    description:
      "Led AI integration initiatives across Seeq's platform, including internal Copilot development for data analysis and time series workflows. Enhanced interoperability with Microsoft's ecosystem using custom APIs and AI assistants. Developed backend features using TypeScript, Python, and Gradle in a large-scale monorepo.",
    achievements: [
      "Improved developer productivity by optimizing LLM prompt chains, formatting logic, and retrieval-based agents",
      "Created automated testing frameworks for UI components and backend logic with Playwright and Jest",
    ],
  },
  {
    period: "Nov 2024 – Present",
    role: "Founder",
    company: "PlanGenie",
    location: "Fall City, WA",
    description:
      "Conceptualized and developed an AI-powered task management platform tailored for neurodivergent individuals. Integrated advanced AI models for intelligent task breakdown and scheduling. Designed a user-friendly interface to facilitate natural task creation and organization for individuals with ADHD.",
    achievements: [
      "Developed scalable backend architecture supporting secure user authentication and subscription-based services",
      "Collaborated with neurodivergent communities to ensure the platform meets their unique needs and challenges",
    ],
  },
  {
    period: "Jul 2024 – Present",
    role: "Founder",
    company: "Tan.ai",
    location: "Fall City, WA",
    description:
      "Developed and launched an AI-driven iOS application providing personalized tanning advice. Created a secure, account-free authentication process using UUID-based user identification. Optimized backend architecture through AWS integration, enhancing data security and reducing latency by 25%.",
    achievements: [
      "Implemented a custom-trained AI model for skin tone detection using OpenAI's API",
      "Utilized image analysis techniques to generate data-driven user insights",
    ],
  },
  {
    period: "Jan 2024 – Present",
    role: "Co-founder · President of Algorithms & Analytics",
    company: "Vcrypt Software LLC",
    location: "Corvallis, OR",
    description:
      "Led development of backend systems for financial market data solutions using Rust, Python, and React Native. Integrated Stripe for payments and OAuth for secure authentication. Designed and deployed trading algorithms including long-term, intra-week, and high-frequency strategies.",
    achievements: [
      "Enhanced data processing efficiency by 30% through algorithm optimization",
      "Secured initial funding by demonstrating business acumen and algorithmic performance",
    ],
  },
];

const FullEntry: React.FC<{ job: Job }> = ({ job }) => (
  <div>
    <h4 className="text-white text-lg font-bold mb-1">{job.role}</h4>
    <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">
      {job.company} · {job.location}
    </p>
    <p className="text-gray-400 text-sm font-mono leading-relaxed mb-5">{job.description}</p>
    <div className="space-y-2">
      {job.achievements.map((a, i) => (
        <div key={i} className="flex gap-3 text-gray-500 text-sm font-mono">
          <span className="text-zinc-600 shrink-0">→</span>
          <span>{a}</span>
        </div>
      ))}
    </div>
  </div>
);

const MinimalView: React.FC = () => (
  <div className="w-full bg-black font-sans">
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-6">
      <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
    </div>

    <div className="relative max-w-3xl mx-auto px-6 pb-16">
      {/* Static vertical line */}
      <div className="absolute left-6 top-2 bottom-2 w-px bg-zinc-900" />

      <ul className="space-y-5">
        {jobs.map((job, i) => (
          <li key={i} className="relative pl-10 md:pl-12">
            <div className="absolute left-6 top-2 -translate-x-1/2 h-2 w-2 rounded-full bg-zinc-700 ring-4 ring-black" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div className="font-mono text-sm">
                <span className="text-white font-semibold">{job.role}</span>
                <span className="text-zinc-500"> · {job.company}</span>
              </div>
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest shrink-0">
                {job.period}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export function EmploymentTimeline() {
  const { isMinimal } = useMinimalMode();

  if (isMinimal) {
    return <MinimalView />;
  }

  const data = jobs.map((job) => ({
    title: job.period,
    content: <FullEntry job={job} />,
  }));

  return (
    <div className="w-full bg-black">
      <Timeline data={data} />
    </div>
  );
}
