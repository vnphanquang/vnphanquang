import { SLUG_TO_POST } from './collect';
import type { BlogPost } from './definition';

export interface LoadBlogPostInput {
	slug: string;
}
export async function loadBlogPost(input: LoadBlogPostInput): Promise<BlogPost | null> {
	const { slug } = input;
	if (!SLUG_TO_POST[slug]) return null;
	const post = SLUG_TO_POST[slug];
	const [content, metadata, thumbnail, ogImage] = await Promise.all([
		post.content(),
		post.metadata(),
		post.thumbnail?.(),
		post.og?.(),
	]);
	return {
		content,
		metadata: {
			...metadata,
			language: post.language,
			slug: post.slug,
		},
		thumbnail,
		ogImage,
	};
}

export async function listBlogPosts(): Promise<Omit<BlogPost, 'content'>[]> {
	return await Promise.all(
		Object.values(SLUG_TO_POST).map(async (post) => {
			const [metadata, thumbnail] = await Promise.all([post.metadata(), post.thumbnail?.()]);
			return {
				metadata: {
					...metadata,
					language: post.language,
					slug: post.slug,
				},
				thumbnail,
			};
		}),
	);
}

export function generateKitEntries(): { slug: string }[] {
	return Object.keys(SLUG_TO_POST).map((slug) => ({ slug }));
}
