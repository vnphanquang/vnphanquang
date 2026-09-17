import type { Component } from 'svelte';

import { LANGUAGES } from '$lib/constants';

import type { BlogPost, BlogPostMetadata } from './definition';

export const entries = import.meta.glob<{
	default: Component;
	metadata: Omit<BlogPostMetadata, 'language'>;
}>('./entries/*/*/post.svelte');

export interface LoadBlogPostInput {
	slug: string;
}

export async function loadBlogPost(input: LoadBlogPostInput): Promise<BlogPost | null> {
	const { slug } = input;
	for (const lang of LANGUAGES) {
		const path = `./entries/${lang}/${slug}/post.svelte`;
		const loader = entries[path];
		if (!loader) continue;
		const module = await loader();
		return {
			content: module.default,
			metadata: {
				...module.metadata,
				language: lang,
			},
		};
	}
	return null;
}

export function generateKitEntries(): { slug: string }[] {
	return Object.keys(entries).map((path) => {
		const segments = path.split('/');
		return { slug: segments.at(-2)! };
	});
}
