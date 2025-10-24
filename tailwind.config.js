/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      backgroundColor: {
        'glass': 'rgba(24, 23, 23, 0.42)',
        'glass-dark': 'rgba(255, 255, 255, 0.15)',
        'glass-light': 'rgba(255, 255, 255, 0.35)',
        'glass-card': 'rgba(255, 255, 255, 0.3)',
        'glass-nav': 'rgba(255, 255, 255, 0.8)',
        'glass-modal': 'rgba(255, 255, 255, 0.9)',
        'glass-nav-dark': 'rgba(17, 24, 39, 0.8)',
        'glass-modal-dark': 'rgba(17, 24, 39, 0.9)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.4)',
        'glass-light': 'rgba(255, 255, 255, 0.6)',
        'glass-dark': 'rgba(255, 255, 255, 0.2)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(99, 102, 241, 0.15)',
        'glass-sm': '0 4px 16px 0 rgba(99, 102, 241, 0.1)',
        'glass-lg': '0 12px 40px 0 rgba(99, 102, 241, 0.2)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'chat-pulse': 'chat-pulse 2s ease-in-out infinite',
        'chat-bounce': 'chat-bounce 2s ease-in-out infinite',
        'chat-bounce-slow': 'chat-bounce 4s ease-in-out infinite',
        'chat-shimmer': 'chat-shimmer 3s ease-in-out infinite',
        'chat-glow': 'chat-glow 2.5s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'fade-scale': 'fade-scale 0.2s ease-out',
      },
      keyframes: {
        'fade-scale': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-50%) scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(-50%) scale(1)'
          }
        },
        'glass-shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        'chat-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        'chat-bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0) scale(1)' },
          '40%': { transform: 'translateY(-8px) scale(1.05)' },
          '60%': { transform: 'translateY(-4px) scale(1.02)' },
        },
        'chat-shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'chat-glow': {
          '0%': { 'box-shadow': '0 0 5px rgba(59, 130, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.2)' },
          '100%': { 'box-shadow': '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
