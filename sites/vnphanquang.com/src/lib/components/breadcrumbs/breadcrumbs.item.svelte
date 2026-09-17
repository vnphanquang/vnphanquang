<script lang="ts" module>
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface BreadcrumbsItemProps extends HTMLLiAttributes {
		href?: string;
	}
</script>

<script lang="ts">
	const { href, children, ...rest }: BreadcrumbsItemProps = $props();
</script>

<li {...rest}>
	{#if href}
		<a class="c-link-lazy" {href}>{@render children?.()}</a>
	{:else}
		<p>{@render children?.()}</p>
	{/if}
</li>

<style>
	@layer components {
		li {
			display: contents;

			& p,
			a {
				display: inline-block;
			}

			&:not(:first-child)::before {
				content: '>';
			}
		}
	}
</style>
