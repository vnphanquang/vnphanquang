/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html/svelte',
		'stylelint-config-clean-order',
	],
	overrides: [
		{
			files: ['packages/gach/src/styles/**/*.css'],
			rules: {
				'at-rule-no-unknown': [
					true,
					{
						ignoreAtRules: ['plugin', 'theme'],
					},
				],
				'import-notation': null,
			},
		},
	],
	ignoreFiles: ['**/app.html'],
};
