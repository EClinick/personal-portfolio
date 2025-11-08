import { Routes, Route } from 'react-router-dom';
import Portfolio from './app/Portfolio';
import About from './app/About';
import Blog from './app/Blog';
import BlogPost from './app/BlogPost';
import BlogEditor from './app/BlogEditor';
import WelcomeAnimation from './components/WelcomeAnimation';
import { useState, useEffect } from 'react';

function App() {
  // Check session storage BEFORE initial render to prevent flash
  const hasSeenWelcome = sessionStorage.getItem('hasShownWelcome') === 'true';
  
  const [showWelcome, setShowWelcome] = useState(!hasSeenWelcome);
  const [hasShownWelcome, setHasShownWelcome] = useState(hasSeenWelcome);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setHasShownWelcome(true);
    sessionStorage.setItem('hasShownWelcome', 'true');
  };

  return (
    <div className="bg-black min-h-screen">
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
      <div className={`${!hasShownWelcome ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/editor" element={<BlogEditor />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
      </div>
    </div>
  );
}

export default App;