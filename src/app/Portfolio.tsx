import React from 'react'
import FeaturedProjects from "../components/featured-projects"
import { EmploymentTimeline } from "../components/employment-timeline"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import profileImage from '../assets/profile.jpg';
import Menu from '../components/Menu';
import { useState } from 'react';

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-end p-4 md:p-6 relative">
        <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <ScrollSlideIn className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="text-xl md:text-2xl">✱</div>

            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                I'm your <span className="font-semibold">Full Stack Developer</span>
              </h1>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
                I'm a full stack developer with a passion for building scalable and efficient buisnesses. <span className="font-semibold text-orange-500">Shipping </span> is my middle name
              </p>

              <div className="text-orange-500 text-lg md:text-xl font-mono">{"{ Simplicity for the Future }"}</div>
            </div>
          </ScrollSlideIn>

          {/* Right Image */}
          <ScrollFadeIn delay={200} className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img
                src={profileImage}
                alt="Developer taking a photo"
                className="rounded-2xl object-cover w-[280px] h-[350px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]"
              />
            </div>
          </ScrollFadeIn>
        </div>
      </main>

      {/* Featured Projects Section */}
      <div id="projects">
        <FeaturedProjects />
      </div>

      {/* Employment Timeline Section */}
      <EmploymentTimeline />



      {/* Footer Section */}
      <footer className="w-full bg-black border-t border-gray-800 mt-16 md:mt-24 mb-16 md:mb-0">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="text-xl md:text-2xl">✱</div>
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-light leading-tight">
                Let&apos;s <span className="font-semibold">Connect</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a href="mailto:ethan@clinick.net" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors text-center">Email Me</a>
            <a href="https://www.linkedin.com/in/ethanclinick" target="_blank" rel="noopener noreferrer" className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors text-center">LinkedIn</a>
            <a href="https://github.com/eclinick" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base border border-white/20 transition-colors text-center">GitHub</a>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs pb-6">© {new Date().getFullYear()} Ethan Clinick. All rights reserved.</div>
      </footer>
    </div>
  )
}
