import { type BlogPostResolver, SLUG_TO_POST } from './collect';
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

export async function getNextRelevantBlogPost(input: LoadBlogPostInput) {
	const { slug } = input;
	const posts = Object.values(SLUG_TO_POST);
	const index = posts.findIndex((p) => p.slug === slug);
	if (index === -1) {
		throw new Error(`Blog post with slug "${slug}" is not found`);
	}

	const tags = (await posts[index].metadata()).tags;
	let found: BlogPostResolver;

	const newerPosts = posts.slice(index + 1);
	if (newerPosts.length) {
		found = await getLatestBlogPostWithMostOverlappingTags(newerPosts, tags);
	} else {
		// no newer blog posts, search down
		const olderPosts = posts.slice(0, index);
		found = await getLatestBlogPostWithMostOverlappingTags(olderPosts, tags);
	}

	const [metadata, thumbnail] = await Promise.all([found.metadata(), found.thumbnail?.()]);
	return {
		metadata: {
			...metadata,
			language: found.language,
			slug: found.slug,
		},
		thumbnail,
	};
}

async function getLatestBlogPostWithMostOverlappingTags(
	posts: BlogPostResolver[],
	tags?: string[],
): Promise<BlogPostResolver> {
	if (!tags || !tags.length) {
		return posts[0];
	}

	let maxScore = 0;
	let maxIndex = 0;
	for (let i = 0; i < posts.length; i++) {
		const metadata = await posts[i].metadata();
		if (!metadata.tags || !metadata.tags.length) continue;
		const currentTagSet = new Set(metadata.tags);
		const targetTagSet = new Set(tags);
		const score = currentTagSet.intersection(targetTagSet).size;
		if (score > maxScore) {
			maxScore = score;
			maxIndex = i;
		}
	}
	return posts[maxIndex];
}

export function generateKitEntries(): { slug: string }[] {
	return Object.keys(SLUG_TO_POST).map((slug) => ({ slug }));
}
