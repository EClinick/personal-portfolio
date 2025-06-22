import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Linkedin } from 'lucide-react';

interface Tag {
  text: string;
  color: 'blue' | 'green' | 'red' | 'yellow';
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: Tag[];
  githubUrl?: string;
  liveUrl?: string;
  linkedinUrl?: string;
  comingSoon?: boolean;
  disclaimer?: string;
  isDarkMode?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  linkedinUrl,
  comingSoon,
  disclaimer,
  isDarkMode = false
}: ProjectCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    // Limit the rotation to a small range (-3 to 3 degrees)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 3;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves the card
    setRotation({ x: 0, y: 0 });
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getTagStyles = (color: Tag['color']) => {
    if (isDarkMode) {
      const darkStyles = {
        blue: 'bg-blue-500/20 text-blue-300',
        green: 'bg-green-500/20 text-green-300',
        red: 'bg-red-500/20 text-red-300',
        yellow: 'bg-yellow-500/20 text-yellow-300'
      };
      return darkStyles[color];
    } else {
      const lightStyles = {
        blue: 'bg-blue-500/30 text-blue-700',
        green: 'bg-green-500/30 text-green-700',
        red: 'bg-red-500/30 text-red-700',
        yellow: 'bg-yellow-500/30 text-yellow-700'
      };
      return lightStyles[color];
    }
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card rounded-2xl overflow-hidden transform transition-all duration-300 ease-out hover:scale-[1.02] relative backdrop-blur-xl border ${
        isDarkMode
          ? 'bg-gray-900/30 border-gray-700/30'
          : 'bg-white/30 border-white/40'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Glass shimmer effect */}
      <div className="absolute inset-0 glass-shimmer opacity-30 pointer-events-none"></div>

      <div className={`aspect-[16/10] w-full relative glass rounded-t-2xl overflow-hidden backdrop-blur-sm border-b ${
        isDarkMode ? 'border-gray-700/30' : 'border-white/40'
      }`} style={{ transform: 'translateZ(20px)' }}>
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-contain transition-all duration-200 ${
            comingSoon ? 'blur-[2px]' : ''
          } ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-800 to-slate-900'
              : 'bg-gradient-to-br from-slate-100 to-slate-200'
          }`}
        />
        {comingSoon && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className={`glass-button px-6 py-2 rounded-xl text-lg font-medium backdrop-blur-xl border transition-colors duration-300 ${
              isDarkMode
                ? 'text-indigo-300 border-gray-700/30'
                : 'text-indigo-600 border-white/40'
            }`}>
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="p-8 relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>{title}</h3>
        <p className={`text-base mb-6 leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-slate-600'
        }`}>{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag.text}
              className={`glass-button px-4 py-2 rounded-full text-sm transition-all duration-200 ${getTagStyles(tag.color)}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-button transition-colors flex items-center gap-3 px-6 py-3 rounded-lg backdrop-blur-xl border ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white border-gray-700/30'
                  : 'text-slate-600 hover:text-slate-800 border-white/40'
              }`}
            >
              <ExternalLink size={20} />
              <span className="text-base">Visit</span>
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-button transition-colors flex items-center gap-3 px-6 py-3 rounded-lg backdrop-blur-xl border ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white border-gray-700/30'
                  : 'text-slate-600 hover:text-slate-800 border-white/40'
              }`}
            >
              <Linkedin size={20} />
              <span className="text-base">LinkedIn</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-button transition-colors flex items-center gap-3 px-6 py-3 rounded-lg backdrop-blur-xl border ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white border-gray-700/30'
                  : 'text-slate-600 hover:text-slate-800 border-white/40'
              }`}
            >
              <Github size={20} />
              <span className="text-base">GitHub</span>
            </a>
          )}
        </div>
        {disclaimer && (
          <div className={`mt-4 glass-card p-3 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
            isDarkMode
              ? 'border-amber-500/40 bg-amber-900/20'
              : 'border-amber-500/40 bg-amber-50/50'
          }`}>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-amber-200' : 'text-amber-700'
            }`}>{disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}