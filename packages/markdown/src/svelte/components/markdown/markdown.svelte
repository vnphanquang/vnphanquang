<script lang="ts">
	import { enhanceCodeblock } from 'remark-enhance-codeblock/client';
	import { onMount } from 'svelte';

	let { children, codeless }: import('./markdown.svelte').MarkdownProps = $props();

	// svelte-ignore state_referenced_locally
	if (!codeless) {
		// @ts-expect-error 2307
		await import('./code.css');
	}

	onMount(() => {
		if (!codeless) {
			enhanceCodeblock({
				copy: {
					fn({ pre }) {
						const codeNode = pre.getElementsByTagName('code')[0];
						if (!codeNode) return '';
						let text = '';
						for (const lineNode of codeNode.children) {
							// assuming ../../../shiki setup
							if ((lineNode as HTMLElement).classList.contains('remove')) continue;
							text += (lineNode.textContent || '') + '\n';
						}
						return text;
					},
				},
			});
		}
	});
</script>

{@render children?.()}
