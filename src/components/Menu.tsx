import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import ChatBox from './ChatBox';

interface MenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleProjectsClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    if (location.pathname === '/about') {
      // If already on about page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {/* <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-all z-[40] relative"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
      </button> */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[40] md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link 
              to="/" 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={handleHomeClick}
            >
              Home
            </Link>
            <Link 
              to={location.pathname === '/projects' ? '/projects' : '/#projects'} 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={handleProjectsClick}
            >
              Projects
            </Link>
            <Link 
              to="/about" 
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={handleAboutClick}
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
          </div>
        </div>
      )}

      {/* Top Navigation - Desktop */}
      <nav className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-[40]">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors font-medium" onClick={handleHomeClick}>
              Home
            </Link>
            <Link to={location.pathname === '/projects' ? '/projects' : '/#projects'} className="text-gray-400 hover:text-white transition-colors font-medium" onClick={handleProjectsClick}>
              Projects
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors" onClick={handleAboutClick}>
              About
            </Link>
            <button onClick={() => setIsChatOpen(true)} className="text-gray-400 hover:text-white transition-colors font-medium">
              Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-[40] w-[90%] max-w-sm">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white hover:text-orange-500 transition-colors font-medium text-sm" onClick={handleHomeClick}>
              Home
            </Link>
            <Link to={location.pathname === '/projects' ? '/projects' : '/#projects'} className="text-gray-400 hover:text-white transition-colors text-sm" onClick={handleProjectsClick}>
              Projects
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm" onClick={handleAboutClick}>
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
    </>
  );
};

export default Menu;