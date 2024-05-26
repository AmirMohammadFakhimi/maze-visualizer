/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        gridTemplateColumns: {
            'custom-percent': '25% 75%',
        },
    },
  },
  plugins: [],
}