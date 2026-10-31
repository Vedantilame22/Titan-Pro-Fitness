/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gym: {
          dark: '#0A0B0E',
          card: '#12141A',
          cardBorder: '#1E222D',
          neon: '#10B981', // Electric Emerald Green
          neonHover: '#059669',
          amber: '#F59E0B',
          accent: '#06B6D4'
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sound-wave': 'soundWave 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        soundWave: {
          '0%': { height: '4px' },
          '100%': { height: '18px' },
        }
      }
    },
  },
  plugins: [],
}
