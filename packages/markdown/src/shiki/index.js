import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationWordHighlight,
	transformerRenderIndentGuides,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import { definePlugin } from 'svelte-md-template/unified';
import { createTwoslasher } from 'twoslash';
import { createTwoslasher as createTwoslasherSvelte } from 'twoslash-svelte';

import { transformerIndent } from './transformers/indent.js';
import { transformerRecordMaxLine } from './transformers/record-max-line.js';

export const highlighter = await createHighlighterCore({
	themes: [import('shiki/themes/dark-plus.mjs'), import('shiki/themes/light-plus.mjs')],
	langs: [
		import('shiki/langs/css.mjs'),
		import('shiki/langs/html.mjs'),
		import('shiki/langs/javascript.mjs'),
		import('shiki/langs/json.mjs'),
		import('shiki/langs/lisp.mjs'),
		import('shiki/langs/lua.mjs'),
		import('shiki/langs/markdown.mjs'),
		import('shiki/langs/nix.mjs'),
		import('shiki/langs/shellscript.mjs'),
		import('shiki/langs/svelte.mjs'),
		import('shiki/langs/typescript.mjs'),
		import('shiki/langs/yaml.mjs'),
		import('shiki/langs/zig.mjs'),
	],
	engine: createOnigurumaEngine(import('shiki/wasm')),
});

const twoslasherDefault = createTwoslasher();
const twoslasherSvelte = createTwoslasherSvelte();

/**
 * @returns {import('unified').Pluggable}
 */
export function createShikiRemarkPlugin() {
	return definePlugin(rehypeShikiFromHighlighter, highlighter, {
		themes: {
			light: 'light-plus',
			dark: 'dark-plus',
		},
		defaultColor: 'light-dark()',
		transformers: [
			transformerIndent({
				overrides: [
					{
						languages: ['js', 'javascript', 'ts', 'typescript', 'json'],
						style: 'space',
						size: 4,
					},
				],
			}),
			transformerNotationWordHighlight(),
			transformerNotationDiff(),
			transformerNotationErrorLevel({
				classMap: {
					success: ['highlighted', 'success'],
					info: ['highlighted', 'info'],
					warning: ['highlighted', 'warning'],
					error: ['highlighted', 'error'],
				},
			}),
			transformerNotationFocus(),
			transformerRenderIndentGuides({ indent: 4 }),
			transformerRecordMaxLine(),
			transformerTwoslash({
				explicitTrigger: /#typehint/,
				twoslasher: /** @type {import('@shikijs/twoslash').TwoslashShikiFunction} */ (
					(code, lang, options) => {
						if (lang === 'svelte') {
							return twoslasherSvelte(code, lang, options);
						}
						return twoslasherDefault(code, lang, options);
					}
				),
				langs: ['typescript', 'javascript', 'svelte'],
			}),
		],
	});
}
