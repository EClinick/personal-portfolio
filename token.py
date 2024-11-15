import tiktoken

# Load the encoding for the GPT-3.5/4 model
encoding = tiktoken.encoding_for_model("gpt-4")

# The JSON string to be tokenized
json_string = """
{
  "context": {
    "name": "Ethan Clinick",
    "location": "Fall City, Washington",
    "email": "clinicke@oregonstate.edu",
    "phone": "(425) 214-3844",
    "linkedin": "https://www.linkedin.com/in/ethanclinick",
    "education": {
      "degree": "Bachelor of Science",
      "major": "Computer Science",
      "university": "Oregon State University",
      "years": "2022-2026"
    },
    "summary": "Technical Project Manager with expertise in software development and AI-driven solutions, skilled in scalable backend infrastructures and cloud services. Experienced in leading cross-functional teams, optimizing system performance, and delivering impactful B2B SaaS products. Adept at project planning, risk management, and ensuring timely delivery of high-quality solutions in fast-paced, innovation-driven environments."
  },
  "experience": [
    {
      "role": "Founder",
      "company": "Tan.ai",
      "location": "Fall City, WA",
      "dates": "July 2024 - Present",
      "responsibilities": [
        "Developed and launched an AI-driven iOS application providing personalized tanning advice.",
        "Created a secure, account-free authentication process using UUID-based user identification.",
        "Optimized backend architecture through AWS integration, enhancing data security and reducing latency by 25%.",
        "Implemented a custom-trained AI model for skin tone detection using OpenAI's API.",
        "Utilized image analysis techniques to generate data-driven user insights."
      ]
    },
    {
      "role": "Co-founder/President of Algorithms and Analytics",
      "company": "Vcrypt Software LLC",
      "location": "Corvallis, OR",
      "dates": "January 2024 - Present",
      "responsibilities": [
        "Led the development of backend systems for financial market data solutions using Rust, Python, and React Native.",
        "Integrated Stripe for payments and OAuth for secure authentication.",
        "Designed and deployed trading algorithms, including long-term, intra-week, and high-frequency strategies.",
        "Enhanced data processing efficiency by 30% through algorithm optimization.",
        "Secured initial funding by demonstrating business acumen and algorithmic performance."
      ]
    },
    {
      "role": "Founder",
      "company": "Bobcat Trading",
      "location": "Corvallis, OR",
      "dates": "December 2023 - Present",
      "responsibilities": [
        "Established a financial community of over 30 college students focused on market arbitrage alerts.",
        "Automated financial data collection and analysis using Python and financial APIs.",
        "Developed a revenue model using a tested arbitrage strategy, generating consistent monthly income."
      ]
    }
  ],
  "skills": [
    "Python",
    "Rust",
    "AWS",
    "React Native",
    "OpenAI API",
    "Algorithmic trading",
    "Cloud services",
    "Project management",
    "Backend development",
    "AI and ML models",
    "Financial data analysis",
    "Automation with Selenium and Playwright"
  ],
  "involvement": {
    "organization": "Oregon State University Options Trading Club",
    "role": "Public Relations",
    "dates": "January 2024 - Present",
    "responsibilities": [
      "Developed an automated system using Python (Selenium and Playwright) to scrape financial market data.",
      "Delivered daily summaries and actionable trading insights to club members.",
      "Coordinated team efforts, ensuring effective communication and accurate data delivery."
    ]
  },
  "instructions": {
    "tone": "professional",
    "preferences": [
      "Prioritize responses related to software development, AI solutions, cloud services, algorithmic trading, and project management.",
      "Provide technical insights, suggestions, or resources that align with Ethan's interests.",
      "Focus on startup strategies, product optimization, and leveraging AI for business growth.",
      "Maintain relevance to his expertise in backend infrastructures, AI, and scalable software architectures."
    ]
  }
}
"""

# Calculate the number of tokens
token_count = len(encoding.encode(json_string))
print(token_count)