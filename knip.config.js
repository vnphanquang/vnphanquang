import { defineConfig } from 'knip/config';

export default defineConfig({
	ignoreFiles: ['**/includes/examples/**/*.{js,ts,svelte,css}'],
	ignoreIssues: {
		'packages/*/tsconfig.json': ['unlisted'],
		'sites/*/tsconfig.json': ['unlisted'],
	},
	workspaces: {
		'.': {
			ignoreBinaries: ['lefthook'],
			ignoreDependencies: ['@changesets/cli'],
		},
		'packages/eslint-config': {
			ignoreDependencies: ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'],
		},
		'packages/markdown': {
			ignoreDependencies: ['vite'],
		},
		'packages/gach': {
			ignoreDependencies: ['@iconify-json/ph', '@iconify-json/simple-icons'],
		},
		'sites/*': {
			entry: ['src/env.ts'],
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp'],
		},
	},
});
