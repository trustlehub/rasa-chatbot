/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        accent: {
          900:'rgba(146, 30, 20, 1)',
          100:'rgba(255, 239, 238, 1)',
        }
      }
    },
  },
  plugins: [],
}

