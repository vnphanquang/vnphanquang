/* eslint-disable jsdoc/reject-any-type */

import { u } from 'unist-builder';
import { SKIP, visitParents } from 'unist-util-visit-parents';

/**
 * @type {import('unified').Plugin<[import('./types.public').RemarkTransformImgOptions?], import('mdast').Root>}
 */
export function remarkTransformImg(options = {}) {
	const o = {
		svelteEnhancedImg: false,
		figure: true,
		...options,
	};
	return function (tree) {
		visitParents(tree, 'image', (node, ancessors) => {
			const parent = ancessors.at(-1);
			const grandparent = ancessors.at(-2);
			if (!grandparent || !parent || parent.type !== 'paragraph' || parent.children.length > 1)
				return;

			const { alt, url } = node;

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

			if (o.figure) {
				node.alt = '';
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
				const parentIndex = grandparent.children.findIndex((node) => node === parent);
				grandparent.children.splice(parentIndex, 1, figure);
			}

			return SKIP;
		});
	};
}
