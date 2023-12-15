/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      lora: ['Lora', 'serif'],
      phanquang: ['PhanQuang-Calligraphr', 'serif'],
    },
    spacing: {
      header: 'var(--header-height)',
    },
    colors: {
      fg: {
        DEFAULT: 'var(--color-fg)',
      },
      bg: {
        DEFAULT: 'var(--color-bg)',
      },
      link: {
        DEFAULT: 'var(--color-link)',
      },
    },
    zIndex: {
      px: '1',
      // header: '50', // root header
      // modal: '80', // a modal/dialog
      // sidebar: '92', // sidebar
      // float: '100', // floating buttons and such
      // popup: '120', // tooltip, dropdown, popover etc
      overlay: '150', // a full screen overlay
      // command: '200', // command palette
      // notification: '300', // notification
    },
  },
};

module.exports = { theme };
