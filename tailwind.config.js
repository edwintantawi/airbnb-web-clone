const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: 'Roboto, Helvetica Neue, sans-serif',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      gray: {
        100: '#F7F7F7',
        200: '#DDDDDD',
        300: '#717171',
        400: '#484848',
        500: '#222222',
      },
      primary: '#FF385C',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
