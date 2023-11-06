const { readFileSync } = require('fs');

const postcss = require('postcss');
const postcssJs = require('postcss-js');

require.extensions['.css'] = function (module, filename) {
  const css = readFileSync(filename, 'utf8');
  const root = postcss.parse(css);
  const jss = postcssJs.sync([
    // apply mixins & custom-selectors here so that
    // tailwind can pick up the correct selectors for intellisense
    require('postcss-custom-selectors'),
  ])(
    postcssJs.objectify(root),
  );
  module.exports = jss;
};
