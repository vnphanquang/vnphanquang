<script lang="ts" module>
	import type { Toc, TocItem } from '@svelte-put/toc';
	import type { HTMLAttributes } from 'svelte/elements';

	export type TocNode = {
		item: TocItem;
		children: TocNode[];
		parents: TocNode[];
	};
</script>

<script lang="ts">
	let { toc, ...rest }: HTMLAttributes<HTMLUListElement> & { toc: Toc } = $props();
</script>

{#if toc.items.size}
	<ol {...rest}>
		{#each toc.items.values() as item (item.id)}
			{const level = item.tag[1]}
			<li>
				<a
					class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
					{...toc.enhance.link(item)}
				>
					<span style:padding-inline-start="calc(1rem * ({level} - 2))">
						{item.text}
					</span>
				</a>
			</li>
		{/each}
	</ol>
{/if}

