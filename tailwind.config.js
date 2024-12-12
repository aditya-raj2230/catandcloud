/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '1rem',
    },
    extend: {},
    colors: { 
      Teal: {
        300: '#5cd1e7',
      },
      Pink: {
        300: '#f34fd0',
      },
      yellow: {
        300:'#ffd23d',
      },
      gray: {
        100: '#f6f6f6',
        300: '#dededc',
        500: '#c4c4c2',
        700: '#80807e',
        800: '#383838',
      }
    }
  },
  plugins: [],
} 