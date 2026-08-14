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
            <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Senior Software Engineer</h4>
            <p className="text-orange-400 font-semibold mb-4">Seeq Corporation • Remote / Seattle, WA</p>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-normal mb-6">
            AI engineer on Seeq Intelligence, building the AI agent platform and assistant experiences that ship inside Seeq’s Industrial AI products — plus the internal AI tooling that helps the org build and support features faster.
          </p>
          <div className="mb-6">
            <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start text-gray-300 text-sm md:text-base"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" /><span>Built and scaled Agent Builder, Seeq’s visual workflow canvas for turning expert industrial workflows into reusable AI agents; enabled users to compose multi-step analyses, connect Seeq context and Data Lab tools, reuse workflow templates, and operationalize repeatable decision-support processes inside Seeq Intelligence.</span></div>
              <div className="flex gap-2.5 items-start text-gray-300 text-sm md:text-base"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" /><span>Redesigned Seeq’s AI Assistant and shared Intelligence experience, making Agent Q more useful in real industrial workflows by giving it persistent user context, the ability to ask clarifying questions, and support for PDFs, images, and CSVs as inputs so users can get grounded answers from their own data and documents.</span></div>
              <div className="flex gap-2.5 items-start text-gray-300 text-sm md:text-base"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" /><span>Built internal AI engineering agents and automations that help Seeq developers investigate PRs, broken builds, vulnerabilities, support tickets, and product bugs faster, improving engineering velocity and reliability for customer-facing AI features.</span></div>
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
            Led the development of backend systems for financial market data solutions using Rust and Python. Integrated Stripe for payments and OAuth for secure authentication. Designed and deployed trading algorithms, including long-term, intra-week, and high-frequency strategies.
          </p>
          <div className="mb-6">
            <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
            <div className="space-y-2">
              <div className="flex gap-2.5 items-start text-gray-300 text-sm md:text-base"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" /><span>Enhanced data processing efficiency by 30% through algorithm optimization</span></div>
              <div className="flex gap-2.5 items-start text-gray-300 text-sm md:text-base"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" /><span>Secured initial funding by demonstrating business acumen and algorithmic performance</span></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-black py-16 md:py-24">
      <ScrollFadeIn>
        <Timeline data={employmentData} />
      </ScrollFadeIn>
    </div>
  );
}