import { defineConfig } from '@vnphanquang/eslint-config';
import { globalIgnores } from 'eslint/config';

export default await defineConfig(
	{ svelte: true },
	{
		rules: {
			'svelte/no-navigation-without-resolve': 'off',
		},
	},
	globalIgnores(['**/includes/examples/**/*.{svelte,js,ts}']),
);
