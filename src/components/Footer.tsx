import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-gray-800 mt-16 md:mt-24 mb-16 md:mb-0">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <div className="text-xl md:text-2xl">✱</div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-light leading-tight">
              Let&apos;s <span className="font-semibold">Connect</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a 
            href="https://newsletter.zalkazemi.com/p/the-landing-page-formula" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-button text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors text-center"
          >
            Join feedback list
          </a>
          <a 
            href="mailto:ethan@clinick.net" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors text-center"
          >
            Email Me
          </a>
          <a 
            href="https://www.linkedin.com/in/ethanclinick" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors text-center"
          >
            LinkedIn
          </a>
          <a 
            href="https://x.com/EthanClinick" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors text-center"
          >
            X
          </a>
          <a 
            href="https://github.com/eclinick" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base border border-white/20 transition-colors text-center"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs pb-6">
        © {new Date().getFullYear()} Ethan Clinick. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;