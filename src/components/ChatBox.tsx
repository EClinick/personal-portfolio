import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
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
        ]
      }
    ],
    skills: [
      "Python", "Rust", "AWS", "React Native", "OpenAI API", "Algorithmic trading",
      "Cloud services", "Project management", "Backend development", "AI and ML models",
      "Financial data analysis", "Automation with Selenium and Playwright"
    ]
  },
  instructions: {
    role: "You are an AI assistant representing Ethan Clinick. Your primary purpose is to answer questions about Ethan's professional background, skills, projects, and experience. Use the provided context to give accurate, relevant responses.",
    tone: "professional",
    preferences: [
      "Prioritize responses related to software development, AI solutions, cloud services, algorithmic trading, and product management",
      "Provide technical insights that align with Ethan's expertise",
      "Focus on startup strategies, product optimization, and leveraging AI for business growth",
      "Maintain relevance to his expertise in backend infrastructures, AI, and scalable software architectures"
    ]
  }
};

const API_URL = process.env.NODE_ENV === 'development' 
  ? '/.netlify/functions/chat'  // Local development
  : 'https://ethanclinick.netlify.app/.netlify/functions/chat';  // Production

export default function ChatBox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Chat with AI Assistant</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
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
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {message.content}
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

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
} 