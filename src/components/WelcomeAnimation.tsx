import React, { useState, useEffect } from 'react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WELCOME_LANGUAGES = [
  'Welcome',      // English
  'Bienvenue',    // French
  'Willkommen',   // German
  'Bienvenido',   // Spanish
  'Benvenuto',    // Italian
  'ようこそ',      // Japanese
  '환영합니다',     // Korean
  '欢迎',         // Chinese (Simplified)
  'Bem-vindo',    // Portuguese
  'Welkom',       // Dutch
  'Välkommen',    // Swedish
  'Добро пожаловать', // Russian
  'مرحبا',        // Arabic
  'Hoş geldiniz', // Turkish
  'Καλώς ήρθατε', // Greek
];

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    // Cycle through languages
    const languageInterval = setInterval(() => {
      setCurrentLanguageIndex(prev => (prev + 1) % WELCOME_LANGUAGES.length);
    }, 510);

    // After 5 seconds, start the scroll up animation
    const scrollTimer = setTimeout(() => {
      setIsScrollingUp(true);
      clearInterval(languageInterval);
    }, 5000);

    // After scroll animation completes (.5s) after scrollTimer
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 5500);

    return () => {
      clearInterval(languageInterval);
      clearTimeout(scrollTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black transition-transform duration-1500 ease-in-out ${
        isScrollingUp ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Welcome Text - Stays centered */}
      <div className="relative z-10 text-center px-4">
        <div className="text-4xl md:text-6xl lg:text-8xl font-light text-white transition-opacity duration-300 font-header">
          {WELCOME_LANGUAGES[currentLanguageIndex]}
        </div>
      </div>
    </div>
  );
}

