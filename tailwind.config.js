/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'color': 'color',
        'background-color': 'background-color',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
