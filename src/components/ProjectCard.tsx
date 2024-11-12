import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectCard({ title, description, image, tags, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="aspect-[16/9] w-full relative">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain bg-black"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
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
          {/* Only show GitHub button if URL is valid and not default */}
          {githubUrl && githubUrl !== "https://github.com" && (
            <a
              href={githubUrl}
              className="text-gray-300 hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
          )}
          <a
            href={liveUrl}
            className="text-gray-300 hover:text-indigo-400 transition-colors"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}