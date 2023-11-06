---
inject: true
to: "<%= category === 'component' ? 'src/lib/styles/components/index.cjs' : null %>"
after: HYGEN INJECTION MARKER
skip_if: c-<%= name %>
---
  ...require('./c-<%= name %>.css'),
