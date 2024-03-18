/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'Home__image' : "url('/Users/imc/Desktop/react/react-shopping-web/src/images/bg-image.jpg')"
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

