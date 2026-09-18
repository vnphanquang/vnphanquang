import child_process from 'node:child_process';
import path from 'node:path';

import adapter from '@sveltejs/adapter-node';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig } from 'vite';

import pkg from './package.json' with { type: 'json' };

const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
	plugins: [
		// FIXME: add inline-svg, external-link, etc.
		gach({ markdown: true }),
		enhancedImages(),
		sveltekit({
			adapter: adapter(),
			alias: {
				$routes: path.join(import.meta.dirname, 'src/routes'),
				$data: path.join(import.meta.dirname, 'src/data'),
				$params: path.join(import.meta.dirname, 'src/params'),
			},
			version: {
				name: `${pkg.version} (#${commitHash})@${Date.now()}`,
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
