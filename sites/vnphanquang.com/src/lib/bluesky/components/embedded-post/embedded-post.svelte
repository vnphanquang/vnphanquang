<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import type { BlueskyPostLinkage } from '#data/posts/definition';
	import { Avatar } from '#lib/components/avatar';

	import * as bluesky from '../../api';
	import { BlueskyPostStats } from '../post-stats';

	export type BlueskyEmbeddedPostProps = BlueskyPostLinkage & HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
	let { accountId, postId, class: cls, ...rest }: BlueskyEmbeddedPostProps = $props();

	let post = $derived(await bluesky.getPost({ accountId, postId }));

	let profileUrl = $derived(`https://bsky.app/profile/${accountId}`);
	let postUrl = $derived(`${profileUrl}/post/${postId}`);

	let datetimeFormatter = $derived(
		new Intl.DateTimeFormat(post.lang, {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		}),
	);
</script>

<article
	class={[
		'not-md bg-fill-50 shadow-brutal max-w-readable mx-auto space-y-4 border border-current p-4',
		cls,
	]}
	lang={post.lang}
	{...rest}
>
	<div class="flex items-center gap-4">
		<a href={profileUrl} data-external>
			<Avatar
				class="h-10 w-10 rounded-full"
				name={post.author.displayName || 'What'}
				src={post.author.avatar}
				height="40"
				width="40"
			/>
		</a>
		<a class="c-link-lazy flex flex-col gap-1 leading-none" href={profileUrl} data-external>
			<span class="font-bold">
				{post.author.displayName}
			</span>
			<span class="text-sm" style:--color="var(--color-stroke-100)">
				@{post.author.handle}
			</span>
		</a>
		<p class="ms-auto self-start text-sm">
			{datetimeFormatter.format(new Date(post.indexedAt))}
		</p>
	</div>
	<blockquote><p>{post.text}</p></blockquote>
	{#if post.external}
		{let { thumb, uri, title, description } = $derived(post.external)}
		<div class="border-fill-200 border">
			{#if thumb}
				<a href={uri} data-external>
					<img class="border-fill-200 border-be" src={thumb} alt="" />
				</a>
			{/if}
			<div class="p-4">
				<p class="font-semibold">
					<a class="c-link-preserved" href={uri} data-external>{title}</a>
				</p>
				<p class="text-stroke-100 text-sm">
					{description}
				</p>
			</div>
		</div>
	{/if}
	<div class="border-fill-200 flex flex-wrap items-center justify-between gap-2 border-bs pbs-1">
		<BlueskyPostStats stats={post.stats} href={postUrl} />
		<a class="c-link-lazy self-start" href={postUrl}>
			<span> See post on <span class="sr-only">Bluesky</span></span>
			<i class="i i-[simple-icons--bluesky] h-5 w-5"></i>
		</a>
	</div>
</article>
