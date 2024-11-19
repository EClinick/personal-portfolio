import React from 'react';
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
  disclaimer
}: ProjectCardProps) {
  const getTagStyles = (color: Tag['color']) => {
    const styles = {
      blue: 'bg-blue-500/20 text-blue-300',
      green: 'bg-green-500/20 text-green-300',
      red: 'bg-red-500/20 text-red-300',
      yellow: 'bg-yellow-500/20 text-yellow-300'
    };
    return styles[color];
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-[2/1] w-full relative">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-contain bg-black transition-all duration-200 ${comingSoon ? 'blur-[2px]' : ''}`}
        />
        {comingSoon && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-indigo-600/80 text-white px-6 py-2 rounded-md text-lg font-medium">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="p-6 bg-gray-800/50">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag.text}
              className={`px-3 py-1 rounded-full text-xs ${getTagStyles(tag.color)}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <ExternalLink size={18} />
              <span className="text-sm">Visit</span>
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
          )}
        </div>
        {disclaimer && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-200/80">{disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}