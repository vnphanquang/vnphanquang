import type { Blog, BlogPosting } from 'schema-dts';

import type { BlogPost } from './definition';

export function buildStructuredBlog(): Blog {
	return {
		'@type': 'Blog',
		'@id': 'vnphanquang.com/blog',
		name: "Quang Phan's Latest Toughts in Writing",
		description: 'scribbling, scrabbling, but mostly just babbling...',
	};
}

export function buildStructuredBlogPost(origin: string, post: BlogPost): BlogPosting {
	const { metadata } = post;
	const url = new URL(`/blog/${metadata.slug}`, origin).toString();
	const id = `vnphanquang.com/blog/${metadata.slug}`;
	return {
		'@type': 'BlogPosting',
		'@id': id,
		url,
		mainEntityOfPage: url,
		inLanguage: metadata.language,
		headline: metadata.title,
		name: metadata.title,
		description: metadata.description,
		datePublished: metadata.publishedAt.toISOString(),
		...(metadata.updatedAt && {
			dateModified: metadata.updatedAt?.toISOString(),
		}),
		...(post.ogImage && {
			image: {
				'@type': 'ImageObject',
				'@id': `${id}/image`,
				url: post.ogImage,
				width: '2000',
				height: '630',
			},
		}),
		isPartOf: buildStructuredBlog(),
		keywords: metadata.keywords,
		...(metadata.numWords && {
			wordCount: metadata.numWords,
		}),
		// TODO: setup category page / item structured data here once tags are supported
	};
}
