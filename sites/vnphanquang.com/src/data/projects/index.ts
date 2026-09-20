import { resolve } from '$app/paths';

export interface Project {
	name: string;
	description: string;
	url: string;
	blog?: string;
	tags: string[];
}

export const projects: Project[] = [
	{
		name: 'svelte-md-template',
		description: 'transform markdown to html in Svelte files via explicit tagged template',
		url: 'https://github.com/vnphanquang/svelte-md-template',
		blog: resolve('/blog/[slug]', { slug: 'rethinking-markdown-in-svelte' }),
		tags: ['oss', 'svelte', 'vite', 'markdown'],
	},
	{
		name: 'Svelte Vietnam',
		description: 'an information hub and inclusive community for people of Svelte in Vietnam',
		url: 'https://www.sveltevietnam.dev',
		tags: ['oss', 'svelte', 'community'],
	},
	{
		name: 'svelte-put',
		description: 'collection of Svelte utilities extracted from my real-life projects',
		url: 'https://svelte-put.vnphanquang.com/',
		tags: ['oss', 'svelte'],
	},
	{
		name: 'remark-enhance-codeblock',
		description: 'enhance experience for sharing code when authoring markdown content',
		url: 'https://github.com/vnphanquang/remark-enhance-codeblock',
		tags: ['oss', 'markdown', 'unified'],
	},
	{
		name: 'remark-transform-blockquote',
		description: 'utilise blockquote semantics to render more complex HTML',
		url: 'https://github.com/vnphanquang/remark-transform-blockquote',
		tags: ['oss', 'markdown', 'unified'],
	},
	{
		name: 'remark-codeblock-source',
		description: 'load codeblock content from external source (e.g. filesytem, GitHub, etc.)',
		url: 'https://github.com/vnphanquang/remark-codeblock-source',
		tags: ['oss', 'markdown', 'unified'],
	},
	{
		name: 'phosphor-icons-tailwindcss',
		description: 'TailwindCSS plugin for the Phosphor icon set',
		url: 'https://github.com/vnphanquang/phosphor-icons-tailwindcss',
		tags: ['oss', 'css', 'tailwind'],
	},
	{
		name: 'postcss-color-scheme',
		description: 'PostCSS plugin to handle prefers-color-scheme',
		url: 'https://github.com/vnphanquang/postcss-color-scheme',
		tags: ['oss', 'css', 'postcss'],
	},
	{
		name: 'githooks',
		description: 'a Deno port of husky - utility for setting up git hooks',
		url: 'https://github.com/vnphanquang/githooks',
		tags: ['oss', 'deno'],
	},
];

export function filterProjectsByTag(projects: Project[], tag: string) {
	const found: Project[] = [];
	for (const project of projects) {
		if (!project.tags.includes(tag)) continue;
		found.push({
			...project,
			tags: project.tags.filter((t) => t !== tag),
		});
	}
	return found;
}

export function groupProjectsByTags<T extends string>(
	projects: Project[],
	tags: T[],
): Record<T | 'misc', Project[]> {
	const misc: Project[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const map: Record<T, Project[]> = {} as any;
	for (const tag of tags) {
		map[tag] = [];
	}

	p: for (const project of projects) {
		for (const tag of tags) {
			if (!project.tags.includes(tag)) continue;
			map[tag].push({
				...project,
				tags: project.tags.filter((t) => t !== tag),
			});
			continue p;
		}
		misc.push(project);
	}

	return { ...map, misc };
}
