require('../postcss/css-node-loader.cjs');

const components = {
  // HYGEN INJECTION MARKER
  ...require('./c-link.css'),

};

module.exports = { components };
