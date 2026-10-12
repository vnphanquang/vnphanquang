# @vnphanquang/markdown

A Markdown authoring toolkit for from personal projects; essentially a wrapper for
[svelte-md-template] with a bunch of remark/rehype plugins. Read the blog post "[Rethinking Markdown
in Svelte][svelte-md-template.blog]" for an introduction.

## Installation

```bash
pnpm add -D @vnphanquang/markdown
```

## Usage with [UnifiedJS]

```typescript
import { unified } from 'unified';
import { createPreset } from '@vnphanquang/markdown/unified';

// assume content is safe:
const processor = unified().use(createPreset({ allowDangerousHtml: true }));
```

## Usage With [Svelte]:

Register the [Vite] plugin:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite/config';
import { markdownInSvelte } from '@vnphanquang/markdown/svelte/vite';

export default defineConfig({
	plugins: [markdownInSvelte(), sveltekit({/* additional config */})],
});
```

Use:

```svelte
<script>
	import { Markdown, markdown } from '@vnphanquang/markdown/svelte';

	// Does this content have no code block?
	let codeless = false;
</script>

<Markdown {codeless}>
	{markdown`
# My Markdown Content

Do usual markdown business here, except don't indent.
	`}
</Markdown>
```

[unified]: https://unifiedjs.com/
[svelte]: https://svelte.dev/
[vite]: https://vite.dev/
[svelte-md-template]: https://github.com/vnphanquang/svelte-md-template
[svelte-md-template.blog]: https://vnphanquang.com/blog/rethinking-markdown-in-svelte
