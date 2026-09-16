/* eslint-disable jsdoc/reject-any-type */

import { u } from 'unist-builder';
import { SKIP, visit } from 'unist-util-visit';

/**
 * @type {import('unified').Plugin<[import('./types.public').RemarkTransformImgOptions?], import('mdast').Root>}
 */
export function remarkTransformImg(options = {}) {
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

			if (o.svelteEnhancedImg) {
				let ignorePrefixes = ['http://', 'https://', 'data:'];
				if (typeof o.svelteEnhancedImg !== 'boolean') {
					if (o.svelteEnhancedImg.ignorePrefixes) {
						ignorePrefixes = o.svelteEnhancedImg.ignorePrefixes;
					}
				}
				if (!ignorePrefixes.some((protocol) => url.startsWith(protocol))) {
					node.data ??= {};
					node.data.hName = 'enhanced:img';
				}
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
