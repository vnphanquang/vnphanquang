<script lang="ts">
	import { enhanceCodeblock } from 'remark-enhance-codeblock/client';
	import { onMount } from 'svelte';

	let { children, codeless }: import('./markdown.svelte').MarkdownProps = $props();

	// svelte-ignore state_referenced_locally
	if (!codeless) {
		import('remark-enhance-codeblock/styles/all.css');
	}

	onMount(() => {
		enhanceCodeblock();
	});
</script>

{@render children?.()}

