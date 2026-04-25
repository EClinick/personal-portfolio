import React, { useState } from 'react'
// import FeaturedProjects from "../components/featured-projects"
import { EmploymentTimeline } from "../components/employment-timeline"
import profileImage from '../assets/profile.jpg';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import GitHubContributionGraph from '../components/github-contribution-graph';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  {
    label: 'Twitter',
    icon: <FaXTwitter className="w-3.5 h-3.5" />,
    href: 'https://x.com/EthanClinick',
  },
  {
    label: 'Github',
    icon: <FaGithub className="w-3.5 h-3.5" />,
    href: 'https://github.com/eclinick',
  },
  {
    label: 'LinkedIn',
    icon: <FaLinkedin className="w-3.5 h-3.5" />,
    href: 'https://www.linkedin.com/in/ethanclinick',
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
              <strong className="text-white">software engineer</strong> who loves building{' '}
              <strong className="text-white">AI-powered products</strong> and{' '}
              <strong className="text-white">full-stack applications</strong> across cloud, fintech,
              and developer tooling.
            </p>
            <p>
              Currently a <strong className="text-white">Software Engineer at Seeq</strong>, working on{' '}
              <strong className="text-white">AI integrations</strong> and internal Copilot tooling for
              industrial data analysis. Alongside that I've founded{' '}
              <strong className="text-white">PlanGenie</strong> and{' '}
              <strong className="text-white">Tan.ai</strong>, and co-founded{' '}
              <strong className="text-white">Vcrypt Software</strong>, building algorithmic trading
              systems in Rust.
            </p>
            <p>
              When I'm not shipping, you'll find me{' '}
              <strong className="text-white">prototyping new ideas</strong>, exploring{' '}
              <strong className="text-white">AI and systems engineering</strong>, or contributing to{' '}
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
        <GitHubContributionGraph />

      </main>

      {/* ── Featured Projects ── */}
      {/*
      <div id="projects">
        <FeaturedProjects />
      </div>
      */}

      {/* ── Employment Timeline ── */}
      <div id="experience">
        <EmploymentTimeline />
      </div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
