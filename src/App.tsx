import React, { useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ChatBox from './components/ChatBox';
import { Github as GithubIcon } from 'lucide-react';

// Comment out the imports temporarily
import profileImage from './assets/profile.jpg';
import tanaiImage from './assets/tanai.jpeg';
import vcryptImage from './assets/vcrypt.png';
import tradingImage from './assets/trading.png';
import cryptoMinerImage from './assets/cryptov2.png';
import weatherford from './assets/weatherford.jpg';
import trademindImage from './assets/trademind.gif';
import planGenieImage from './assets/plangenie.jpg';
//import tradingJournalImage = '/trading-journal.png';
// Use these constants instead
//const profileImage = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const tanaiImage = "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const vcryptImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const tradingImage = "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const tradingJournalImage= "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
      {/* Background overlay for better glass effect */}
      <div className={`fixed inset-0 -z-10 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900'
          : 'bg-gradient-to-br from-indigo-100 via-blue-50/50 to-purple-100'
      }`}></div>

      <Navbar onChatClick={toggleChat} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section pt-20">
        {/* Curved background with glassmorphism */}
        <div className={`absolute inset-0 backdrop-blur-xl transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-900/20 border-gray-700/20'
            : 'bg-white/30 border-white/40'
        }`}>
          {/* Glass shimmer effect */}
          <div className="absolute inset-0 glass-shimmer opacity-30"></div>
        </div>

        {/* Curved bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
          <svg
            className="absolute bottom-0 w-full h-40"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.4)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              d="M0,40 C300,160 900,160 1200,40 L1200,160 L0,160 Z"
              fill="url(#curveGradient)"
              className="drop-shadow-sm"
            />
          </svg>
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 md:space-y-12">
            {/* Main heading */}
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-tight tracking-tight">
                <span className={`bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm ${
                  isDarkMode
                    ? 'from-blue-300 via-indigo-300 to-purple-300'
                    : 'from-slate-800 via-slate-700 to-slate-900'
                }`}>
                  Ethan Clinick
                </span>
              </h1>

              {/* Subtitle with enhanced styling */}
              <div className={`glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 mx-auto max-w-5xl relative overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-900/30 border-gray-700/30'
                  : 'bg-white/30 border-white/40'
              }`}>
                <div className="absolute inset-0 glass-shimmer opacity-20"></div>
                <div className="relative z-10">
                  <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-slate-700'
                  }`}>
                    {/* <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Technical Product Manager</span>
                    <span className={`mx-2 md:mx-3 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>&</span> */}
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Software Developer</span>
                  </p>
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    Specializing in AI-driven solutions, scalable architectures, and innovative product development
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-8 md:pt-12">
              <a
                href="#contact"
                className={`px-8 md:px-10 py-3 md:py-4 text-white rounded-full inline-flex items-center justify-center gap-3 font-medium text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm ${
                  isDarkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-slate-800 hover:bg-slate-900'
                }`}
              >
                Get in touch
              </a>
              <a
                href="#about"
                className={`glass-button px-8 md:px-10 py-3 md:py-4 rounded-full inline-flex items-center justify-center gap-3 font-medium text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-xl border ${
                  isDarkMode
                    ? 'hover:text-white border-gray-700/30'
                    : 'hover:text-slate-900 border-white/40'
                }`}
              >
                Learn more
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="pt-12 md:pt-16 lg:pt-20">
              <a href="#about" className="inline-block animate-bounce">
                <div className={`glass-button p-3 md:p-4 rounded-full hover:scale-110 transition-all duration-300 backdrop-blur-xl border ${
                  isDarkMode ? 'border-gray-700/30' : 'border-white/40'
                }`}>
                  <ArrowDown size={24} className={`md:w-7 md:h-7 ${isDarkMode ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
              </a>
              <p className={`text-sm md:text-base mt-3 font-light transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>Scroll to explore</p>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large floating orbs */}
          <div className={`absolute top-1/4 left-10 w-24 h-24 rounded-full opacity-30 animate-float blur-sm backdrop-blur-sm transition-all duration-300 ${
            isDarkMode ? 'bg-white/10' : 'bg-white/30'
          }`}></div>
          <div className={`absolute top-1/3 right-16 w-20 h-20 rounded-full opacity-25 animate-float-delayed blur-sm backdrop-blur-sm transition-all duration-300 ${
            isDarkMode ? 'bg-white/10' : 'bg-white/30'
          }`}></div>
          <div className={`absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full opacity-35 animate-glow-pulse blur-sm backdrop-blur-sm transition-all duration-300 ${
            isDarkMode ? 'bg-white/10' : 'bg-white/30'
          }`}></div>
          <div className={`absolute bottom-1/3 right-1/3 w-18 h-18 rounded-full opacity-20 animate-float blur-sm backdrop-blur-sm transition-all duration-300 ${
            isDarkMode ? 'bg-white/10' : 'bg-white/30'
          }`} style={{ animationDelay: '3s' }}></div>

          {/* Small floating particles */}
          <div className={`absolute top-1/5 left-1/3 w-3 h-3 rounded-full opacity-60 animate-float transition-all duration-300 ${
            isDarkMode ? 'bg-indigo-400' : 'bg-indigo-500'
          }`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`absolute top-2/5 right-1/4 w-2 h-2 rounded-full opacity-70 animate-float transition-all duration-300 ${
            isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
          }`} style={{ animationDelay: '1.5s' }}></div>
          <div className={`absolute bottom-2/5 left-1/5 w-4 h-4 rounded-full opacity-50 animate-glow-pulse transition-all duration-300 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          }`} style={{ animationDelay: '2.8s' }}></div>
          <div className={`absolute bottom-1/5 right-1/5 w-3 h-3 rounded-full opacity-55 animate-float transition-all duration-300 ${
            isDarkMode ? 'bg-indigo-300' : 'bg-indigo-600'
          }`} style={{ animationDelay: '1.2s' }}></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl border transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/30 border-gray-700/30'
              : 'bg-white/30 border-white/40'
          }`}>
            <div className="absolute inset-0 glass-shimmer opacity-30"></div>

            <div className="relative z-10">
              <h2 className={`text-3xl font-bold mb-4 text-center transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>About Me</h2>
              <div className="flex items-center justify-center gap-2 mb-12">
                <MapPin size={20} className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>Fall City, Washington</span>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="glass rounded-2xl p-2 overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={`mb-6 text-lg leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-600'
                  }`}>
                    Based in <span className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-indigo-600'}`}>Fall City, Washington</span>, I'm a{' '}
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Technical Product Manager</span> and{' '}
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Software Developer</span> with a focus on{' '}
                    <span className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-indigo-600'}`}>AI-driven solutions</span> and{' '}
                    <span className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-indigo-600'}`}>scalable backend architectures</span>.
                    I've led multiple projects, optimized cloud-based systems, and founded innovative startups like{' '}
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Tan.ai</span>,{' '}
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>PlanGenie</span>, and{' '}
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Vcrypt Software LLC</span>.
                  </p>
                  <div className="space-y-4">
                    <div className={`glass-card p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-900/30 border-gray-700/30'
                        : 'bg-white/30 border-white/40'
                    }`}>
                      <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Programming Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Python', 'Rust', 'TypeScript', 'C', 'JavaScript', 'C++', 'SQL'].map((skill) => (
                          <span key={skill} className={`glass-button px-3 py-1 rounded-full text-sm backdrop-blur-sm border transition-all duration-300 ${
                            isDarkMode
                              ? 'text-blue-300 border-gray-700/30'
                              : 'text-blue-600 border-white/40'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`glass-card p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-900/30 border-gray-700/30'
                        : 'bg-white/30 border-white/40'
                    }`}>
                      <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Frameworks & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {['React Native', 'React', 'Node.js', 'Docker', 'PostgreSQL', 'Discord API', 'Selenium', 'Playwright', 'Stripe', 'Auth0', 'Supabase'].map((tool) => (
                          <span key={tool} className={`glass-button px-3 py-1 rounded-full text-sm backdrop-blur-sm border transition-all duration-300 ${
                            isDarkMode
                              ? 'text-green-300 border-gray-700/30'
                              : 'text-green-600 border-white/40'
                          }`}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`glass-card p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-900/30 border-gray-700/30'
                        : 'bg-white/30 border-white/40'
                    }`}>
                      <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Systems & Architecture</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Systems Programming', 'Multi-threading', 'Memory Management', 'Network Programming', 'File Systems', 'AWS', 'Azure', 'Docker'].map((item) => (
                          <span key={item} className={`glass-button px-3 py-1 rounded-full text-sm backdrop-blur-sm border transition-all duration-300 ${
                            isDarkMode
                              ? 'text-red-300 border-gray-700/30'
                              : 'text-red-600 border-white/40'
                          }`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`glass-card p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-900/30 border-gray-700/30'
                        : 'bg-white/30 border-white/40'
                    }`}>
                      <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Specialized Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['AI Integration', 'Financial Markets', 'Cloud Architecture', 'Product Management', 'API Design'].map((item) => (
                          <span key={item} className={`glass-button px-3 py-1 rounded-full text-sm backdrop-blur-sm border transition-all duration-300 ${
                            isDarkMode
                              ? 'text-amber-300 border-gray-700/30'
                              : 'text-amber-600 border-white/40'
                          }`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* In Development Section */}
          <div className={`glass-card rounded-2xl p-6 mb-8 text-center backdrop-blur-xl border transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/30 border-gray-700/30'
              : 'bg-white/30 border-white/40'
          }`}>
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>In Development</h2>
          </div>
          <div className="flex flex-col gap-8">
            <ProjectCard
              title="TradeMind"
              description="TradeMind is a smart trading journal and analytics platform helping traders boost profitability through automation and behavioral insights. Launched in 2025, it’s already serving 1,000+ monthly active users and partnering with enterprise clients."
              image="https://wxvmssqfidodxyoxjtju.supabase.co/storage/v1/object/public/non-protected-route-imgs/Landing-Page/image-dashboard.png"
              tags={[
                { text: 'React', color: 'blue' },
                { text: 'TypeScript', color: 'blue' },
                { text: 'Node.js', color: 'blue' },
                { text: 'PostgreSQL', color: 'green' },
                { text: 'AI Analytics', color: 'red' },
                { text: 'AWS', color: 'green' }
              ]}
              githubUrl=""
              liveUrl="https://trademind.pro"
              linkedinUrl=""
              //disclaimer="Note: The current website is an early beta version, currently working on phase 2 of development."
              isDarkMode={isDarkMode}
            />
           
            <ProjectCard
              title="PlanGenie"
              description="An AI-powered task management platform built specifically for neurodivergent minds. PlanGenie adapts to your unique thought process, helping break down complex tasks and providing a natural organization flow that works with your cognitive style."
              image={planGenieImage}
              tags={[
                { text: 'AI Agent', color: 'red' },

                { text: 'React', color: 'blue' },
                { text: 'TypeScript', color: 'blue' },
                { text: 'Node.js', color: 'blue' },
                { text: 'LLM Integration', color: 'red' },
                { text: 'iOS', color: 'green' },
                { text: 'Accessibility', color: 'yellow' },
                { text: 'Fullstack', color: 'green' }
              ]}
              githubUrl=""
              liveUrl="https://plangenie.net"
              linkedinUrl=""
              //comingSoon={true}
              disclaimer="Currently in early development. Developing the mobile app currently."
              isDarkMode={isDarkMode}
            />
             <ProjectCard
              title="Tan.ai"
              description="An AI-driven iOS app offering personalized tanning advice using custom-trained models. Currently in beta testing phase with planned release in Summer 2024."
              image={tanaiImage}
              tags={[
                { text: 'AI', color: 'red' },
                { text: 'iOS', color: 'blue' },
                { text: 'AWS', color: 'green' },
                { text: 'PostgreSQL', color: 'green' },
                { text: 'Docker', color: 'green' },
                { text: 'React Native', color: 'blue' },
                { text: 'Beta', color: 'yellow' }
              ]}
              githubUrl=""
              liveUrl="https://tanai.app/"
              linkedinUrl="https://www.linkedin.com/feed/update/urn:li:activity:7238027109045088256/"
              comingSoon={true}
              disclaimer="Note: The current website is an early demo version and is outdated. It serves only as a preliminary showcase of the concept. My main focus is on the app development."
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Employment Section */}
          <div className="mt-32 mb-12">
            <div className={`glass-card rounded-2xl p-6 text-center backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-900/30 border-gray-700/30'
                : 'bg-white/30 border-white/40'
            }`}>
              <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Employment</h2>
              <p className={`max-w-2xl mx-auto transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Current professional roles and responsibilities.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <ProjectCard
              title="Vcrypt Software"
              description="Cloud-based trading algorithms with Rust backend and React Native frontend."
              image={vcryptImage}
              tags={[
                { text: 'Rust', color: 'blue' },
                { text: 'React Native', color: 'blue' },
                { text: 'Stripe', color: 'green' },
                { text: 'PostgreSQL', color: 'green' },
                { text: 'Python', color: 'blue' },
                { text: 'Docker', color: 'green' },
                { text: 'Product Management', color: 'yellow' }
              ]}
              githubUrl=""
              liveUrl="https://vcryptfinancial.com"
              linkedinUrl="https://www.linkedin.com/company/vcrypt"
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Featured Projects Section */}
          <div className="mt-32 mb-12">
            <div className={`glass-card rounded-2xl p-6 text-center backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-900/30 border-gray-700/30'
                : 'bg-white/30 border-white/40'
            }`}>
              <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Featured Projects</h2>
              <p className={`max-w-2xl mx-auto transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Notable personal and professional projects.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <ProjectCard
              title="Crypto Mining Monitor Bot"
              description="A comprehensive Discord bot for monitoring cryptocurrency mining operations, specifically designed for Litecoin (LTC) and Dogecoin (DOGE) mining through litecoinpool.org. Features real-time profitability monitoring, worker status tracking, and automated alerts."
              image={cryptoMinerImage}
              tags={[
                { text: 'Python', color: 'blue' },
                { text: 'Docker', color: 'green' },
                { text: 'Cryptocurrency', color: 'red' },
                { text: 'API Integration', color: 'green' },
                { text: 'Real-time Monitoring', color: 'red' }
              ]}
              githubUrl="https://github.com/EClinick/litecoinpool-bot"
              liveUrl=""
              linkedinUrl=""
              isDarkMode={isDarkMode}
            />
            <ProjectCard
              title="Options Trading Club"
              description="Automated financial market data scraper using Python for daily trading insights."
              image={tradingImage}
              tags={[
                { text: 'Python', color: 'blue' },
                { text: 'Selenium', color: 'green' },
                { text: 'Playwright', color: 'green' }
              ]}
              githubUrl=""
              liveUrl=""
              linkedinUrl="https://www.linkedin.com/company/oregon-state-options-trading-club/"
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Academic Projects Section */}
          <div className="mt-32 mb-12">
            <div className={`glass-card rounded-2xl p-6 text-center backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-900/30 border-gray-700/30'
                : 'bg-white/30 border-white/40'
            }`}>
              <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Academic Projects</h2>
              <p className={`max-w-2xl mx-auto transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Notable academic projects showcasing technical skills and programming concepts.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <ProjectCard
              title="Operating Systems I (CS374)"
              description="A comprehensive systems programming course implementation featuring 5 assignments covering various OS concepts. Includes parallel implementations in both C and Rust, demonstrating low-level system operations and memory management."
              image={`https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png`}
              tags={[
                { text: 'C', color: 'blue' },
                { text: 'Rust', color: 'red' },
                { text: 'Systems Programming', color: 'green' },
                { text: 'Multi-threading', color: 'yellow' },
                { text: 'Memory Management', color: 'green' },
                { text: 'Network Programming', color: 'blue' },
                { text: 'File Systems', color: 'yellow' }
              ]}
              githubUrl="https://github.com/EClinick/OS1/"
              disclaimer="Course projects demonstrating fundamental OS concepts including process management, threading, networking, and file systems."
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className={`glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-xl border transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/30 border-gray-700/30'
              : 'bg-white/30 border-white/40'
          }`}>
            <div className="absolute inset-0 glass-shimmer opacity-30"></div>

            <div className="relative z-10">
              <h2 className={`text-3xl font-bold mb-8 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Get In Touch</h2>
              <p className={`mb-8 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Interested in collaborating or discussing a new project? Let's connect!
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <a
                  href="mailto:clinicke@oregonstate.edu"
                  className={`glass-button flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white border-gray-700/30'
                      : 'text-slate-600 hover:text-slate-800 border-white/40'
                  }`}
                >
                  <Mail size={24} />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com/eclinick"
                  className={`glass-button flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white border-gray-700/30'
                      : 'text-slate-600 hover:text-slate-800 border-white/40'
                  }`}
                >
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/ethanclinick"
                  className={`glass-button flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white border-gray-700/30'
                      : 'text-slate-600 hover:text-slate-800 border-white/40'
                  }`}
                >
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`glass rounded-2xl p-6 text-center backdrop-blur-xl border transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/30 border-gray-700/30'
              : 'bg-white/30 border-white/40'
          }`}>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>© 2025 Ethan Clinick. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
