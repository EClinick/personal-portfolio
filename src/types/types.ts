export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
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
        },
        {
            "role": "Software Engineer",
            "company": "Seeq Corporation",
            "location": "Remote / Seattle, WA",
            "dates": "April 2025 – Present",
            "responsibilities": [
              "Led AI integration initiatives across Seeq’s platform, including internal Copilot development for data analysis and time series workflows",
              "Enhanced interoperability with Microsoft’s ecosystem (Teams, Outlook, Azure) using custom APIs and AI assistants",
              "Developed backend features using TypeScript, Python, and Gradle in a large-scale monorepo",
              "Improved developer productivity by optimizing LLM prompt chains, formatting logic, and retrieval-based agents",
              "Created automated testing frameworks for UI components and backend logic with Playwright and Jest"
            ],
            "links": [
              {
                "name": "Company",
                "url": "https://www.seeq.com"
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
  