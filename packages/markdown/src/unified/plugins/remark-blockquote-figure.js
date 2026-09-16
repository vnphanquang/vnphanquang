/* eslint-disable jsdoc/reject-any-type */

import { u } from 'unist-builder';
import { SKIP, visit } from 'unist-util-visit';

/**
 * @typedef RemarkBlockquoteFigureOptions
 * @property {string} [captionMarker]
 * @property {boolean} [removeCaptionMarker]
 */

/**
 * @param {RemarkBlockquoteFigureOptions} [options]
 * @type {import('unified').Plugin<[], import('mdast').Root>}
 */
export function remarkBlockquoteFigure(options = {}) {
	const o = {
		captionMarker: '--',
		removeCaptionMarker: true,
		...options,
	};
	return function (tree) {
		visit(tree, 'blockquote', (node, index, parent) => {
			if (index === undefined || !parent) return;
			if (node.children.length < 2) return;

			const lastParagraph = node.children.at(-1);
			if (lastParagraph?.type !== 'paragraph') return;

			const firstText = lastParagraph.children.at(0);
			if (firstText?.type !== 'text' || !firstText.value.trimStart().startsWith(o.captionMarker))
				return;

			node.children.splice(node.children.length - 1, 1);

			if (o.removeCaptionMarker) {
				firstText.value = firstText.value.slice(o.captionMarker.length).trimStart();
				if (firstText.value === '') {
					lastParagraph.children.shift();
				}
			}

			/** @type {any} */
			const figure = u(
				'blockquote-figure',
				{
					data: {
						hName: 'figure',
					},
				},
				[
					node,
					u(
						'blockquote-figure',
						{
							data: {
								hName: 'figcaption',
							},
						},
						[lastParagraph],
					),
				],
			);

			parent.children.splice(index, 1, figure);

			return SKIP;
		});
	};
}
