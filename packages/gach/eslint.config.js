import { defineConfig } from '@vnphanquang/eslint-config';

export default await defineConfig(
	{ jsdoc: true, svelte: 'configless' },
	{
		rules: {
			'import-x/no-duplicates': 'off',
		},
	},
);
