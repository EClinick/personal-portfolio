import React from 'react'
import { Calendar, Menu, Moon, X } from "lucide-react"
import FeaturedProjects from "../components/featured-projects"
import { EmploymentTimeline } from "../components/employment-timeline"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import profileImage from '../assets/profile.jpg';
import ChatBox from '../components/ChatBox';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      {/* <header className="flex items-center justify-between p-4 md:p-6 relative">
        <button className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-3 py-2 md:px-6 md:py-3 border inline-flex items-center transition-all text-sm md:text-base">
          <Calendar className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Schedule a call</span>
          <span className="sm:hidden">Call</span>
        </button> */}

        {/* Desktop Menu Button */}
        {/* <button className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 items-center transition-all">
          <Menu className="w-4 h-4 mr-2" />
          Go to menu
        </button> */}

        {/* Mobile Menu Button */}
        {/* <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-all"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header> */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a 
              href="#" 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#projects" 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <Link 
              to="/about" 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <button 
              onClick={() => {
                setIsChatOpen(true);
                setIsMobileMenuOpen(false);
              }} 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
            >
              Chat
            </button>
            {/* <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Moon className="w-6 h-6" />
            </button> */}
          </div>
        </div>
      )}

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
                I'm a full stack developer with a passion for building scalable and efficient buisnesses. Shipping is my middle name.
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
      <FeaturedProjects />

      {/* Employment Timeline Section */}
      <EmploymentTimeline />


      {/* Bottom Navigation - Hidden on Mobile when mobile menu is present */}
      <nav className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-white hover:text-orange-500 transition-colors font-medium">
              Home
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
              Projects
            </a>
            {/* <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Moon className="w-4 h-4" />
            </button> */}
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <button onClick={() => setIsChatOpen(true)} className="text-gray-400 hover:text-white transition-colors font-medium">
              Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
          <div className="flex items-center justify-between">
            <a href="#" className="text-white hover:text-orange-500 transition-colors font-medium text-sm">
              Home
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm">
              Projects
            </a>
            {/* <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Moon className="w-4 h-4" />
            </button> */}
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
              About
            </Link>
            <button onClick={() => setIsChatOpen(true)} className="text-gray-400 hover:text-white transition-colors font-medium text-sm">
              Chat
            </button>
          </div>
        </div>
      </nav>

      {/* ChatBox Modal */}
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

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
        <div className="text-center text-gray-600 text-xs pb-6">© {new Date().getFullYear()} Your Name. All rights reserved.</div>
      </footer>
    </div>
  )
}
