/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        glass: 'rgba(24, 23, 23, 0.42)',
      },
      animation: {
        'text-shine': 'text-shine 0.9s ease-out 0.1s both',
      },
      keyframes: {
        'text-shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
      },
    },
  },
  plugins: [],
};
