---
to: "<%= category === 'component' ? `src/lib/styles/components/c-${name}.css` : null %>"
unless_exists: true
---
.c-<%= name %> {
  /* ... */
}
