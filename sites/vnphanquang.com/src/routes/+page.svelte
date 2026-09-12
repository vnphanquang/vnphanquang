<script lang="ts">
	import { Markdown, markdown } from '@vnphanquang/markdown/svelte';

	import '../app.css';
</script>

<Markdown>
	{markdown`
# Welcome to SvelteKit

Visit [svelte.dev/docs/kit](https://svelte.dev/docs/kit) to read the documentation

~~~javascript
export function hello() {
	console.log('hello world!');
}
~~~

> [!CODEGROUP]
>
> ~~~typescript #title="vite.config.ts" /svelte/
> import path from 'node:path';
>
> import adapter from '@sveltejs/adapter-node';
> import { sveltekit } from '@sveltejs/kit/vite';
> import { markdownInSvelte } from '@vnphanquang/markdown/svelte/vite';
> import { defineConfig } from 'vite';
>
> export default defineConfig({
> 	plugins: [
> 		sveltekit({
> 			adapter: adapter(),
> 			alias: {}, // [!code --]
> 			// [!code highlight:3] [!code ++:3]
> 			alias: {
> 				$routes: path.join(import.meta.dirname, 'src/routes'),
> 				$data: path.join(import.meta.dirname, 'src/data'),
> 			},
> 		}),
> 		markdownInSvelte(),
> 	],
> });
> ~~~
>
> ~~~javascript #title="eslint.config.js" src="fs:../../eslint.config.js"
>
> ~~~
>
> ~~~json #title="tsconfig.json" src="fs:../../tsconfig.json"
>
> ~~~
>
> ~~~json #title="package.json" src="fs:../../package.json"
>
> ~~~
	`}
</Markdown>
