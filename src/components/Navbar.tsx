import React from 'react';
import { Menu, X, Github, Linkedin, Mail, MessageSquare, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onChatClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ onChatClick, isDarkMode, onToggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [chatClicked, setChatClicked] = React.useState(false);

  const handleChatClick = () => {
    setChatClicked(true);
    onChatClick();
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-6xl mx-auto">
        <div className={`backdrop-blur-xl border rounded-full px-6 py-3 shadow-glass-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-900/80 border-gray-700/50'
            : 'bg-white/80 border-white/40'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className={`text-xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-indigo-400 to-purple-400' : 'from-slate-700 to-slate-900'} bg-clip-text text-transparent`}>
                EC
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className={`px-4 py-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}>
                Home
              </a>
              <a href="#about" className={`px-4 py-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}>
                About
              </a>
              <a href="#projects" className={`px-4 py-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}>
                Projects
              </a>
              <a href="#contact" className={`px-4 py-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}>
                Contact
              </a>
              <button
                onClick={handleChatClick}
                className={`chat-button-animated ${chatClicked ? 'chat-clicked' : ''} flex items-center justify-center px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  !chatClicked ? 'animate-chat-bounce-slow' : ''
                } ${
                  isDarkMode
                    ? 'hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25'
                    : 'hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                <span className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode
                    ? 'from-blue-400 via-purple-400 to-pink-400'
                    : 'from-blue-600 via-purple-600 to-pink-600'
                }`}>Chat</span>
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Social Links - Desktop only */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="https://github.com/eclinick"
                  className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/ethanclinick"
                  className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:clinicke@oregonstate.edu"
                  className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
                >
                  <Mail size={18} />
                </a>
              </div>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className={`mx-4 rounded-2xl p-4 space-y-2 backdrop-blur-2xl border shadow-glass-lg transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/90 border-gray-700/50'
              : 'bg-white/90 border-white/60'
          }`}>
            <a
              href="#home"
              className={`block px-4 py-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className={`block px-4 py-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#projects"
              className={`block px-4 py-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`block px-4 py-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <button
              onClick={() => {
                handleChatClick();
                setIsOpen(false);
              }}
              className={`chat-button-animated ${chatClicked ? 'chat-clicked' : ''} flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 w-full transform hover:scale-105 ${
                !chatClicked ? 'animate-chat-bounce-slow' : ''
              } ${
                isDarkMode
                  ? 'hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25'
                  : 'hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              <span className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode
                  ? 'from-blue-400 via-purple-400 to-pink-400'
                  : 'from-blue-600 via-purple-600 to-pink-600'
              }`}>Chat</span>
            </button>

            {/* Mobile Social Links */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-glass">
              <a
                href="https://github.com/eclinick"
                className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/ethanclinick"
                className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:clinicke@oregonstate.edu"
                className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800/10'}`}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}