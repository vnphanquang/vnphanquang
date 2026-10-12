# @vnphanquang/gach

[Gạch](<https://vi.wikipedia.org/wiki/G%E1%BA%A1ch_(%C4%91%E1%BB%8Bnh_h%C6%B0%E1%BB%9Bng)>) (Vietnamese for "brick", [/ɣajk̟̚˧˨ʔ/](https://en.wiktionary.org/wiki/g%E1%BA%A1ch)) - a design system and collection of Svelte utilities / components / layouts / setups for my projects

## Installation

```bash
pnpm add -D @vnphanquang/gach tailwindcss @sveltejs/kit
```

## Setup

Register the Vite plugin

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';

export default defineConfig({
	plugins: [gach({ markdown: true }), sveltekit({/* additional config */})],
});
```

For now, add explicit CSS layer declaration in `app.html`:

```html
<!-- src/app.html -->
<html lang="en" data-color-scheme="%color-scheme%">
	<head>
		<style>
			@layer theme, base, components, markdown, utilities, icons;
			@layer utilities.components, utilities.icons;
		</style>
		%sveltekit.head%
	</head>
</html
```

Load styling in the entry CSS:

```css
/* src/app.css */
@import '@vnphanquang/gach/styles';

@layer base {
	:root {
		--header-height: 4.5rem; /* adjust accordingly */
	}
}
```

## Usage

TBD - too much stuff to document for now.
