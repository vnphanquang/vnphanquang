<script lang="ts">
	import { enhanceCodeblock } from 'remark-enhance-codeblock/client';
	import { onMount } from 'svelte';

	let { children, codeless }: import('./markdown.svelte').MarkdownProps = $props();

	// svelte-ignore state_referenced_locally
	if (!codeless) {
		// @ts-expect-error 2307
		await import('./style.css');
	}

	onMount(() => {
		enhanceCodeblock();
	});
</script>

{@render children?.()}
