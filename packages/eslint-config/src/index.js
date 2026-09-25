import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import { defineConfig as defineEslintConfig, includeIgnoreFile } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import { jsdoc } from 'eslint-plugin-jsdoc';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';

export const IMPORT_ORDER_DEFAULTS = {
	groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'unknown'],
	pathGroups: [
		{
			pattern: '$*',
			group: 'internal',
		},
		{
			pattern: '$*/**',
			group: 'internal',
		},
		{
			pattern: '#*',
			group: 'internal',
		},
		{
			pattern: '#*/**',
			group: 'internal',
		},
	],
	'newlines-between': 'always',
	pathGroupsExcludedImportTypes: [],
	named: true,
	alphabetize: {
		order: 'asc',
		caseInsensitive: false,
	},
	warnOnUnassignedImports: true,
};

/**
 * @returns {string | undefined}
 */
export function findConfigRoot() {
	/**
	 * @returns {NodeJS.CallSite[] }
	 */
	function getStack() {
		const stackTraceLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = Infinity;
		const prepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, structuredStackTrace) => structuredStackTrace;

		/** @type {{ stack?: NodeJS.CallSite[] }}  */
		const dummyObject = {};
		Error.captureStackTrace(dummyObject, findConfigRoot);
		const rv = /** @type {NodeJS.CallSite[]} */ (dummyObject.stack);

		Error.prepareStackTrace = prepareStackTrace;
		Error.stackTraceLimit = stackTraceLimit;

		return rv;
	}

	for (const callSite of getStack()) {
		const stackFrameFilePathOrUrl = callSite.getFileName();
		if (!stackFrameFilePathOrUrl) {
			continue;
		}

		// ESM seem to return a file URL, so we'll convert it to a file path.
		// AFAICT this isn't documented in the v8 API docs, but it seems to be the case.
		// See https://github.com/typescript-eslint/typescript-eslint/issues/11429
		const stackFrameFilePath = stackFrameFilePathOrUrl.startsWith('file://')
			? fileURLToPath(stackFrameFilePathOrUrl)
			: stackFrameFilePathOrUrl;

		const parsedPath = path.parse(stackFrameFilePath);
		if (/^eslint\.config\.(c|m)?(j|t)s$/.test(parsedPath.base)) {
			if (process.platform === 'win32') {
				// workaround for https://github.com/typescript-eslint/typescript-eslint/issues/11530
				// (caused by https://github.com/unjs/jiti/issues/397)
				return parsedPath.dir.replaceAll('/', path.sep);
			}
			return parsedPath.dir;
		}
	}

	return undefined;
}

/**
 * @typedef {Parameters<typeof import('eslint/config').defineConfig>} ConfigWithExtendsArray
 */

/**
 * @typedef {Extract<import('typescript-eslint').Config, any[]>[number]['languageOptions']} TSESLintLanguageOptions
 */

/**
 * @typedef Options
 * @property {boolean | 'configless' | import('@sveltejs/kit').Config} [svelte]
 * @property {boolean} [jsdoc]
 * @property {string[]} [ignores]
 */

/**
 * @param {Options} [options]
 * @param {ConfigWithExtendsArray} additionals
 * @returns {Promise<import('eslint/config').ConfigObject[]>}
 */
export async function defineConfig(options = {}, ...additionals) {
	const { ignores = [] } = options;

	const root = findConfigRoot();

	let absIgnores = ignores;
	if (root) {
		// convert all to absolute path
		absIgnores = ignores.map((p) => (path.isAbsolute(p) ? p : path.resolve(root, p)));

		// automatically add .gitignore at root, if not already
		const gitignore = path.join(root, '.gitignore');
		if (fs.existsSync(gitignore) && !absIgnores.includes(gitignore)) absIgnores.push(gitignore);
	}

	/** @type {undefined | { root: string; plugin: import('eslint-plugin-svelte'); config?: any }}  */
	let svelte = undefined;
	if (root && options.svelte) {
		svelte = {
			plugin: /** @type {import('eslint-plugin-svelte')} */ (
				(await import('eslint-plugin-svelte')).default
			),
			root,
		};
		if (typeof options.svelte === 'boolean') {
			const loaded = await (
				await import('@sveltejs/load-config')
			).loadConfig(root, {
				traverse: false,
			});
			if (!loaded || 'error' in loaded) {
				if (loaded?.error) {
					console.error(loaded.error);
				}
				throw new Error('Failed to load Svelte Config for eslint');
			}
			svelte.config = loaded.config;
		} else if (options.svelte !== 'configless') {
			svelte.config = svelte;
		}
	}

	return defineEslintConfig(
		includeIgnoreFile(absIgnores, { gitignoreResolution: true }),
		{
			languageOptions: {
				globals: {
					...globals.browser,
					...globals.node,
				},
			},
			rules: {
				// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
				'no-undef': 'off',
			},
		},
		{
			extends: [
				js.configs.recommended,
				importX.flatConfigs.recommended,
				importX.flatConfigs.typescript,
			],
			rules: {
				'import-x/order': ['error', IMPORT_ORDER_DEFAULTS],
				'import-x/no-duplicates': 'off',
				'import-x/no-unresolved': [
					'error',
					{
						ignore: [
							'^\\$app/', // for Svelte projects
						],
					},
				],
			},
		},
		{
			files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
			extends: [
				tseslint.configs.recommended,
				importX.flatConfigs.recommended,
				importX.flatConfigs.typescript,
				prettier,
			],
			languageOptions: /** @satisfies {TSESLintLanguageOptions} */ ({
				ecmaVersion: 'latest',
				sourceType: 'module',
				parserOptions: {
					tsconfigRootDir: root,
					projectService: svelte
						? true
						: {
								allowDefaultProject: ['*.config.{ts,js}'],
							},
				},
			}),
		},
		{
			files: ['**/types.public.js'],
			extends: [tseslint.configs.disableTypeChecked],
		},
		...(svelte
			? /** @satisfies {ConfigWithExtendsArray} */ ([
					{
						files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
						extends: [
							tseslint.configs.recommended,
							svelte.plugin.configs.recommended,
							prettier,
							svelte.plugin.configs.prettier,
						],
						languageOptions: /** @satisfies {TSESLintLanguageOptions} */ ({
							ecmaVersion: 'latest',
							sourceType: 'module',
							parserOptions: {
								tsconfigRootDir: svelte.root,
								projectService: true,
								extraFileExtensions: ['.svelte'],
								parser: tseslint.parser,
								svelteConfig: svelte.config,
							},
						}),
					},
				])
			: []),
		...(options.jsdoc
			? [
					jsdoc({
						files: ['src/**/*.js'],
						config: 'flat/recommended-typescript-flavor',
						rules: {
							'jsdoc/require-returns-description': 'off',
							'jsdoc/require-param-description': 'off',
							'jsdoc/require-property-description': 'off',
							'jsdoc/require-jsdoc': [
								'warn',
								{
									publicOnly: {
										ancestorsOnly: true,
									},
								},
							],
							'jsdoc/tag-lines': 'off',
							'import-x/extensions': [
								'error',
								'always',
								{
									js: 'always',
									ignorePackages: true,
									fix: true,
								},
							],
						},
					}),
				]
			: []),
		...additionals,
	);
}
