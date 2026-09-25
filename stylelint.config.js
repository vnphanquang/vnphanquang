/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html/svelte',
		'stylelint-config-clean-order',
	],
	rules: {
		'import-notation': null,
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreShorthands: ['grid-template'],
			},
		],
	},
	overrides: [
		{
			files: ['packages/gach/src/styles/**/*.css'],
			rules: {
				'at-rule-no-unknown': [
					true,
					{
						ignoreAtRules: ['plugin', 'theme', 'utility', 'source', 'custom-variant', 'variant'],
					},
				],
				'no-invalid-position-declaration': null,
				'at-rule-prelude-no-invalid': [true, { ignoreAtRules: ['apply', 'custom-selector'] }],
				'nesting-selector-no-missing-scoping-root': null,
			},
		},
	],
	ignoreFiles: ['**/app.html'],
};
