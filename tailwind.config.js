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
      colors : {
        'primary': '#1A1D23',
        'secondary': '#F7F7F7',
        'tertiary': '#FFC107',
        'quaternary': '#4CAF50',
      },
      fontSize: {
        smm: '0.6rem',
      }
    },
   
  },
  plugins: [],
  darkMode: 'class',

}
