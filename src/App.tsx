import { Routes, Route } from 'react-router-dom';
import Portfolio from './app/Portfolio';
import About from './app/About';
import WelcomeAnimation from './components/WelcomeAnimation';
import { useState, useEffect } from 'react';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    // Check if welcome animation has been shown in this session
    const welcomed = sessionStorage.getItem('hasShownWelcome');
    if (welcomed === 'true') {
      setShowWelcome(false);
      setHasShownWelcome(true);
    }
  }, []);

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
    </Routes>
      </div>
    </div>
  );
}

export default App;