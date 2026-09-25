import type { Language } from '@vnphanquang/gach/constants';
import type { Component } from 'svelte';

import type { BlogPostThumbnailProps, PerDefinedPostMetadata } from './definition';

const METADATA_MODULES = import.meta.glob<PerDefinedPostMetadata>('./entries/*/*/post.svelte', {
	import: 'metadata',
});
const CONTENT_MODULES = import.meta.glob<Component>('./entries/*/*/post.svelte', {
	import: 'default',
});
const THUMBNAIL_MODULES = import.meta.glob<Component>('./entries/*/*/thumbnail.svelte', {
	import: 'default',
});
const OG_MODULES = import.meta.glob<string>('./entries/*/*/og.jpg', {
	query: '?url',
	import: 'default',
});

export interface BlogPostResolver {
	slug: string;
	language: Language;
	metadata: () => Promise<PerDefinedPostMetadata>;
	content: () => Promise<Component>;
	thumbnail?: () => Promise<Component<BlogPostThumbnailProps>>;
	og?: () => Promise<string>;
}

const SLUG_TO_POST: Record<string, BlogPostResolver> = {};
for (const path of Object.keys(CONTENT_MODULES).toSorted().toReversed()) {
	const segments = path.split('/');
	const postRoot = segments.slice(0, -1).join('/');
	const thumbnailPath = postRoot + '/thumbnail.svelte';
	const ogPath = postRoot + '/og.jpg';
	const slug = segments.at(-2)!.replace(/^\d+-/, '');
	const language = segments.at(-3)! as Language;
	SLUG_TO_POST[slug] = {
		slug,
		language,
		metadata: METADATA_MODULES[path],
		content: CONTENT_MODULES[path],
		thumbnail: THUMBNAIL_MODULES[thumbnailPath],
		og: OG_MODULES[ogPath],
	};
}

export { SLUG_TO_POST };
