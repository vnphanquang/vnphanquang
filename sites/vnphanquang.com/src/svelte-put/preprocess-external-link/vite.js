import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

const DEFAULT_EXTERNAL_LINK_CONFIG =
	/** @satisfies {import('./types.public').ExternalLinkConfig} */ ({
		hosts: ['localhost'],
		markerAttribute: 'data-external',
		attributes: { target: '_blank', rel: 'noopener noreferrer' },
	});

/**
 * search for anchor tags with href to external hosts and add appropriate attributes
 * @param {import('./types.public').ExternalLinkConfig | NonNullable<import('./types.public').ExternalLinkConfig['hosts']>} [config]
 * @returns {import('vite').Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function externalLink(config = []) {
	/** @type {import('./types.public').FilterIdSpecs | null} */
	let svelteIdFilter = null;

	const o = Array.isArray(config)
		? {
				...DEFAULT_EXTERNAL_LINK_CONFIG,
				hosts: [...DEFAULT_EXTERNAL_LINK_CONFIG.hosts, ...config],
			}
		: {
				...DEFAULT_EXTERNAL_LINK_CONFIG,
				...config,
				hosts: [...DEFAULT_EXTERNAL_LINK_CONFIG.hosts, ...config.hosts],
				attributes: { ...DEFAULT_EXTERNAL_LINK_CONFIG.attributes, ...config.attributes },
			};

	return {
		name: 'vite-plugin-svelte-preprocess-external-link',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},

		transform: {
			/// reference: https://github.com/sveltejs/vite-plugin-svelte/blob/8d032b286f0e2374173258b9f1cbabc309fe0d3e/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins
			order: 'pre',
			filter: {
				id: {
					include: o.include || svelteIdFilter || /\.svelte$/,
					exclude: o.exclude,
				},
			},
			async handler(code, filename) {
				if (code.includes('<!-- ignore @svelte-put/preprocess-external-link -->')) return;
				const s = new MagicString(code);
				const ast = parse(code, { modern: true, filename });

				walk(
					/** @type {import('svelte/compiler').AST.RegularElement} */ (
						/** @type {unknown} */ (ast.fragment)
					),
					null,
					{
						RegularElement(node, { next }) {
							if (node.name !== 'a') return next();

							const attributes = /** @type {import('svelte/compiler').AST.Attribute[]} */ (
								node.attributes.filter((attr) => attr.type === 'Attribute')
							);

							let external = attributes.some(
								(attr) => attr.type === 'Attribute' && attr.name === o.markerAttribute,
							);
							if (!external) {
								const hrefAttr = attributes.find((attr) => attr.name === 'href');
								if (Array.isArray(hrefAttr?.value) && hrefAttr.value[0]?.type === 'Text') {
									const href = hrefAttr.value[0].raw;
									try {
										if (href.startsWith('mailto')) {
											external = true;
										} else if (href.startsWith('http')) {
											const url = new URL(href);
											external = !o.hosts.includes(url.hostname);
										}
									} catch (error) {
										console.error(
											'@svelte-put/external-link: error checking whether anchor tag is external:',
											error,
										);
									}
								}
							}

							const firstChild = node.fragment.nodes[0];
							if (external && firstChild) {
								let attrs = ' ';
								for (const [name, value] of Object.entries(o.attributes)) {
									if (attributes.every((attr) => attr.name !== name)) {
										attrs += `${name}="${value}"`;
									}
								}

								s.appendLeft(firstChild.start - 1, attrs);
							}
						},
					},
				);

				return {
					code: s.toString(),
					map: s.generateMap({ hires: 'boundary', includeContent: true }),
				};
			},
		},
	};
}
