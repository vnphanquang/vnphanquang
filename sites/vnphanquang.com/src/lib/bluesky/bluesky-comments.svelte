<script lang="ts">
	import type { BlueskyPostLinkage } from '#data/posts/definition';
	import { Avatar } from '#lib/components/avatar';
	import { formatTimeDiff } from '#lib/utils/datetime';
	import { browser } from '$app/env';

	import * as bluesky from './api';

	let { linkage }: { linkage: BlueskyPostLinkage } = $props();

	const BLUESKY_STATS_CONFIG = {
		reply: {
			icon: 'i-[ph--chat]',
			aria: 'replies',
		},
		repost: {
			icon: 'i-[ph--repeat]',
			aria: 'reposts',
		},
		like: {
			icon: 'i-[ph--heart]',
			aria: 'likes',
		},
	} as const;

	let postUrl = $derived(bluesky.buildPostUri(linkage.accountId, linkage.postId, 'http'));
	let threadPromise = $derived(
		browser
			? bluesky.getPostThread(linkage).then(bluesky.aggregatePostThread)
			: new Promise<bluesky.AggregatedPost>(() => {}),
	);
</script>

<section class="max-w-pad mobile:overflow-auto space-y-10" lang="en">
	<h2
		class="border-outline border-b-fill-200 border-b text-2xl leading-relaxed font-bold capitalize"
		id="comments"
	>
		Comments
	</h2>
	<div
		class="tablet:items-start tablet:gap-8 desktop:gap-10 widescreen:gap-20 tablet:flex-row relative flex flex-col-reverse gap-10"
	>
		<!-- replies -->
		<div class="max-h-[min(75vh,50rem)] flex-1 space-y-6 overflow-auto">
			<svelte:boundary>
				{@const thread = await threadPromise}
				{#snippet pending()}
					<p>Loading comments from Bluesky (needs Javascript). Please hang tight...</p>
				{/snippet}
				{#if thread.replies.length}
					{@render blueskyReplies(thread)}
					{#if thread.hasMoreReplies}
						<p class="border-outline border-t pt-1 text-end capitalize">
							See full discussion on
							<a class="c-link" href={postUrl} data-external>Bluesky</a>
						</p>
					{/if}
				{:else}
					<p>
						There is no comment yet. Add yours now on
						<a class="c-link" href={postUrl} data-external>Bluesky</a>!
					</p>
				{/if}
			</svelte:boundary>
		</div>

		<!-- stats & banner -->
		<div class="tablet:sticky tablet:inset-bs-header">
			<article class="tablet:w-64 widescreen:w-80 @container relative 2xl:w-96">
				<div
					class={[
						'group grid grid-cols-[auto_1fr] items-center',
						'gap-4 p-4 @sm:gap-x-6 @sm:p-6 @md:gap-x-10 @md:p-8',
						'border-onehalf bg-surface shadow-brutal border-current',
						'interactive',
					]}
				>
					<a
						class={[
							'block shrink-0',
							'i i-[simple-icons--bluesky] h-14 w-14 @xs:h-18 @xs:w-18',
							'group-hover:text-bluesky transition-[rotate,color] duration-(--duration) ease-(--easing) group-hover:-rotate-20',
							'@xs:row-span-2',
						]}
						href={postUrl}
						data-external
					>
						<span class="sr-only">Bluesky</span>
					</a>
					<p class="font-bold">
						Give kudos, and join the conversation on
						<a class="c-link" href={postUrl} data-external>Bluesky</a>!
					</p>
					<svelte:boundary>
						{@const thread = await threadPromise}
						{#snippet pending()}
							<p>Loading statistics</p>
						{/snippet}
						{@render blueskyStats(
							thread.stats.like,
							thread.stats.repost,
							thread.stats.reply,
							postUrl,
						)}
						{#if thread.replies.length}
							<p class="c-text-body-sm border-outline col-span-2 border-t pt-4 leading-relaxed">
								Note: comments are fetched directly from the
								<a class="c-link" href={postUrl} data-external>linked Bluesky post</a>. Embedded
								contents such as images are omitted here.
							</p>
						{/if}
					</svelte:boundary>
				</div>
			</article>
		</div>
	</div>
</section>

{#snippet blueskyStats(like: number, repost: number, reply: number, url: string, small?: boolean)}
	{@const stats = { like, repost, reply }}
	<a
		class="c-link-lazy flex flex-wrap items-center gap-4 @max-xs:col-span-2 @max-xs:justify-self-center @sm:gap-6"
		href={url}
		data-external
	>
		<dl class="contents">
			{#each Object.entries(BLUESKY_STATS_CONFIG) as [key, { icon, aria }] (key)}
				<div class="flex items-center gap-2">
					<dt>
						<i class={['i block', icon, small ? 'h-5 w-5' : 'h-6 w-6']}></i>
						<span class="sr-only">
							{aria}
						</span>
					</dt>
					<dd class={[small && 'c-text-body-sm']}>{stats[key as keyof typeof stats]}</dd>
				</div>
			{/each}
		</dl>
	</a>
{/snippet}

{#snippet blueskyReplies(aggregated: bluesky.AggregatedPost, cls = '', level = 0)}
	<ul class={cls}>
		<!-- render actual comments here -->
		{#each aggregated.replies ?? [] as reply, i (reply.post.uri)}
			{@const thread = bluesky.aggregatePostThread(reply)}
			{@const hasNext = !!aggregated.replies[i + 1] || !!thread.replies?.length}
			{@const profileUrl = `https://bsky.app/profile/${thread.post.author.did}`}
			{@const postUrl = `${profileUrl}/post/${thread.id}`}
			<li>
				<article class={['relative flex items-start gap-3', hasNext && 'pb-4']}>
					<div class="bg-fill-50 z-px relative shrink-0 p-1">
						<a href={profileUrl} data-external>
							<Avatar
								class="h-10 w-10 rounded-full"
								name={thread.post.author.displayName || 'What'}
								src={thread.post.author.avatar}
								height="40"
								width="40"
							/>
						</a>
					</div>
					<div class="pt-1">
						<p>
							<a class="c-link-preserved" href={profileUrl} data-external>
								<span class="font-bold">
									{thread.post.author.displayName}
								</span>
								<span class="not-hover:text-stroke-100 text-sm">
									@{thread.post.author.handle}
								</span>
							</a>
							•
							{formatTimeDiff(thread.post.indexedAt)}
						</p>
						<p class="pt-1 pb-2">{thread.post.record.text}</p>
						{@render blueskyStats(
							thread.stats.like,
							thread.stats.repost,
							thread.stats.reply,
							postUrl,
							true,
						)}
						{#if thread.replies?.length}
							{@render blueskyReplies(thread, 'mt-6', level + 1)}
						{/if}
					</div>
					{#if level === 0 || !!thread.replies?.length}
						<div class="bg-fill-200 absolute inset-s-5.5 inset-bs-0 z-0 h-full w-0.5"></div>
					{/if}
					{#if level > 0}
						<div class="bg-fill-200 absolute inset-e-full inset-bs-5.5 z-0 h-0.5 w-9"></div>
					{/if}
					{#if level > 1 && i === aggregated.replies.length - 1}
						<div class="bg-fill-50 z-px absolute -inset-s-9.5 inset-bs-6 h-full w-0.5"></div>
					{/if}
				</article>
			</li>
		{/each}
	</ul>
{/snippet}
