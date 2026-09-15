/* eslint-disable jsdoc/reject-any-type */

import { u } from 'unist-builder';
import { SKIP, visit } from 'unist-util-visit';

/**
 * @typedef RemarkEnhanceImgOptions
 * @property {boolean} [svelteEnhancedImg]
 */

/**
 * @type {import('unified').Plugin<[RemarkEnhanceImgOptions?], import('mdast').Root>}
 */
export function remarkEnhanceImg(options = {}) {
	const o = {
		svelteEnhancedImg: false,
		...options,
	};
	return function (tree) {
		visit(tree, 'image', (node, index, parent) => {
			if (index === undefined || !parent) return;
			const { alt, url } = node;

			// FIXME: audit this with a screen reader to make sure the figcaption
			// can safely replace alt without a11y issue
			node.alt = '';

			if (o.svelteEnhancedImg && !['https', 'http'].some((protocol) => url.startsWith(protocol))) {
				node.data ??= {};
				node.data.hName = 'enhanced:img';
			}

			/** @type {any} */
			const figure = u(
				'enhance-img',
				{
					data: {
						hName: 'figure',
					},
				},
				[
					node,
					u(
						'enhance-img',
						{
							data: {
								hName: 'figcaption',
							},
						},
						[u('text', alt ?? '')],
					),
				],
			);

			parent.children.splice(index, 1, figure);

			return SKIP;
		});
	};
}
