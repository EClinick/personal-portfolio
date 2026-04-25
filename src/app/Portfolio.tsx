import React, { useState } from 'react'
import FeaturedProjects from "../components/featured-projects"
import { EmploymentTimeline } from "../components/employment-timeline"
import profileImage from '../assets/profile.jpg';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import GitHubContributionGraph from '../components/github-contribution-graph';
import { ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLeetcode, SiTryhackme } from 'react-icons/si';

const socialLinks = [
  {
    label: 'Twitter',
    icon: <FaTwitter className="w-3.5 h-3.5" />,
    href: 'https://x.com/ethanclinick',
  },
  {
    label: 'Github',
    icon: <FaGithub className="w-3.5 h-3.5" />,
    href: 'https://github.com/eclinick',
  },
  {
    label: 'LinkedIn',
    icon: <FaLinkedin className="w-3.5 h-3.5" />,
    href: 'https://linkedin.com/in/ethanclinick',
  },
  {
    label: 'LeetCode',
    icon: <SiLeetcode className="w-3.5 h-3.5" />,
    href: 'https://leetcode.com/eclinick',
  },
  {
    label: 'TryHackMe',
    icon: <SiTryhackme className="w-3.5 h-3.5" />,
    href: 'https://tryhackme.com/p/eclinick',
  },
];

const hackathons = [
  {
    id: 1,
    name: 'PNW Startup Weekend',
    place: '1st Place',
    description:
      'Built TradeMind, a smart trading journal and analytics platform. Snap together AI-powered analytics for trade tracking, behavioral insights, and automated reporting — generating production-ready dashboards instantly.',
    location: 'UNIVERSITY OF WASHINGTON',
    date: 'MAR 2024',
    url: 'https://trademind.pro',
    tags: ['React.js', 'TypeScript', 'AI', 'Fintech'],
  },
  {
    id: 2,
    name: 'AI Accessibility Hackathon',
    place: 'Top 3',
    description:
      'Developed PlanGenie, an AI-powered task management platform built specifically for neurodivergent minds. Adapts to unique thought processes, breaking down complex tasks and providing natural organization flow.',
    location: 'SEATTLE, WA',
    date: 'NOV 2024',
    url: 'https://plangenie.net',
    tags: ['Next.js', 'LangChain', 'Python', 'TypeScript'],
  },
];

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">

        {/* ── Hero ── */}
        <div className="relative mb-12">
          <div className="absolute top-0 right-0">
            <img
              src={profileImage}
              alt="Ethan Clinick"
              className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700"
            />
          </div>

          <p className="text-gray-400 text-sm mb-2 font-mono">Hi, I'm&nbsp;👋</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-none tracking-tight mb-3">
            ETHAN CLINICK
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest font-mono">
            FULL STACK DEVELOPER&nbsp;•&nbsp;SEEQ CORPORATION
          </p>
        </div>

        {/* ── About Me ── */}
        <section id="about" className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">About Me</h2>
          <div className="font-mono text-sm leading-relaxed text-gray-300 space-y-4">
            <p>
              Hey there! I'm a{' '}
              <strong className="text-white">software professional</strong> passionate about building{' '}
              <strong className="text-white">scalable, user-centric applications</strong> with expertise in{' '}
              <strong className="text-white">cloud infrastructure and microservices architecture</strong>.
            </p>
            <p>
              Currently working as a{' '}
              <strong className="text-white">Software Engineer at Seeq</strong> with{' '}
              <strong className="text-white">2+ years</strong> of experience in full-stack development.
              Previously founded{' '}
              <strong className="text-white">TradeMind</strong> and{' '}
              <strong className="text-white">PlanGenie</strong>, building AI-powered products for thousands of
              users. In my free time, I enjoy{' '}
              <strong className="text-white">building products</strong>, exploring{' '}
              <strong className="text-white">cybersecurity</strong>, and contributing to{' '}
              <strong className="text-white">open-source</strong>.
            </p>
          </div>
        </section>

        {/* ── Social Links ── */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm mb-3 font-mono">
            My <strong className="text-white">social links</strong> if you wish to connect with me
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded-md text-white text-sm hover:border-zinc-500 hover:bg-zinc-900 transition-all font-mono"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── GitHub Contribution Graph ── */}
        <div className="mb-14">
          <GitHubContributionGraph />
        </div>

        {/* ── Hackathons ── */}
        <section id="hackathons" className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Hackathons</h2>
          <div className="space-y-4">
            {hackathons.map((h) => (
              <div
                key={h.id}
                className="border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 transition-all"
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-mono font-semibold text-sm">{h.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/30 font-mono">
                      {h.place}
                    </span>
                  </div>
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white text-xs font-mono flex items-center gap-1 shrink-0"
                  >
                    info <ExternalLink size={10} />
                  </a>
                </div>
                <p className="text-gray-400 text-sm font-mono mb-3 leading-relaxed">
                  {h.description}
                </p>
                <p className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-3">
                  {h.location}&nbsp;•&nbsp;{h.date}
                </p>
                <div className="flex flex-wrap gap-2">
                  {h.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-gray-300 font-mono"
                    >
                      @{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Featured Projects ── */}
      <div id="projects">
        <FeaturedProjects />
      </div>

      {/* ── Employment Timeline ── */}
      <div id="experience">
        <EmploymentTimeline />
      </div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
