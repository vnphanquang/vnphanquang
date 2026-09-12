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
			if (!this.options.meta?.maxLine) return;
			pre.properties.style = `--max-line: ${this.options.meta.maxLine};` + pre.properties.style;
		},
	};
}
