import { CONTINUE, visit } from 'unist-util-visit';

/**
 * @typedef {Partial<Record<import('mdast').BlockContent['type'] | import('mdast').PhrasingContent['type'], string>>} RemarkNodeClassMapOptions
 */

/**
 * @type {import('unified').Plugin<[RemarkNodeClassMapOptions?], import('mdast').Root>}
 */
export function remarkNodeClassMap(options) {
	if (!options) return;
	const mappings = Object.entries(options).map(([type, cls]) => ({ type, class: cls }));
	return function (tree) {
		visit(tree, (node) => {
			const mapping = mappings.find(({ type }) => type === node.type);
			if (!mapping) return CONTINUE;

			node.data ??= {};
			node.data.hProperties ??= {};
			node.data.hProperties.className ??= [];
			if (!node.data.hProperties.className.includes(mapping.class)) {
				node.data.hProperties.className.push(mapping.class);
			}
			return CONTINUE;
		});
	};
}
