import React from 'react'
import { Clock, Star } from "lucide-react"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import profileImage from '../assets/profile.jpg'
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid"
import ExpandableCardDemo from "../components/ui/expandable-card-demo-standard";
import { LogoCarousel } from "../components/ui/logo-carousel";
import { SiFigma, SiGithub, SiDiscord, SiPostman, SiSupabase, SiReact, SiTailwindcss, SiPython, SiGit } from "react-icons/si";
import { SVGProps } from "react";
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

const stackLogos = [
  { name: "Figma", id: 1, img: (props: SVGProps<SVGSVGElement>) => <SiFigma color="#F24E1E" {...props} /> },
  { name: "Git", id: 2, img: (props: SVGProps<SVGSVGElement>) => <SiGit color="#F24E1E" {...props} /> },
  { name: "Discord", id: 2, img: (props: SVGProps<SVGSVGElement>) => <SiDiscord color="#5865F2" {...props} /> },
  { name: "GitHub", id: 3, img: (props: SVGProps<SVGSVGElement>) => <SiGithub color="#181717" {...props} /> },
  { name: "Supabase", id: 4, img: (props: SVGProps<SVGSVGElement>) => <SiSupabase color="#3ECF8E" {...props} /> },
  { name: "Postman", id: 7, img: (props: SVGProps<SVGSVGElement>) => <SiPostman color="#FF6C37" {...props} /> },
  { name: "React", id: 8, img: (props: SVGProps<SVGSVGElement>) => <SiReact color="#61DAFB" {...props} /> },
  { name: "Tailwind", id: 9, img: (props: SVGProps<SVGSVGElement>) => <SiTailwindcss color="#38BDF8" {...props} /> },
  { name: "Python", id: 10, img: (props: SVGProps<SVGSVGElement>) => <SiPython color="#3776AB" {...props} /> },
];

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-end p-4 md:p-6 relative">
        <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <ScrollSlideIn className="space-y-8 mb-12">
          <div className="text-2xl">✱</div>
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-light leading-tight">
              I'm <span className="font-semibold">Ethan Clinick</span>
            </h1>
            <div className="text-orange-500 text-xl font-mono">{"{ Full Stack Developer }"}</div>
          </div>
        </ScrollSlideIn>

        <ScrollFadeIn delay={200}>
          <BentoGrid className="max-w-6xl mx-auto">
            {/* Profile Image Card - Left side */}
            <BentoGridItem
              className="md:col-span-1 md:row-span-2 bg-gray-900 border-gray-800 p-0"
              header={
                <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover grayscale"
                  />
                  {/* <div className="absolute bottom-4 left-4">
                    <div className="text-white text-4xl font-bold">AKA.</div>
                  </div> */}
                </div>
              }
            />
            {/* //Aka short description */}
            <BentoGridItem
              className="bg-gray-900 border border-gray-800"
              title={
                <div className="flex items-center justify-between">
                  <span className="text-white text-3xl font-bold">AKA.</span>
                </div>
              }
              description={
                <div className="space-y-2 text-white/90">
                  <div className="text-lg">I'm a full stack developer with a passion for building scalable and efficient buisnesses. I ship <span className="font-bold text-green-500">24/7</span> <span className="font-bold text-orange-500">365 </span>days a year.</div>
                </div>
              }
            />
            {/* Skills Card - Darker gradient to match theme */}
            <BentoGridItem
              className="bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 border border-orange-500/20"
              title={
                <div className="flex items-center justify-between">
                  <span className="text-white text-3xl font-bold">SKILLS.</span>
                  <div className="text-white">
                    <Star className="w-6 h-6" />
                  </div>
                </div>
              }
              description={
                <div className="space-y-2 text-white/90">
                  <div className="text-lg">Full Stack Developer</div>
                  <div className="text-lg">Entrepreneur</div>
                  <div className="text-lg">AI/ML Engineer</div>
                </div>
              }
            />
            {/* Time Card */}
            <BentoGridItem
              className="bg-gray-900 border border-gray-800"
              title={
                <div className="flex items-center justify-between">
                  <span className="text-white text-3xl font-bold">TIME.</span>
                  <div className="text-orange-500/50">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
              }
              description={
                <div className="space-y-2 text-white/90">
                  <div className="text-lg">Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
                  <div className="text-lg">Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="text-lg">Based in Seattle, WA</div>
                </div>
              }
            />
            {/* Projects Section - Expandable Cards */}
            <BentoGridItem className="md:row-span-2 bg-gray-900 border-gray-800" title={<span className="text-white text-2xl font-bold">PROJECTS.</span>} description={<ExpandableCardDemo />} />
            {/* Stack Card */}
            <BentoGridItem
              className="md:col-span-2 bg-gray-900 border-gray-800"
              title={<span className="text-white text-2xl font-bold">STACK.</span>}
              description={<LogoCarousel logos={stackLogos} visibleCount={6} />}
            />
          </BentoGrid>
        </ScrollFadeIn>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}