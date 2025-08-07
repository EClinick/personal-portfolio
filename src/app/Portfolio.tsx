import React from 'react'
import FeaturedProjects from "../components/featured-projects"
import { EmploymentTimeline } from "../components/employment-timeline"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import profileImage from '../assets/profile.jpg';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

            <div className="space-y-5 md:space-y-6 glass-card rounded-2xl p-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                Ethan <span className="font-semibold">"Shipping"</span> Clinick
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                I merge code, design, and distribution into a tight build → ship → learn loop. Prototype fast, ship on schedule, and iterate from real feedback.
              </p>

              <div className="text-xs md:text-sm text-gray-500">Don’t scroll, Jack — skim the projects, then get on the feedback list.</div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="https://newsletter.zalkazemi.com/p/the-landing-page-formula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button text-white font-semibold px-5 py-3 rounded-full text-center"
                >
                  Join the feedback list
                </a>
                <a
                  href="#projects"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-full text-center"
                >
                  View projects
                </a>
              </div>
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
      <Footer />
    </div>
  )
}
