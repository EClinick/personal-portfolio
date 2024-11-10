import React from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JD
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="hover:text-indigo-600 transition-colors">Home</a>
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Mail size={20} />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#home" className="block px-3 py-2 hover:text-indigo-600">Home</a>
            <a href="#about" className="block px-3 py-2 hover:text-indigo-600">About</a>
            <a href="#projects" className="block px-3 py-2 hover:text-indigo-600">Projects</a>
            <a href="#contact" className="block px-3 py-2 hover:text-indigo-600">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}