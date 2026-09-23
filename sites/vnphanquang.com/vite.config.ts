import child_process from 'node:child_process';

import adapter from '@sveltejs/adapter-node';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig } from 'vite';

import pkg from './package.json' with { type: 'json' };
import { autoSlug } from './src/svelte-put/preprocess-auto-slug/index.js';
import { externalLink } from './src/svelte-put/preprocess-external-link/index.js';

const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
	plugins: [
		// FIXME: add inline-svg, external-link, etc.
		gach({ markdown: true }),
		enhancedImages(),
		autoSlug((defaultOptions) => ({
			include: /data\/posts\/.*\.svelte$/,
			tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
			anchor: {
				content: '#',
				position: 'prepend',
				properties: {
					...defaultOptions.anchor?.properties,
					class: 'heading-anchor',
				},
			},
		})),
		externalLink(['vnphanquang.com']),
		sveltekit({
			adapter: adapter(),
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
				explicitEnvironmentVariables: true,
			},
			inspector: {
				toggleKeyCombo: 'alt-shift',
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-left',
			},
		}),
	],
});
