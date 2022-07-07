/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: {
          one: 'rgb(255, 255, 255)',
          two: 'rgb(252, 247, 243)',
        },
        yellow: {
          one: 'rgb(254, 212, 85)',
          two: 'rgb(255, 164, 0)',
        },
        orange: 'rgb(242, 130, 32)',
        red: 'rgb(242, 47, 52)',
        brown: 'rgb(97, 50, 35)',
      },
      fontFamily: {
        faro: ['Faro Display Lucky', 'sans-serif'],
        brown: ['Brown', 'sans-serif'],
        turbinado: ['Turbinado Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
