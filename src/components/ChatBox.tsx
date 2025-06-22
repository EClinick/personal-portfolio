import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, ChatBoxProps, SYSTEM_CONTEXT } from '../types/types'; 


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

export default function ChatBox({ isOpen, onClose, isDarkMode = false }: ChatBoxProps) {
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
                return <code className={`glass-button px-2 py-1 rounded transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>{children}</code>;
              }
              return (
                <div className="my-4">
                  <pre className="glass-card p-4 rounded-xl overflow-x-auto">
                    <code className={className}>{children}</code>
                  </pre>
                </div>
              );
            },
            blockquote: ({children}) => (
              <blockquote className={`glass-card border-l-4 pl-4 my-4 italic rounded-r-lg transition-all duration-300 ${
                isDarkMode
                  ? 'border-blue-400/50'
                  : 'border-slate-400/50'
              }`}>
                {children}
              </blockquote>
            ),
            a: ({href, children}) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:underline transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
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
    <div className={`fixed inset-0 md:inset-auto md:bottom-8 md:right-8 w-full md:w-[400px] h-screen md:h-auto md:max-h-[80vh] glass-modal rounded-none md:rounded-2xl shadow-glass-lg flex flex-col z-50 overflow-hidden transition-all duration-300 ${
      isDarkMode
        ? 'bg-gray-900/30 border-gray-700/30'
        : 'bg-white/30 border-white/40'
    }`}>
      <div className={`sticky top-0 p-4 flex justify-between items-center glass-nav rounded-t-2xl z-10 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-900/30 border-gray-700/30'
          : 'bg-white/30 border-white/40'
      }`}>
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>Chat with AI Assistant</h3>
        <div className="flex gap-2">
          <button
            onClick={handleClearChat}
            className={`glass-button p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'text-gray-400 hover:text-red-400'
                : 'text-slate-500 hover:text-red-500'
            }`}
            title="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={onClose}
            className={`glass-button p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className={`glass-card border rounded-xl p-3 text-sm transition-all duration-300 ${
            isDarkMode
              ? 'border-red-500/30 text-red-300'
              : 'border-red-400/30 text-red-600'
          }`}>
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
              className={`max-w-[85%] rounded-xl p-3 transition-all duration-300 ${
                message.role === 'user'
                  ? isDarkMode
                    ? 'glass-button bg-blue-500/20 text-white border border-blue-400/30'
                    : 'glass-button bg-slate-600/20 text-slate-800 border border-slate-400/30'
                  : isDarkMode
                    ? 'glass-card text-gray-200'
                    : 'glass-card text-slate-700'
              }`}
            >
              {renderMessage(message)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`glass-card rounded-xl p-3 transition-all duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-slate-700'
            }`}>
              <div className="flex space-x-2">
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  isDarkMode ? 'bg-blue-400' : 'bg-slate-600'
                }`} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  isDarkMode ? 'bg-blue-400' : 'bg-slate-600'
                }`} style={{ animationDelay: '0.2s' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  isDarkMode ? 'bg-blue-400' : 'bg-slate-600'
                }`} style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`sticky bottom-0 glass-nav rounded-b-2xl transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-900/30 border-gray-700/30'
          : 'bg-white/30 border-white/40'
      }`}>
        <form onSubmit={sendMessage} className="p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-1 glass-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 ${
                isDarkMode
                  ? 'text-white focus:ring-blue-400/50 placeholder-gray-400'
                  : 'text-slate-800 focus:ring-slate-400/50 placeholder-slate-500'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`glass-button rounded-xl px-4 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'text-white hover:bg-blue-500/30'
                  : 'text-slate-800 hover:bg-slate-500/30'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 