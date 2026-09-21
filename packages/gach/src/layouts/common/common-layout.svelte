<script lang="ts">
	import { onMount } from 'svelte';

	import { LoadingBar } from '../../components';
	import { PageMetadataDefaults } from '../../metadata';

	let {
		children,
		lockscroll,
		globalLoading,
		metadataDefaults,
	}: import('./common-layout.svelte').CommonLayoutProps = $props();

	onMount(() => {
		document.documentElement.toggleAttribute('hydrated', true);
	});
</script>

<svelte:document {@attach lockscroll?.apply()} />

<PageMetadataDefaults {...metadataDefaults}>
	{#await globalLoading?.done}
		<LoadingBar />
	{/await}

	{@render children?.()}
</PageMetadataDefaults>
