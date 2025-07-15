import React from 'react'
import { Calendar, Menu, Moon } from "lucide-react"
import FeaturedProjects from "../components/featured-projects"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import profileImage from '../assets/profile.jpg';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <button className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-6 py-3 border inline-flex items-center transition-all">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule a call
        </button>

        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 inline-flex items-center transition-all">
          <Menu className="w-4 h-4 mr-2" />
          Go to menu
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <ScrollSlideIn className="space-y-8">
            <div className="text-2xl">✱</div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-light leading-tight">
                I'm your <span className="font-semibold">Full Stack Developer</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                From designing beautiful interfaces to making sure everything runs smoothly behind the scenes, I've got
                you covered. Let's turn your ideas into interactive wonders that make waves online. With me by your
                side, your website will be more than just pixels"
              </p>

              <div className="text-orange-500 text-xl font-mono">{"{ Simplicity for the Future }"}</div>
            </div>
          </ScrollSlideIn>

          {/* Right Image */}
          <ScrollFadeIn delay={200} className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={profileImage}
                alt="Developer taking a photo"
                className="rounded-2xl object-cover w-[500px] h-[600px]"
              />
            </div>
          </ScrollFadeIn>
        </div>
      </main>

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-white hover:text-orange-500 transition-colors font-medium">
              Home
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
              Projects
            </a>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Moon className="w-4 h-4" />
            </button>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
