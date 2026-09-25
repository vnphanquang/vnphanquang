import type { Language } from '@vnphanquang/gach/constants';
import type { Component } from 'svelte';

export interface BlogPostMetadata {
	/** h1 on the page and title in SEO */
	title: string;
	/**
	 * should be detected from path
	 */
	slug: string;
	/** short description for the post, to appear in listing and page metadata */
	description: string;
	/** comma-separated list of keywords for SEO */
	keywords?: string;
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
	/**
	 * indicate:
	 * - (true) the blog post may contain outdated information, or
	 * - (number) is so after a certain number of days after publication, or
	 * - (Date) is so after a certain date
	 * @default false
	 */
	outdate?: boolean | number | Date;
	/** approximated number of words in post content */
	numWords?: number;
	/** approximated number of minutes required to read this post */
	readMinutes?: number;
	/**
	 * TODO: here preemptively for future when more blog posts are written
	 * and there are real need to filter / group / search
	 */
	tags?: string[];
	blueskyPost?: BlueskyPostLinkage;
}

export interface BlueskyPostLinkage {
	/** did:plc:... */
	accountId: string;
	postId: string;
}

export interface BlogPostThumbnailProps {
	/**
	 * `true` indicate that this thumbnail is appearing in a blog post listing
	 * instead of the top cover image in blog post content page
	 */
	listing?: boolean;
}

export interface BlogPost {
	content: Component;
	metadata: BlogPostMetadata;
	thumbnail?: Component<BlogPostThumbnailProps>;
	ogImage?: string;
}

export type AutoDetectedFields = 'slug' | 'language' | 'ogImage';
export type PerDefinedPostMetadata = Omit<BlogPostMetadata, AutoDetectedFields>;

export function defineBlogPostMetadata(metadata: PerDefinedPostMetadata): PerDefinedPostMetadata {
	return metadata;
}
