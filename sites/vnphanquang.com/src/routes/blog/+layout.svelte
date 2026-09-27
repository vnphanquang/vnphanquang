<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link
		rel="site.standard.publication"
		href="at://did:plc:vdzlwjjqp5kpce2kxqyoa467/site.standard.publication/3mwhx5kottq2y"
	/>
</svelte:head>

{@render children?.()}
