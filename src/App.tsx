import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                John Doe
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <a
                href="#contact"
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                Resume
              </a>
            </div>
            <a href="#about" className="animate-bounce inline-block">
              <ArrowDown size={24} className="text-indigo-600" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Profile"
              className="rounded-xl shadow-lg"
            />
            <div>
              <p className="text-gray-600 mb-6">
                I'm a passionate Full Stack Developer with 5 years of experience building web applications.
                I specialize in React, Node.js, and modern web technologies. When I'm not coding,
                you'll find me exploring new technologies or contributing to open-source projects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <p className="text-gray-600">React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <p className="text-gray-600">Node.js, Express, PostgreSQL</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Tools</h3>
                  <p className="text-gray-600">Git, Docker, AWS</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Design</h3>
                  <p className="text-gray-600">Figma, Adobe XD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="E-Commerce Platform"
              description="A full-featured e-commerce platform built with React and Node.js"
              image="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              tags={['React', 'Node.js', 'PostgreSQL']}
              githubUrl="https://github.com"
              liveUrl="https://example.com"
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management tool with real-time updates"
              image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              tags={['React', 'Firebase', 'Tailwind']}
              githubUrl="https://github.com"
              liveUrl="https://example.com"
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A beautiful weather dashboard with detailed forecasts"
              image="https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              tags={['React', 'TypeScript', 'API']}
              githubUrl="https://github.com"
              liveUrl="https://example.com"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Mail size={24} />
              <span>Email</span>
            </a>
            <a
              href="https://github.com"
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>© 2024 John Doe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;