const vnphanquang = require('./src/lib/styles/postcss/tailwind.cjs');

/** @type {import("tailwindcss").Config } */
const config = {
  theme: {
    extend: {
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              '--tw-prose-body': theme('colors.fg.DEFAULT'),
              '--tw-prose-invert-body': theme('colors.fg.DEFAULT'),
              'a:not(.heading-anchor)': {
                '@apply c-link': {},
                'text-decoration': 'none',
              },
            },
          },
        };
      },
    },
  },
  darkMode: '',
  content: ['./src/**/*.{html,js,svelte,ts,md}', 'svelte.config.js'],
  plugins: [
    vnphanquang,
    require('postcss-color-scheme/lib/tailwind'),
    require('@tailwindcss/typography'),
  ],
};

module.exports = config;
