# Personal Portfolio with AI Assistant

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring a custom AI chat assistant powered by Azure's AI models.

## 📑 Table of Contents
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Current Working Features](#-current-working-features)
- [Known Issues](#-known-issues)
- [Development Notes](#-development-notes)
- [Netlify Deployment Guide](#-netlify-deployment-guide)
  - [Initial Setup](#initial-setup)
  - [Required Files](#required-files)
  - [Deployment Steps](#deployment-steps)
  - [Troubleshooting](#troubleshooting)
  - [Monitoring](#monitoring)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🌟 Features

- **Interactive AI Chat Assistant**: Custom-trained AI that can answer questions about my background, skills, and experience
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Project Showcase**: Dynamic project cards with tags, links, and status indicators
- **Dark Theme**: Eye-friendly dark mode design
- **Serverless Architecture**: Utilizing Netlify Functions for backend operations

## 🚀 Live Demo

Visit the live site: [https://ethanclinick.netlify.app](https://ethanclinick.netlify.app)

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (for icons)
  - Vite (build tool)

- **Backend**:
  - Netlify Functions
  - Azure AI Models

- **Deployment**:
  - Netlify
  - GitHub Actions

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Azure AI API key (for chat functionality)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/eclinick/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GITHUB_API_TOKEN=your_github_token
   API_TOKEN=your_azure_ai_api_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```
6. 
## 🌐 Deployment

The project is set up for automatic deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Configure the following environment variables in Netlify:
   - `API_TOKEN` (Azure AI API token)
   - `VITE_GITHUB_API_TOKEN` (GitHub API token)
3. Deploy will automatically trigger on push to main branch

## 🔧 Current Working Features

- ✅ Responsive navigation with mobile menu
- ✅ Hero section with call-to-action buttons
- ✅ About section with skills showcase
- ✅ Projects section with filtering and status indicators
- ✅ Contact section with social links
- ✅ AI Chat assistant integration
- ✅ Serverless function for API proxy
- ✅ Automatic deployment pipeline

## 🚧 Known Issues

1. Chat assistant occasionally experiences timeout issues with long responses
2. Image optimization could be improved for faster loading
3. Some mobile menu transitions could be smoother

## 📝 Development Notes

- The chat functionality uses a serverless function to proxy requests to Azure AI
- Project images should be optimized and stored in the `src/assets` directory
- Tailwind classes are used for styling with some custom CSS in `src/index.css`
- The AI context is stored in `src/components/ChatBox.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

Ethan Clinick - [clinicke@oregonstate.edu](mailto:clinicke@oregonstate.edu)

Project Link: [https://github.com/eclinick/personal-portfolio](https://github.com/eclinick/personal-portfolio)

## 🌐 Netlify Deployment Guide

### Initial Setup

1. **Create a Netlify Account**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub account

2. **Configure Build Settings**
   - Create a new site from Git
   - Select your repository
   - Configure build settings:
     ```
     Build command: npm run build
     Publish directory: dist
     Functions directory: netlify/functions
     ```

3. **Environment Variables**
   In Netlify dashboard > Site settings > Environment variables:
   ```
   API_TOKEN=your_azure_ai_api_token
   VITE_GITHUB_API_TOKEN=your_github_token
   ```

### Required Files

1. **netlify.toml** (must be in root directory)
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
     functions = "netlify/functions"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/*"
       [headers.values]
       Access-Control-Allow-Origin = "*"
       Access-Control-Allow-Methods = "GET, POST, OPTIONS"
       Access-Control-Allow-Headers = "Content-Type, Authorization"
   ```

2. **Functions Setup**
   - Create `netlify/functions` directory
   - Ensure `chat.ts` is in this directory
   - Functions will be available at `/.netlify/functions/chat`

### Deployment Steps

1. **Local Testing**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Test functions locally
   netlify dev
   ```

2. **Manual Deployment**
   ```bash
   # Deploy to Netlify
   netlify deploy

   # For production
   netlify deploy --prod
   ```

3. **Automatic Deployment**
   - Enabled by default when connected to GitHub
   - Triggers on every push to main branch
   - Build logs available in Netlify dashboard

### Troubleshooting

1. **Function Errors**
   - Check function logs in Netlify dashboard
   - Verify environment variables are set
   - Test locally using `netlify dev`

2. **Build Failures**
   - Review build logs in Netlify dashboard
   - Ensure all dependencies are in package.json
   - Verify build command works locally

3. **CORS Issues**
   - Check headers in netlify.toml
   - Verify function CORS headers
   - Test API endpoints using Postman

### Monitoring

- View function invocations in Netlify dashboard
- Monitor build status and deployment history
- Check function logs for debugging
- Set up notifications for build failures

