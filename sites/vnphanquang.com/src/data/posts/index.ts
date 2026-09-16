import type { Component } from 'svelte';

import type { Language } from '$params/lang';

import type { BlogPost, BlogPostMetadata } from './definition';

export const entries = import.meta.glob<{
	default: Component;
	metadata: BlogPostMetadata;
}>('./entries/*/*/post.svelte');

export interface LoadBlogPostInput {
	lang: string;
	slug: string;
}

export async function loadBlogPost(input: LoadBlogPostInput): Promise<BlogPost | null> {
	const { lang, slug } = input;
	const path = `./entries/${lang}/${slug}/post.svelte`;
	const loader = entries[path];
	if (!loader) return null;
	const module = await loader();
	return {
		content: module.default,
		metadata: module.metadata,
	};
}

export function generateKitEntries(): { lang: Language; slug: string }[] {
	return Object.keys(entries).map((path) => {
		const segments = path.split('/');
		return {
			lang: segments.at(-3)! as Language,
			slug: segments.at(-2)!,
		};
	});
}
