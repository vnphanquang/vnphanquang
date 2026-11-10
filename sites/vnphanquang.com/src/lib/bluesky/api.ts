// use @atproto/api for typing to avoid the unnecessary dependencies in final bundle
import type { $Typed, AppBskyFeedDefs, AppBskyEmbedExternal } from '@atproto/api';

export type PostStats = {
	like: number;
	repost: number;
	reply: number;
	bookmark: number;
};

export type AggregatedPost = {
	stats: PostStats;
	post: $Typed<AppBskyFeedDefs.ThreadViewPost>['post'];
	id: string;
	replies: $Typed<AppBskyFeedDefs.ThreadViewPost>[];
	hasMoreReplies: boolean;
};

export async function getPost(input: { accountId: string; postId: string }) {
	const thread = await getPostThread({ ...input, depth: 0 });
	const {
		author: { handle, displayName, avatar, verification },
	} = thread.post;

	return {
		lang: (thread.post.record.langs as string[])?.[0] ?? 'en',
		author: { handle, displayName, avatar, verified: verification?.verifiedStatus === 'valid' },
		text: thread.post.record.text as string,
		indexedAt: thread.post.indexedAt,
		stats: {
			like: thread.post.likeCount ?? 0,
			repost: (thread.post.repostCount ?? 0) + (thread.post.quoteCount ?? 0),
			reply: thread.post.replyCount ?? 0,
			bookmark: thread.post.bookmarkCount ?? 0,
		},
		external: getExternalEmbed(thread.post),
	};
}

function getExternalEmbed(post: AppBskyFeedDefs.PostView) {
	if (!post.embed) return null;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const embed = post.embed as any;
	let external: AppBskyEmbedExternal.External | null = null;
	if (post.embed.$type === 'app.bsky.embed.external#view') {
		external = embed.external;
	} else if (
		embed.$type === 'app.bsky.embed.recordWithMedia#view' &&
		embed.media?.$type === 'app.bsky.embed.external#view'
	) {
		external = embed.media.external;
	}

	if (!external) return null;

	let thumb: string | null = null;
	if (typeof external.thumb === 'string') {
		thumb = external.thumb;
	} else if (typeof external.thumb === 'object') {
		const ext = (external.thumb.mimeType || 'image/jpeg').split('/')[1] || 'jpeg';
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const cid = (external.thumb.ref as any).$link;
		thumb = `https://cdn.bsky.app/img/feed_thumbnail/plain/${post.author.did}/${cid}@${ext}`;
	}

	return {
		uri: external.uri,
		title: external.title,
		description: external.description,
		thumb,
	};
}

export async function getPostThread(input: {
	accountId: string;
	postId: string;
	depth?: number;
}): Promise<$Typed<AppBskyFeedDefs.ThreadViewPost>> {
	// construct request url
	const { accountId, postId, depth } = input;
	const url = new URL('https://api.bsky.app/xrpc/app.bsky.feed.getPostThread');
	url.searchParams.set('uri', buildPostUri(accountId, postId, 'at'));
	url.searchParams.set('parentHeight', '0');
	if (depth !== undefined) url.searchParams.set('depth', depth.toString());

	// fetch thread
	const response = await fetch(url);
	if (!response.ok) {
		// TODO: log error
		throw new Error('Failed to fetch post thread');
	}

	// guard response type
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const thread = ((await response.json()) as any).thread as $Typed<AppBskyFeedDefs.ThreadViewPost>;
	if (thread.$type !== 'app.bsky.feed.defs#threadViewPost') {
		throw new Error('Expected thread view post');
	}

	return thread;
}

export function aggregatePostThread(
	thread: $Typed<AppBskyFeedDefs.ThreadViewPost>,
	maxReplies = 20,
): AggregatedPost {
	return {
		stats: {
			like: thread.post.likeCount ?? 0,
			repost: (thread.post.repostCount ?? 0) + (thread.post.quoteCount ?? 0),
			reply: thread.post.replyCount ?? 0,
			bookmark: thread.post.bookmarkCount ?? 0,
		},
		post: thread.post,
		id: thread.post.uri.split('/')[4],
		replies: (thread.replies?.slice(0, maxReplies) ?? []).filter(
			(reply) => reply.$type === 'app.bsky.feed.defs#threadViewPost',
		) as $Typed<AppBskyFeedDefs.ThreadViewPost>[],
		hasMoreReplies: (thread.replies?.length ?? 0) > maxReplies,
	};
}

export function buildPostUri(
	accountId: string,
	postId: string,
	protocol: 'http' | 'at' = 'http',
): string {
	switch (protocol) {
		case 'at':
			return `at://${accountId}/app.bsky.feed.post/${postId}`;
		case 'http':
		default:
			return `https://bsky.app/profile/${accountId}/post/${postId}`;
	}
}
