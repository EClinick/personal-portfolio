import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, ChatBoxProps, BlogContext } from '../types/types';
import { AIInput } from './ui/ai-input';
import { AIMessageBubble, AIMessagePanel, AIMessageShell, AIAgentBadge } from './ui/ai-elements';
import { createEnhancedSystemPrompt } from '../prompts/system-prompt-loader'; 


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

export default function ChatBox({ isOpen, onClose, isDarkMode = true, initialMessage, blogContext }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentBlogContext, setCurrentBlogContext] = useState<BlogContext | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitialMessage = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with default greeting when no blog context
  useEffect(() => {
    if (!blogContext) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm Ethan's AI assistant. Feel free to ask me about his experience, projects, or skills in software development, AI solutions, and project management.",
        agent: {
          id: 'general',
          label: 'General Assistant'
        }
      }]);
      setCurrentBlogContext(undefined);
      hasProcessedInitialMessage.current = null;
    }
  }, [blogContext]);

  console.log('ChatBox mounted');
  
  useEffect(() => {
    console.log('ChatBox Configuration:', {
      'API URL': API_URL,
      'Environment': process.env.NODE_ENV,
      'Request URL': new URL(API_URL, window.location.origin).toString()
    });
  }, []);

  // Create system prompt with optional blog context
  const createSystemPromptWithBlogContext = useCallback((context?: BlogContext) => {
    const basePrompt = createEnhancedSystemPrompt();
    
    if (context) {
      return `${basePrompt}

You are also helping the user understand a blog post. Here is the blog context:

Blog Title: ${context.title}
Blog Excerpt: ${context.excerpt}

Blog Content:
${context.content}

When asked to summarize or discuss this blog, provide helpful insights based on the content above. After summarizing, you can continue to answer any follow-up questions about the blog or any other topics related to Ethan's work and experience.`;
    }
    
    return basePrompt;
  }, []);

  const sendMessage = useCallback(async (messageContent: string, contextOverride?: BlogContext) => {
    if (!messageContent.trim()) return;

    const activeContext = contextOverride || currentBlogContext;
    
    setError(null);
    const userMessage: Message = {
      role: 'user' as const,
      content: messageContent
    };
    
    setMessages(prev => [...prev, userMessage]);
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
              content: createSystemPromptWithBlogContext(activeContext)
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 4000,
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
        content: data.choices[0].message.content,
        agent: data.agent ?? undefined
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
  }, [messages, currentBlogContext, createSystemPromptWithBlogContext]);

  // Handle initial message with blog context
  useEffect(() => {
    if (isOpen && blogContext && initialMessage && hasProcessedInitialMessage.current !== blogContext.title) {
      // Set the blog context for future messages
      setCurrentBlogContext(blogContext);
      hasProcessedInitialMessage.current = blogContext.title;
      
      // Clear previous messages and send the initial summarize request
      setMessages([]);
      
      // Small delay to ensure state is updated before sending
      setTimeout(() => {
        sendMessage(initialMessage, blogContext);
      }, 100);
    }
  }, [isOpen, blogContext, initialMessage, sendMessage]);

  const renderMessage = (message: Message) => {
    if (message.role === 'assistant') {
      const formattedContent = formatAIResponse(message.content);
      return (
        <ReactMarkdown
          components={{
            p: ({children}) => (
              <p className="mb-4 last:mb-0 text-sm leading-relaxed text-gray-200">{children}</p>
            ),
            h1: ({children}) => (
              <h1 className="text-xl font-bold mb-4 mt-6 text-white">{children}</h1>
            ),
            h2: ({children}) => (
              <h2 className="text-lg font-bold mb-3 mt-5 text-white">{children}</h2>
            ),
            h3: ({children}) => (
              <h3 className="text-md font-semibold mb-2 mt-4 text-white">{children}</h3>
            ),
            ul: ({children}) => (
              <ul className="list-disc pl-5 mb-4 space-y-2 marker:text-gray-500">{children}</ul>
            ),
            ol: ({children}) => (
              <ol className="list-decimal pl-5 mb-4 space-y-2 marker:text-gray-500">{children}</ol>
            ),
            li: ({children}) => (
              <li className="mb-1 text-sm leading-relaxed text-gray-200">{children}</li>
            ),
            code: ({inline, className, children}: {inline?: boolean, className?: string, children?: React.ReactNode}) => {
              if (inline) {
                return <code className="bg-gray-800 text-orange-400 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
              }
              return (
                <div className="my-4">
                  <pre className="bg-gray-900 border border-gray-800 p-4 rounded-lg overflow-x-auto">
                    <code className={`${className} text-sm font-mono`}>{children}</code>
                  </pre>
                </div>
              );
            },
            blockquote: ({children}) => (
              <blockquote className="border-l-2 border-gray-600 pl-4 my-4 text-gray-300">
                {children}
              </blockquote>
            ),
            a: ({href, children}) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 hover:underline transition-colors duration-200"
              >
                {children}
              </a>
            ),
            strong: ({children}) => (
              <strong className="font-bold text-white">{children}</strong>
            ),
          }}
        >
          {formattedContent}
        </ReactMarkdown>
      );
    }
    
    return (
      <p className="whitespace-pre-wrap break-words text-sm">{message.content}</p>
    );
  };

  const handleClearChat = () => {
    setMessages([{
      role: 'assistant',
      content: currentBlogContext 
        ? `Chat cleared. I still have context about the blog "${currentBlogContext.title}". Feel free to ask more questions about it or anything else!`
        : "Hi! I'm Ethan's AI assistant. Feel free to ask me about his experience, projects, or skills in software development, AI solutions, and project management.",
      agent: {
        id: 'general',
        label: 'General Assistant'
      }
    }]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed ${
      isFullscreen 
        ? 'inset-0 w-full h-screen rounded-none' 
        : 'inset-0 md:inset-auto md:bottom-8 md:right-8 w-full md:w-[480px] h-screen md:h-auto md:max-h-[80vh] rounded-none md:rounded-2xl'
    } bg-black border border-gray-800 shadow-2xl flex flex-col z-50 overflow-hidden transition-all duration-300`}>
      <div className="sticky top-0 p-6 flex justify-between items-center bg-black border-b border-gray-800 rounded-t-2xl z-10">
        <div className="flex items-center space-x-4">
          <div className="text-2xl text-white">✱</div>
          <h3 className="text-xl font-light text-white">
            Ethan&apos;s <span className="font-semibold">ASSISTANT</span>
          </h3>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleClearChat}
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="hidden md:block text-gray-400 hover:text-blue-500 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-black">
        <div className={`${
          isFullscreen 
            ? 'max-w-4xl mx-auto px-6 py-6' 
            : 'p-6'
        } space-y-4`}>
          {error && (
            <div className="bg-gray-900 border border-red-500/30 rounded-xl p-4 text-sm text-red-300">
              {error}
            </div>
          )}
          {messages.map((message, index) => (
            <AIMessageShell
              key={index}
              role={message.role === 'user' ? 'user' : 'assistant'}
            >
              {message.role === 'user' ? (
                <AIMessageBubble>
                  {renderMessage(message)}
                </AIMessageBubble>
              ) : (
                <AIMessagePanel className={`${isFullscreen ? 'max-w-[90%]' : 'w-full'}`}>
                  {message.agent?.label && (
                    <AIAgentBadge label={message.agent.label} />
                  )}
                  {renderMessage(message)}
                </AIMessagePanel>
              )}
            </AIMessageShell>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 py-2">
                <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500" />
                <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-black border-t border-gray-800 rounded-b-2xl">
        <div className={`${
          isFullscreen 
            ? 'max-w-4xl mx-auto' 
            : ''
        }`}>
          <AIInput
            placeholder="Ask anything"
            onSubmit={sendMessage}
            isDarkMode={true}
            className="px-4 py-3"
            minHeight={44}
            maxHeight={120}
          />
        </div>
      </div>
    </div>
  );
} 
