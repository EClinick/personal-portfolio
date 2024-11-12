import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
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
  comingSoon = false,
  disclaimer = "",
}: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="aspect-[16/9] w-full relative">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain bg-black"
        />
        {comingSoon && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-2xl font-bold text-white bg-indigo-600/80 px-6 py-2 rounded-lg">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        {disclaimer && (
          <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
            <p className="text-amber-400 text-sm">{disclaimer}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {githubUrl && githubUrl !== "https://github.com" && (
            <a
              href={githubUrl}
              className="text-gray-300 hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
          )}
          {liveUrl && liveUrl !== "#" && (
            <a
              href={liveUrl}
              className="text-gray-300 hover:text-indigo-400 transition-colors"
            >
              Website
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              className="text-gray-300 hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}