<script lang="ts" module>
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import type { PostStats } from '#lib/bluesky/api.ts';

	export interface BlueskyPostStats extends HTMLAnchorAttributes {
		stats: PostStats;
	}

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
		save: {
			icon: 'i-[ph--bookmark-simple]',
			aria: 'save',
		},
	} as const;
</script>

<script lang="ts">
	let { stats, ...rest }: BlueskyPostStats = $props();
</script>

<a
	class="c-link-lazy flex flex-wrap items-center gap-4 @max-xs:col-span-2 @max-xs:justify-self-center @sm:gap-6"
	data-external
	{...rest}
>
	<dl class="contents">
		{#each Object.entries(BLUESKY_STATS_CONFIG) as [key, { icon, aria }] (key)}
			<div class="flex items-center gap-1">
				<dt>
					<i class={['i block h-5 w-5', icon]}></i>
					<span class="sr-only">
						{aria}
					</span>
				</dt>
				<dd class="c-text-body-sm">{stats[key as keyof typeof stats]}</dd>
			</div>
		{/each}
	</dl>
</a>
