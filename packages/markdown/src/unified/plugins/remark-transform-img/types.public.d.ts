export interface RemarkTransformImgOptions {
	/**
	 * whether to support @sveltejs/enhanced-img
	 *
	 * @default false
	 */
	svelteEnhancedImg?:
		| boolean
		| {
				/**
				 * skip transformation if `src` starts with these strings
				 *
				 * @default ['http://', 'https://', 'data:']
				 */
				ignorePrefixes?: string[];
		  };
	/**
	 * wrap the img in a `<figure>` tag, with `<figcaption>` containing the `alt` text,
	 * and set `alt` to empty string so that it is not read twice by screen readers.
	 *
	 * @default true
	 */
	figure?: boolean;
}
