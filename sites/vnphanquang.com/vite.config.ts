import path from 'node:path';

import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { markdownInSvelte } from '@vnphanquang/markdown/svelte/vite';
import { fontless } from 'fontless';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		fontless(),
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			alias: {
				$routes: path.join(import.meta.dirname, 'src/routes'),
				$data: path.join(import.meta.dirname, 'src/data'),
			},
			compilerOptions: {
				modernAst: true,
				experimental: {
					async: true,
				},
			},
		}),
		markdownInSvelte(),
	],
});
