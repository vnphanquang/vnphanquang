<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type BreadcrumbsListProps = HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
	const { children, ...rest }: BreadcrumbsListProps = $props();
</script>

<nav aria-label="Breadcrumbs" {...rest}>
	<ol>
		{@render children?.()}
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
