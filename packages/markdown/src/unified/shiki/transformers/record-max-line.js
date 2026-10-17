/**
 * @returns {import('@shikijs/types').ShikiTransformer}
 */
export function transformerRecordMaxLine() {
	return {
		name: 'record-max-line',
		enforce: 'post',
		line() {
			this.options.meta ??= {};
			this.options.meta.maxLine ??= 0;
			this.options.meta.maxLine++;
		},
		pre(pre) {
			const maxLine = /** @type {number | undefined} */ (this.options.meta?.maxLine);
			if (!maxLine) return;
			pre.properties.style = `--max-line: ${maxLine};` + pre.properties.style;
			if (maxLine === 1) {
				this.addClassToHast(pre, 'oneliner');
			}
		},
	};
}
