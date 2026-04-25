import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, FileText, Briefcase, Minimize2, X as XIcon, AlignJustify } from 'lucide-react';
import ChatBox from './ChatBox';
import { useMinimalMode } from '../contexts/MinimalModeContext';

interface MenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');
  const { isMinimal, toggleMinimal } = useMinimalMode();

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY <= 10);
    };
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleAbout = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[40] md:hidden flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            <Link
              to="/"
              className="text-white text-2xl font-medium flex items-center gap-3 hover:text-gray-400 transition-colors"
              onClick={handleAbout}
            >
              <Home size={20} /> About
            </Link>
            <button
              className="text-white text-2xl font-medium flex items-center gap-3 hover:text-gray-400 transition-colors"
              onClick={() => scrollTo('projects')}
            >
              <FolderOpen size={20} /> Projects
            </button>
            <Link
              to="/blog"
              className="text-white text-2xl font-medium flex items-center gap-3 hover:text-gray-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText size={20} /> Blogs
            </Link>
            <button
              className="text-white text-2xl font-medium flex items-center gap-3 hover:text-gray-400 transition-colors"
              onClick={() => scrollTo('experience')}
            >
              <Briefcase size={20} /> Experience
            </button>
            <button
              onClick={() => { setIsChatOpen(true); setIsMobileMenuOpen(false); }}
              className="text-gray-500 text-lg font-medium hover:text-gray-400 transition-colors"
            >
              Chat
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation — Desktop */}
      <nav
        className={`hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-[40] transition-opacity duration-300 ${
          isBlogPage && !isAtTop ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="bg-zinc-900 border border-zinc-700 rounded-full px-5 py-2.5 flex items-center gap-0.5">
          <Link
            to="/"
            onClick={handleAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white bg-zinc-800 text-sm font-medium"
          >
            <Home size={13} />
            <span>About</span>
          </Link>
          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:text-white hover:bg-zinc-800 transition-all text-sm"
          >
            <FolderOpen size={13} />
            <span>Projects</span>
          </button>
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:text-white hover:bg-zinc-800 transition-all text-sm"
          >
            <FileText size={13} />
            <span>Blogs</span>
          </Link>
          <button
            onClick={() => scrollTo('experience')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:text-white hover:bg-zinc-800 transition-all text-sm"
          >
            <Briefcase size={13} />
            <span>Experience</span>
          </button>
          <div className="w-px h-4 bg-zinc-700 mx-1.5" />
          <button
            onClick={toggleMinimal}
            aria-label={isMinimal ? 'Switch to detailed view' : 'Switch to minimal view'}
            title={isMinimal ? 'Detailed view' : 'Minimal view'}
            className={`p-1.5 rounded-full transition-all ${
              isMinimal
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Minimize2 size={14} />
          </button>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav
        className={`md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-[40] transition-opacity duration-300 ${
          isBlogPage && !isAtTop ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 flex items-center gap-3">
          <Link to="/" onClick={handleAbout} className="text-white text-sm font-medium flex items-center gap-1.5">
            <Home size={12} /> About
          </Link>
          <span className="text-zinc-700">|</span>
          <button onClick={() => scrollTo('projects')} className="text-gray-400 text-sm flex items-center gap-1.5">
            <FolderOpen size={12} /> Projects
          </button>
          <span className="text-zinc-700">|</span>
          <Link to="/blog" className="text-gray-400 text-sm flex items-center gap-1.5">
            <FileText size={12} /> Blogs
          </Link>
          <span className="text-zinc-700">|</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400">
            <AlignJustify size={16} />
          </button>
        </div>
      </nav>

      {/* ChatBox Modal */}
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Menu;
