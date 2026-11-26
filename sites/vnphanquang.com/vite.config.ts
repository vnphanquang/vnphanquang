import child_process from 'node:child_process';

import { externalLink } from '@svelte-put/preprocess-external-link';
import { toc } from '@svelte-put/toc/vite';
import adapter from '@sveltejs/adapter-node';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteDevtools } from '@sveltejs/vite-devtools-svelte';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig, loadEnv } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';

import pkg from './package.json' with { type: 'json' };

const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'UMAMI_SCRIPT_ROOT');
	return {
		devtools: { apply: 'serve' },
		server: {
			port: 5300,
		},
		plugins: [
			svelteDevtools(),
			qrcode(),
			gach({ markdown: true }),
			enhancedImages(),
			toc({
				include: /post.svelte$/,
				preprocessor: {
					compileToc: {
						autoDeclare: true,
					},
				},
			}),
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
				},
				csp: {
					directives: {
						'frame-ancestors': ['self', env.UMAMI_SCRIPT_ROOT].filter(Boolean) as [
							'self',
							`${string}.${string}`,
						],
					},
				},
			}),
		],
	};
});
