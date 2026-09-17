import type { Component } from 'svelte';

import type { Language } from '$lib/constants';

export interface BlogPostMetadata {
	title: string;
	/**
	 * the language of this post ('vi' or 'en'),
	 * should be detected from path
	 */
	language: Language;
	/**
	 * publication date of the post,
	 * once live, this should not be changed
	 */
	publishedAt: Date;
	/**
	 * should update this whenever change is
	 * introduced to the readable content of the
	 * blog post
	 */
	updatedAt?: Date;
	/**
	 * whether this post contains any code snippet,
	 * set to `true` to optimise bundle size of the page
	 *
	 * @default false
	 */
	codeless?: boolean;
}

export interface BlogPost {
	content: Component;
	metadata: BlogPostMetadata;
}

export function defineBlogPostMetadata(
	metadata: Omit<BlogPostMetadata, 'language'>,
): Omit<BlogPostMetadata, 'language'> {
	return metadata;
}
