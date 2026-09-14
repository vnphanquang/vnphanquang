/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html/svelte',
		'stylelint-config-clean-order',
	],
	rules: {
		'import-notation': null,
	},
	overrides: [
		{
			files: ['packages/gach/src/styles/**/*.css'],
			rules: {
				'at-rule-no-unknown': [
					true,
					{
						ignoreAtRules: ['plugin', 'theme', 'utility', 'source'],
					},
				],
				'no-invalid-position-declaration': null,
			},
		},
	],
	ignoreFiles: ['**/app.html'],
};
