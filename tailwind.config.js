/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Cinzel', 'serif'],
        'philosopher': ['Philosopher', 'sans-serif'],
      },
      dropShadow: {
        'mystical': [
          '0 0 10px rgba(251, 191, 36, 0.5)',
          '0 0 20px rgba(251, 191, 36, 0.3)',
          '2px 2px 4px rgba(0, 0, 0, 0.8)'
        ]
      }
    },
  },
  plugins: [],
};
