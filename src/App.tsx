import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';

// Comment out the imports temporarily
import profileImage from './assets/profile.jpg';
import tanaiImage from './assets/tanai.jpeg';
import vcryptImage from './assets/vcrypt.png';
import tradingImage from './assets/trading.png';

// Use these constants instead
//const profileImage = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const tanaiImage = "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const vcryptImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
//const tradingImage = "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
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
              Technical Project Manager & Software Developer
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <a
                href="#contact"
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                Resume
              </a>
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
          <h2 className="text-3xl font-bold mb-12 text-center text-white">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-xl shadow-lg"
            />
            <div>
              <p className="text-gray-300 mb-6">
                I'm a Technical Project Manager and Software Developer with a focus on AI-driven solutions and scalable backend architectures. I've led multiple projects, optimized cloud-based systems, and founded innovative startups like Tan.ai and Vcrypt Software LLC.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2 text-white">Skills</h3>
                  <p className="text-gray-300">Python, Rust, Node.js, React Native</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2 text-white">Cloud & Tools</h3>
                  <p className="text-gray-300">AWS, Docker, Git, Stripe</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2 text-white">AI & Data Analysis</h3>
                  <p className="text-gray-300">OpenAI API, Image Analysis, Financial Market Algorithms</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2 text-white">Project Management</h3>
                  <p className="text-gray-300">Agile, Risk Management, SaaS Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Projects</h2>
          <div className="flex flex-col gap-8">
            <ProjectCard
              title="Tan.ai"
              description="An AI-driven iOS app offering personalized tanning advice using custom-trained models."
              image={tanaiImage}
              tags={['AI', 'iOS', 'AWS', 'PostgreSQL', 'Docker', 'React Native']}
              githubUrl="https://github.com"
              liveUrl="https://tanai.app/"
            />
            <ProjectCard
              title="Vcrypt Software"
              description="Cloud-based trading algorithms with Rust backend and React Native frontend."
              image={vcryptImage}
              tags={['Rust', 'React Native', 'Stripe', 'PostgreSQL', 'Python', 'Docker', 'Product Management']}
              githubUrl="https://github.com"
              liveUrl="https://vcryptfinancial.com"
            />
            <ProjectCard
              title="Options Trading Club"
              description="Automated financial market data scraper using Python for daily trading insights."
              image={tradingImage}
              tags={['Python', 'Selenium', 'Playwright']}
              githubUrl="https://github.com"
              liveUrl="https://www.linkedin.com/company/oregon-state-options-trading-club/"
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
    </div>
  );
}

export default App;
