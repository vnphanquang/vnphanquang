import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
	transformerRenderIndentGuides,
} from '@shikijs/transformers';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import { definePlugin } from 'svelte-md-template/unified';

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
			transformerNotationErrorLevel(),
			transformerNotationFocus(),
			transformerNotationHighlight(),
			transformerRenderIndentGuides({ indent: 4 }),
			transformerRecordMaxLine(),
		],
	});
}
