/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html/svelte',
		'stylelint-config-clean-order',
	],
	overrides: [
		{
			files: ['**/app.css'],
			rules: {
				'at-rule-no-unknown': [
					true,
					{
						ignoreAtRules: ['plugin'],
					},
				],
				'import-notation': null,
			},
		},
	],
	ignoreFiles: ['**/app.html'],
};
