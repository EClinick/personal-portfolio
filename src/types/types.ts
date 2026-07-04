export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent?: {
    id: string;
    label: string;
  };
};

export type BlogContext = {
  title: string;
  content: string;
  excerpt: string;
};

export type ChatBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  initialMessage?: string;
  blogContext?: BlogContext;
};

export const SYSTEM_CONTEXT = {
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
      summary: "I'm an AI Engineer at Seeq and an independent software engineering consultant. Previously, I built software at Microsoft. I work at the intersection of applied AI, thoughtful product engineering, and real operational problems.",
      experience: [
        {
          role: "Co-founder/President of Algorithms and Analytics",
          company: "Vcrypt Software LLC",
          location: "Corvallis, OR",
          dates: "January 2024 - Present",
          responsibilities: [
            "Led the development of backend systems for financial market data solutions using Rust and Python",
            "Integrated Stripe for payments and OAuth for secure authentication",
            "Designed and deployed trading algorithms, including long-term, intra-week, and high-frequency strategies",
            "Enhanced data processing efficiency by 30% through algorithm optimization",
            "Secured initial funding by demonstrating business acumen and algorithmic performance"
          ],
          links: [
            // {
            //   name: "Website",
            //   url: "https://vcryptfinancial.com"
            // },
            // {
            //   name: "LinkedIn",
            //   url: "https://www.linkedin.com/company/vcrypt"
            // }
          ]
        },
        {
            "role": "Software Engineer",
            "company": "Seeq Corporation",
            "location": "Remote / Seattle, WA",
            "dates": "April 2025 – Present",
            "responsibilities": [
              "Built and scaled Agent Builder, Seeq’s visual workflow canvas for turning expert industrial workflows into reusable AI agents; enabled users to compose multi-step analyses, connect Seeq context and Data Lab tools, reuse workflow templates, and operationalize repeatable decision-support processes inside Seeq Intelligence",
              "Redesigned Seeq’s AI Assistant and shared Intelligence experience, making Agent Q more useful in real industrial workflows by giving it persistent user context, the ability to ask clarifying questions, and support for PDFs, images, and CSVs as inputs so users can get grounded answers from their own data and documents",
              "Built internal AI engineering agents and automations that help Seeq developers investigate PRs, broken builds, vulnerabilities, support tickets, and product bugs faster, improving engineering velocity and reliability for customer-facing AI features"
            ],
            "links": [
              {
                "name": "Company",
                "url": "https://www.seeq.com"
              }
            ]
          },
        {
          role: "Contract Software Engineer",
          company: "Microsoft",
          location: "Redmond, WA",
          dates: "August 2024 – Present",
          responsibilities: [],
          links: [
            {
              name: "Company",
              url: "https://www.microsoft.com"
            }
          ]
        },
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
        "Python (2022)", 
        "Rust (2023)", 
        "AWS (2024)", 
        "React Native (2024)", 
        "OpenAI API (2024)", 
        "Algorithmic trading (2024)",
        "Cloud services (2024)", 
        "Project management (2023)", 
        "Backend development (2023)", 
        "AI and ML models (2023)",
        "Financial data analysis (2024)", 
        "Automation with Selenium and Playwright (2023)",
        "Discord Bot Development (2022)", 
        "Cryptocurrency Mining (2022)", 
        "Real-time Monitoring Systems (2023)"
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
  
