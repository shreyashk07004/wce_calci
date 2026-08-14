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
        wce: {
          navy: '#0f172a',
          blue: '#1e40af',
          sky: '#0284c7',
          accent: '#3b82f6',
          gold: '#d97706',
          lightBg: '#f8fafc',
          cardLight: '#ffffff',
          darkBg: '#0b0f19',
          cardDark: '#131b2e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
