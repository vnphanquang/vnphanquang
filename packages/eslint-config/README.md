# @vnphanquang/eslint-config

Shared Eslint configuration from my projects.

## Installation

```bash
pnpm add -D @vnphanquang/eslint-config
```

## Usage

```typescript
import { defineConfig } from '@vnphanquang/eslint-config';

export default await defineConfig();
```

### Svelte Projects

```typescript
export default await defineConfig({ svelte: true });
```

If there is no Svelte config, e.g. a library / component collection:

```typescript
export default await defineConfig({ svelte: 'configless' });
```

### JSDOC

```typescript
export default await defineConfig({ jsdoc: true });
```

### Custom Rules

```typescript
export default await defineConfig(
	{ jsdoc: true, svelte: 'configless' },
	{
		rules: {
			'import-x/no-duplicates': 'off',
		},
	},
);
```

### Custom Ignore Rules

```typescript
import { globalIgnores } from 'eslint/config';

export default await defineConfig(
	{ jsdoc: true, svelte: 'configless' },
	globalIgnores(['**/examples/*.{svelte,js,ts}']),
);
```

[eslint]: https://eslint.org/
