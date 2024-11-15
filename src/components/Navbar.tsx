import React from 'react';
import { Menu, X, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onChatClick: () => void;
}

export default function Navbar({ onChatClick }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              EC
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-indigo-400 transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-indigo-400 transition-colors">About</a>
              <a href="#projects" className="text-gray-300 hover:text-indigo-400 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-indigo-400 transition-colors">Contact</a>
              <button
                onClick={onChatClick}
                className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
              >
                <MessageSquare size={20} />
                <span>Chat</span>
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/eclinick" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/ethanclinick" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:clinicke@oregonstate.edu" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Mail size={20} />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-indigo-400">Home</a>
            <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-indigo-400">About</a>
            <a href="#projects" className="block px-3 py-2 text-gray-300 hover:text-indigo-400">Projects</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-indigo-400">Contact</a>
            <button
              onClick={onChatClick}
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}