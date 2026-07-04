import React from 'react'
import FeaturedProjects from "../components/featured-projects"
import { EmploymentTimeline } from "../components/employment-timeline"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import profileImage from '../assets/profile.jpg';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import GitHubContributionGraph from '../components/github-contribution-graph';
import MinimalView from '../components/MinimalView';
import ViewModeToggle from '../components/ViewModeToggle';
import { useViewMode } from '../components/view-mode-provider';
import { useState } from 'react';

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { viewMode } = useViewMode();

  // The full portfolio view is disabled for now — the résumé/minimal view is the
  // only experience. Flip this to false to bring back the Portfolio/Résumé toggle
  // (also re-enable <ViewModeToggle /> below and the switch in Menu.tsx).
  const minimalOnly = true;

  if (minimalOnly || viewMode === 'minimal') {
    return (
      <div className="min-h-screen bg-black text-white">
        <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MinimalView />
        <Footer />
        {/* <ViewModeToggle /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Menu Component */}
      <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

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

      {/* GitHub Contribution Graph Section */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <ScrollFadeIn>
          <GitHubContributionGraph />
        </ScrollFadeIn>
      </div>
      
      {/* Featured Projects Section */}
      <div id="projects">
        <FeaturedProjects />
      </div>

      {/* Employment Timeline Section */}
      <EmploymentTimeline />



      {/* Footer Section */}
      <Footer />

      {/* Floating Portfolio / Résumé view switch */}
      <ViewModeToggle />
    </div>
  )
}
