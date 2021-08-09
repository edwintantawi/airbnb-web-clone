const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    container: false,
  },
  theme: {
    container: {
      center: true,
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      arround: '0 8px 25px rgba(0,0,0,0.2)',
      'arround-bold': '0 10px 28px rgba(0,0,0,0.3)',
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
      'transparent-black': 'rgba(0,0,0,0.4)',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '800px',
      // => @media (min-width: 800px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      searchbar: '880px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 16px',
          '@screen sm': {
            padding: '0 24px',
          },
          '@screen md': {
            padding: '0 40px',
          },
          '@screen lg': {},
          '@screen xl': {
            padding: '0 72.5px',
          },
          '@screen 2xl': {
            maxWidth: '1760px',
          },
        },
      });
    },
  ],
};
