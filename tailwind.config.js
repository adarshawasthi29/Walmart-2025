/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walmart: {
          blue: '#0071ce',
          yellow: '#ffc220',
          darkblue: '#004c91',
          lightblue: '#e6f3ff',
          gray: '#767676',
          lightgray: '#f5f5f5'
        }
      },
      fontFamily: {
        'walmart': ['Bogle', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 