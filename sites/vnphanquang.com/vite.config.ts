import path from 'node:path';

import adapter from '@sveltejs/adapter-node';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		gach({ markdown: true }),
		enhancedImages(),
		sveltekit({
			adapter: adapter(),
			alias: {
				$routes: path.join(import.meta.dirname, 'src/routes'),
				$data: path.join(import.meta.dirname, 'src/data'),
				$params: path.join(import.meta.dirname, 'src/params'),
			},
			compilerOptions: {
				modernAst: true,
				experimental: {
					async: true,
				},
			},
			experimental: {
				remoteFunctions: true,
			},
		}),
	],
});
