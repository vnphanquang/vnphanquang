<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import Item from './breadcrumbs.item.svelte';

	export interface Crumb {
		path?: string;
		name: string;
	}

	export interface BreadcrumbsListProps extends HTMLAttributes<HTMLElement> {
		crumbs?: Crumb[];
	}

	export function defineCrumbs(crumbs: Array<Crumb | string>): Crumb[] {
		return crumbs.map((crumb) => (typeof crumb === 'string' ? { name: crumb } : crumb));
	}
</script>

<script lang="ts">
	const { crumbs, children, ...rest }: BreadcrumbsListProps = $props();
</script>

<nav aria-label="Breadcrumbs" {...rest}>
	<ol>
		{#if crumbs}
			{#each crumbs as item (item.name)}
				<Item href={item.path}>{item.name}</Item>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</ol>
</nav>

<style>
	@layer components {
		ol {
			display: flex;
			gap: 0.5rem;
			justify-content: flex-start;

			font-family: var(--font-fira);
			color: var(--color-stroke-200);

			&::before {
				content: 'pwd: ';
				opacity: 0.5;
			}
		}
	}
</style>
