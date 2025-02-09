import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const SYSTEM_CONTEXT = {
  context: {
    name: "Ethan Clinick",
    location: "Fall City, Washington",
    email: "clinicke@oregonstate.edu",
    phone: "(425) 214-3844",
    linkedin: "https://www.linkedin.com/in/ethanclinick",
    education: {
      degree: "Bachelor of Science",
      major: "Computer Science",
      university: "Oregon State University",
      years: "2022-2026"
    },
    summary: "Technical Product Manager with expertise in software development and AI-driven solutions, skilled in scalable backend infrastructures and cloud services. Experienced in leading cross-functional teams, optimizing system performance, and delivering impactful B2B SaaS products. Adept at project planning, risk management, and ensuring timely delivery of high-quality solutions in fast-paced, innovation-driven environments.",
    experience: [
      {
        role: "Founder",
        company: "Tan.ai",
        location: "Fall City, WA",
        dates: "July 2024 - Present",
        responsibilities: [
          "Developed and launched an AI-driven iOS application providing personalized tanning advice",
          "Created a secure, account-free authentication process using UUID-based user identification",
          "Optimized backend architecture through AWS integration, enhancing data security and reducing latency by 25%",
          "Implemented a custom-trained AI model for skin tone detection using OpenAI's API",
          "Utilized image analysis techniques to generate data-driven user insights"
        ],
        links: [
          {
            name: "Website",
            url: "https://tanai.app"
          },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/feed/update/urn:li:activity:7238027109045088256/"
          }
        ]
      },  
      {
        "role": "Founder",
        "company": "PlanGenie",
        "location": "Fall City, WA",
        "dates": "November 2024 - Present",
        "responsibilities": [
          "Conceptualized and developed an AI-powered task management platform tailored for neurodivergent individuals",
          "Integrated advanced AI models for intelligent task breakdown and scheduling",
          "Designed a user-friendly interface to facilitate natural task creation and organization for individuals with ADHD",
          "Implemented features like interactive timeline views, multi-calendar synchronization, and customizable notifications",
          "Developed scalable backend architecture supporting secure user authentication and subscription-based services",
          "Collaborated with neurodivergent communities to ensure the platform meets their unique needs and challenges"
        ],
        "links": [
          {
            "name": "Website",
            "url": "https://plangenie.net"
          },

        ]
      },
      {
        role: "Co-founder/President of Algorithms and Analytics",
        company: "Vcrypt Software LLC",
        location: "Corvallis, OR",
        dates: "January 2024 - Present",
        responsibilities: [
          "Led the development of backend systems for financial market data solutions using Rust, Python, and React Native",
          "Integrated Stripe for payments and OAuth for secure authentication",
          "Designed and deployed trading algorithms, including long-term, intra-week, and high-frequency strategies",
          "Enhanced data processing efficiency by 30% through algorithm optimization",
          "Secured initial funding by demonstrating business acumen and algorithmic performance"
        ],
        links: [
          {
            name: "Website",
            url: "https://vcryptfinancial.com"
          },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/vcrypt"
          }
        ]
      }
    ],
    projects: [
      {
        name: "Crypto Mining Monitor Bot",
        description: "A comprehensive Discord bot for monitoring cryptocurrency mining operations",
        technologies: ["Python", "Discord.py", "Docker", "API Integration"],
        features: [
          "Real-time mining profitability monitoring for LTC & DOGE",
          "Automated worker status tracking with 30-second intervals",
          "Instant notifications for offline/online workers",
          "Price tracking and daily profit calculations",
          "Comprehensive Discord command interface"
        ],
        githubUrl: "https://github.com/EClinick/litecoinpool-bot",
        status: "Active"
      },
      {
        name: "Trademind",
        description: "An AI-driven trading journaling platform that provides predictive insights and a comprehensive interface for users to track their portfolios. It is a subdivision of Vcrypt Software LLC, with the goal to combine the two to integrate a algorithmic trading platform.",
        technologies: ["AI", "Predictive Analytics", "Portfolio Tracking"],
        features: [
          "Real-time market analysis",
          "Automated trade tracking",
          "Comprehensive trading journal",
          "Portfolio performance metrics",
          "User-friendly interface"
        ],
        links: [
          {
            name: "Website",
            url: "https://trademind.pro"
          }
        ]
      }
    ],
    
    skills: [
      "Python", "Rust", "AWS", "React Native", "OpenAI API", "Algorithmic trading",
      "Cloud services", "Project management", "Backend development", "AI and ML models",
      "Financial data analysis", "Automation with Selenium and Playwright",
      "Discord Bot Development", "Cryptocurrency Mining", "Real-time Monitoring Systems"
    ]
  },
  instructions: {
    role: "You are an AI assistant representing Ethan Clinick. Your primary purpose is to answer questions about Ethan's professional background, skills, projects, and experience. Use the provided context to give accurate, relevant responses.",
    tone: "professional",
    preferences: [
      "Prioritize responses related to software development, AI solutions, cloud services, algorithmic trading, and product management",
      "Provide technical insights that align with Ethan's expertise",
      "Focus on startup strategies, product optimization, and leveraging AI for business growth",
      "Maintain relevance to his expertise in backend infrastructures, AI, and scalable software architectures",
      "Highlight experience with cryptocurrency and automated monitoring systems"
    ]
  }
};

const API_URL = process.env.NODE_ENV === 'development' 
  ? '/.netlify/functions/chat'  // Local development
  : 'https://ethanclinick.netlify.app/.netlify/functions/chat';  // Production

// Helper function to format AI responses
const formatAIResponse = (text: string): string => {
  // Add double line breaks between sections
  text = text.replace(/\n(?=[A-Z])/g, '\n\n');
  
  // Add spacing after punctuation if missing
  text = text.replace(/([.!?])([A-Z])/g, '$1\n\n$2');
  
  // Ensure proper spacing around lists
  text = text.replace(/([.!?])\n([•\-*])/g, '$1\n\n$2');
  
  // Add spacing around code blocks
  text = text.replace(/```/g, '\n```\n');
  
  // Ensure proper spacing after headings
  text = text.replace(/(?:^|\n)(#{1,6} .+)\n(?!\n)/g, '$1\n\n');
  
  return text.trim();
};

export default function ChatBox({ isOpen, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Ethan's AI assistant. Feel free to ask me about his experience, projects, or skills in software development, AI solutions, and project management."
    }]);
  }, []);

  console.log('ChatBox mounted');
  
  useEffect(() => {
    console.log('ChatBox Configuration:', {
      'API URL': API_URL,
      'Environment': process.env.NODE_ENV,
      'Request URL': new URL(API_URL, window.location.origin).toString()
    });
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError(null);
    const userMessage: Message = {
      role: 'user' as const,
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system' as const,
              content: JSON.stringify(SYSTEM_CONTEXT)
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 1000,
          model: "gpt-4o-mini"
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format');
      }

      const assistantMessage: Message = {
        role: 'assistant' as const,
        content: data.choices[0].message.content
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      const errorMessage: Message = {
        role: 'assistant' as const,
        content: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const renderMessage = (message: Message) => {
    if (message.role === 'assistant') {
      const formattedContent = formatAIResponse(message.content);
      return (
        <ReactMarkdown
          components={{
            p: ({children}) => (
              <p className="mb-4 last:mb-0">{children}</p>
            ),
            h1: ({children}) => (
              <h1 className="text-xl font-bold mb-4 mt-6">{children}</h1>
            ),
            h2: ({children}) => (
              <h2 className="text-lg font-bold mb-3 mt-5">{children}</h2>
            ),
            h3: ({children}) => (
              <h3 className="text-md font-bold mb-2 mt-4">{children}</h3>
            ),
            ul: ({children}) => (
              <ul className="list-disc pl-4 mb-4 space-y-2">{children}</ul>
            ),
            ol: ({children}) => (
              <ol className="list-decimal pl-4 mb-4 space-y-2">{children}</ol>
            ),
            li: ({children}) => (
              <li className="mb-1">{children}</li>
            ),
            code: ({inline, className, children}) => {
              if (inline) {
                return <code className="bg-gray-800 px-1 py-0.5 rounded">{children}</code>;
              }
              return (
                <div className="my-4">
                  <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                    <code className={className}>{children}</code>
                  </pre>
                </div>
              );
            },
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic">
                {children}
              </blockquote>
            ),
            a: ({href, children}) => (
              <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                {children}
              </a>
            ),
          }}
        >
          {formattedContent}
        </ReactMarkdown>
      );
    }
    
    return (
      <p className="whitespace-pre-wrap break-words">{message.content}</p>
    );
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 w-full md:w-[400px] h-screen md:h-auto md:max-h-[80vh] bg-gray-900 rounded-none md:rounded-lg shadow-xl flex flex-col z-50 overflow-hidden">
      <div className="sticky top-0 p-4 flex justify-between items-center bg-gray-900 z-10">
        <h3 className="text-lg font-semibold text-white">Chat with AI Assistant</h3>
        <div className="flex gap-2">
          <button
            onClick={handleClearChat}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl md:text-xl p-2"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {renderMessage(message)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-gray-900">
        <form onSubmit={sendMessage} className="p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white rounded-lg px-4 py-3 hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 