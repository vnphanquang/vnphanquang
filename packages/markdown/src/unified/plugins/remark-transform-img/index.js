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

			if (o.embeddedYoutube && url.startsWith('https://youtube.com/embed')) {
				const iframe = u('transform-img', {
					data: {
						hName: 'iframe',
						hProperties: {
							width: '560',
							height: '315',
							title: '',
							src: url,
							frameborder: '0',
							allow:
								'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
							allowfullscreen: true,
						},
					},
				});

				if (o.figure) {
					const figure = u(
						'transform-img',
						{
							data: {
								hName: 'figure',
							},
						},
						[
							iframe,
							u(
								'transform-img',
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
					grandparent.children.splice(parentIndex, 1, /** @type {any} */ (figure));
				} else {
					iframe.data.hProperties.title = alt;
					const parentIndex = grandparent.children.findIndex((node) => node === parent);
					grandparent.children.splice(parentIndex, 1, /** @type {any} */ (iframe));
				}

				return;
			}

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
					'transform-img',
					{
						data: {
							hName: 'figure',
						},
					},
					[
						node,
						u(
							'transform-img',
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
				grandparent.children.splice(parentIndex, 1, /** @type {any} */ (figure));
			}

			return SKIP;
		});
	};
}
