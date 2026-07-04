import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ChatBox from './ChatBox';
// Portfolio view is disabled for now, so the Portfolio/Résumé switch is unused.
// import ViewModeSwitch from './ViewModeSwitch';

interface MenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');
  // The view switch only changes how the home page renders, so only reveal it there.
  // (Disabled while the site is résumé-only.)
  // const showViewToggle = location.pathname === '/';

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY <= 10);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, [location.pathname]);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Projects nav entry is disabled while the site is résumé-only.
  // const handleProjectsClick = () => {
  //   if (location.pathname === '/') {
  //     const projectsSection = document.getElementById('projects');
  //     if (projectsSection) {
  //       projectsSection.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  //   setIsMobileMenuOpen(false);
  // };

  const handleBlogClick = () => {
    if (location.pathname === '/blog') {
      // If already on blog page, scroll to top
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
            {/* Projects link disabled while the site is résumé-only.
            <Link
              to={location.pathname === '/projects' ? '/projects' : '/#projects'}
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={handleProjectsClick}
            >
              Projects
            </Link> */}
            <Link
              to="/blog"
              className="text-white text-2xl font-medium hover:text-orange-500 transition-colors"
              onClick={handleBlogClick}
            >
              Blog
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

      {/* Top Navigation - Desktop. Docked (full-width, borderless) at the top of the
          page; morphs into the floating glass pill once the user scrolls. */}
      <nav
        className={`hidden md:flex fixed left-0 right-0 z-[40] justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isAtTop ? 'top-0' : 'top-6'} ${isBlogPage && !isAtTop ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {/* While docked, the container spans the full width but is invisible, so it
            must not swallow clicks on content beneath it — only the links stay hot. */}
        <div
          className={`flex items-center justify-center space-x-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isAtTop
              ? 'w-full rounded-none border border-transparent bg-transparent px-8 py-5 pointer-events-none'
              : 'w-auto rounded-2xl border border-white/20 bg-glass px-8 py-4 shadow-2xl backdrop-blur-md'
          }`}
        >
          <Link to="/" className={`text-gray-400 hover:text-white transition-colors font-medium ${isAtTop ? 'pointer-events-auto' : ''}`} onClick={handleHomeClick}>
            Home
          </Link>
          {/* Projects link disabled while the site is résumé-only.
          <Link to={location.pathname === '/projects' ? '/projects' : '/#projects'} className="text-gray-400 hover:text-white transition-colors font-medium" onClick={handleProjectsClick}>
            Projects
          </Link> */}
          <Link to="/blog" className={`text-gray-400 hover:text-white transition-colors font-medium ${isAtTop ? 'pointer-events-auto' : ''}`} onClick={handleBlogClick}>
            Blog
          </Link>
          <button onClick={() => setIsChatOpen(true)} className={`text-gray-400 hover:text-white transition-colors font-medium ${isAtTop ? 'pointer-events-auto' : ''}`}>
            Chat
          </button>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav
        className={`md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-[40] w-[90%] max-w-sm transition-opacity duration-300 ${isBlogPage && !isAtTop ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="bg-white/ backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white hover:text-orange-500 transition-colors font-medium text-sm" onClick={handleHomeClick}>
              Home
            </Link>
            {/* Projects link disabled while the site is résumé-only.
            <Link to={location.pathname === '/projects' ? '/projects' : '/#projects'} className="text-gray-400 hover:text-white transition-colors text-sm" onClick={handleProjectsClick}>
              Projects
            </Link> */}
            <Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm" onClick={handleBlogClick}>
              Blog
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