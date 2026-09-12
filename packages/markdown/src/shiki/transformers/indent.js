/**
 * @typedef TransformerIndentPerOptions
 * @property {'tab' | 'space'} [style]
 * @property {number} [size]
 */

/**
 * @typedef TransformerIndentPerLanguages
 * @property {Array<{ languages: string[] } & TransformerIndentPerOptions>} [overrides]
 */

/**
 * @typedef {TransformerIndentPerOptions & TransformerIndentPerLanguages} TransformerIndentOptions
 */

/**
 * @param {TransformerIndentOptions} [options]
 * @returns {import('@shikijs/types').ShikiTransformer}
 */
export function transformerIndent(options = {}) {
	const globals = options?.style
		? {
				style: options?.style ?? 'tab',
				size: options?.size ?? 4,
			}
		: undefined;
	/** @type {Record<string, import('./types.public.js').TransformerIndentPerOptions>} */
	const perLang = {};
	for (const { languages, ...per } of options?.overrides ?? []) {
		const perOptions = { ...globals, ...per };
		for (const lang of languages) {
			if (perLang[lang]) {
				perLang[lang] = {
					...perLang[lang],
					...perOptions,
				};
			} else {
				perLang[lang] = perOptions;
			}
		}
	}
	return {
		name: 'transformer-indent',
		enforce: 'pre',
		preprocess(code) {
			const o = perLang[this.options.lang] ?? globals;
			if (!o) return code;
			const { style = 'tab', size = 4 } = o;
			return code.replace(/^[ \t]+/gm, (match) => {
				if (style === 'tab') {
					return match.replaceAll(' ', '\t');
				}
				return match.replace(/\t/g, ' '.repeat(size));
			});
		},
	};
}
