import React from 'react'
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import { Link } from 'react-router-dom'
import ExpandableCardDemo from '../components/ui/expandable-card-demo-standard'
import Menu from '../components/Menu'
import { useState } from 'react'

export default function Projects() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-end p-4 md:p-6 relative">
        <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-8">
            <div className="text-2xl">✱</div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-light leading-tight">
                ALL
                <br />
                <span className="font-semibold">PROJECTS</span>
                <br />
                <span className="font-semibold">& EXPERIENCE</span>
              </h1>
            </div>
          </div>
          <Link to="/">
            <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-full text-lg transition-colors">
              ✱ Back to Home
            </button>
          </Link>
        </div>

        {/* Description */}
        <ScrollSlideIn className="mb-16">
          <div className="max-w-3xl">
            <p className="text-gray-400 text-lg leading-relaxed">
              A comprehensive overview of my professional journey, featuring both entrepreneurial ventures and technical projects. 
              Click on any project to explore detailed information about the technologies used, challenges overcome, and impact achieved.
            </p>
            <div className="text-orange-500 text-xl font-mono mt-6">{"{ Click to Explore }"}</div>
          </div>
        </ScrollSlideIn>

        {/* Projects Grid */}
        <ScrollFadeIn delay={200}>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="text-2xl">✱</div>
              <h2 className="text-2xl lg:text-3xl font-light leading-tight">
                INTERACTIVE <span className="font-semibold">PROJECT GALLERY</span>
              </h2>
            </div>
            
            <ExpandableCardDemo />
          </div>
        </ScrollFadeIn>

        {/* Stats Section */}
        <ScrollFadeIn delay={400} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">4+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">10+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">1000+</div>
              <div className="text-gray-400">Users Served</div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Tech Stack Section */}
        <ScrollFadeIn delay={600} className="mt-16">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="text-2xl">✱</div>
              <h2 className="text-2xl lg:text-3xl font-light leading-tight">
                TECHNOLOGY <span className="font-semibold">STACK</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                'React', 'TypeScript', 'Python', 'Rust', 'Node.js', 'AWS',
                'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Figma', 'Tailwind'
              ].map((tech) => (
                <div key={tech} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
                  <div className="text-white font-medium">{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </main>

    </div>
  )
}