import rehypeStringify from 'rehype-stringify';
import remarkCodeblockSource from 'remark-codeblock-source';
import { fs, github } from 'remark-codeblock-source/resolvers';
import remarkEnhanceCodeblock, {
	defaultOptions as defaultEnhanceCodeblockOptions,
} from 'remark-enhance-codeblock';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// import remarkTransformBlockquote from 'remark-transform-blockquote';
import { definePlugin } from 'svelte-md-template/unified';

import { createShikiRemarkPlugin } from './shiki/index.js';

/** @type {Record<string, import('remark-enhance-codeblock').RemarkEnhanceCodeblockIntlSpecs>} */
const codeblock_i18n = {
	vi: {
		collapse: 'Thu gọn',
		copy: {
			copied: 'Đã sao chép',
			default: 'Sao chép',
		},
		fullscreen: {
			exit: 'Thoát phóng to',
			open: 'Phóng to',
		},
	},
	en: defaultEnhanceCodeblockOptions.intl,
};

/**
 * @typedef CreatePresetOptions
 * @property {boolean} [allowDangerousHtml]
 */

/**
 * @param {CreatePresetOptions} [options]
 * @returns {import('unified').Preset}
 */
export function createPreset(options = {}) {
	return {
		plugins: [
			remarkParse,
			remarkGfm,
			definePlugin(remarkCodeblockSource, {
				resolvers: { fs: fs({ cache: true }), github: github({ cache: true }) },
			}),
			definePlugin(remarkEnhanceCodeblock, {
				intl: (input) => {
					const locale = input.locale ?? input.filename?.split('.').at(-2) ?? 'en';
					return codeblock_i18n[locale] ?? defaultEnhanceCodeblockOptions.intl;
				},
			}),
			// definePlugin(remarkTransformBlockquote, { preset: 'github' }), // TODO: setup personal callout
			definePlugin(remarkRehype, {
				allowDangerousHtml: options.allowDangerousHtml,
			}),
			createShikiRemarkPlugin(),
			definePlugin(rehypeStringify, {
				allowDangerousHtml: options.allowDangerousHtml,
			}),
		],
	};
}
