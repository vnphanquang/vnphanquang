/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('postcss-space-between'),
    require('postcss-color-scheme'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV !== 'development' ? [require('cssnano')] : []),
  ],
};
