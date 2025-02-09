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

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onChatClick={toggleChat} />
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ethan Clinick
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Technical Product Manager & Software Developer
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <a
                href="#contact"
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                Get in touch
              </a>
              {/* <a
                href="/resume.pdf"
                download
                className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                Resume
              </a> */}
            </div>
            <a href="#about" className="animate-bounce inline-block">
              <ArrowDown size={24} className="text-indigo-600" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">About Me</h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            <MapPin size={20} className="text-indigo-400" />
            <span className="text-lg text-gray-300">Fall City, Washington</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-xl shadow-lg"
            />
            <div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Based in <span className="text-indigo-400 font-medium">Fall City, Washington</span>, I'm a{' '}
                <span className="text-white font-semibold">Technical Product Manager</span> and{' '}
                <span className="text-white font-semibold">Software Developer</span> with a focus on{' '}
                <span className="text-indigo-400 font-medium">AI-driven solutions</span> and{' '}
                <span className="text-indigo-400 font-medium">scalable backend architectures</span>. 
                I've led multiple projects, optimized cloud-based systems, and founded innovative startups like{' '}
                <span className="text-white font-semibold">Tan.ai</span>,{' '}
                <span className="text-white font-semibold">PlanGenie</span>, and{' '}
                <span className="text-white font-semibold">Vcrypt Software LLC</span>.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-3 text-white">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Rust', 'TypeScript', 'C', 'JavaScript', 'C++', 'SQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-3 text-white">Frameworks & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React Native', 'React', 'Node.js', 'Docker', 'PostgreSQL', 'Discord API', 'Selenium', 'Playwright', 'Stripe', 'Auth0', 'Supabase'].map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-3 text-white">Systems & Architecture</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Systems Programming', 'Multi-threading', 'Memory Management', 'Network Programming', 'File Systems', 'AWS', 'Azure', 'Docker'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-3 text-white">Specialized Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['AI Integration', 'Financial Markets', 'Cloud Architecture', 'Product Management', 'API Design'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900 px-4">
        <div className="max-w-3xl mx-auto">
          {/* In Development Section */}
          <h2 className="text-3xl font-bold mb-12 text-center text-white">In Development</h2>
          <div className="flex flex-col gap-8">
            <ProjectCard
              title="TradeMind"
              description="A comprehensive trading journal application designed to help traders track, analyze, and improve their trading performance through detailed analytics and AI-powered insights."
              image={trademindImage}
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
              disclaimer="Note: The current website is an early beta version, currently working on phase 2 of development."
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
            />
          </div>

          {/* Employment Section */}
          <div className="mt-32 mb-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-6 text-3xl font-bold text-white">
                Employment
              </span>
            </div>
            <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
              Current professional roles and responsibilities.
            </p>
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
            />
          </div>

          {/* Featured Projects Section */}
          <div className="mt-32 mb-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-6 text-3xl font-bold text-white">
                Featured Projects
              </span>
            </div>
            <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
              Notable personal and professional projects.
            </p>
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
            />
          </div>

          {/* Academic Projects Section */}
          <div className="mt-32 mb-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-6 text-3xl font-bold text-white">
                Academic Projects
              </span>
            </div>
            <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
              Notable academic projects showcasing technical skills and programming concepts.
            </p>
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
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Get In Touch</h2>
          <p className="text-gray-300 mb-8">
            Interested in collaborating or discussing a new project? Let's connect!
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:clinicke@oregonstate.edu"
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              <Mail size={24} />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/ethanclinick"
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/ethanclinick"
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 bg-gray-900">
        <p>© 2024 Ethan Clinick. All rights reserved.</p>
      </footer>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
