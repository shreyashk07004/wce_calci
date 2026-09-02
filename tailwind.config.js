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
        ochre: {
          50: '#FDF8F0',
          100: '#F9EED9',
          200: '#F2DAB3',
          300: '#E8C185',
          400: '#DDA658',
          500: '#C98A2C',
          600: '#A96E1B',
          700: '#8D5B0F', // Primary Light Mode Academic Ochre
          800: '#6F4506',
          900: '#523303',
          950: '#331E01',
          gold: '#DE9F42', // Primary Dark Mode Soft Ochre Amber
        },
        darkSurface: {
          base: '#1B1F27',
          card: '#242933',
          inset: '#2A303C',
          border: '#38404E',
          borderSubtle: '#2F3643',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
