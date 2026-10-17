<script lang="ts">
	import { enhanceCodeblock } from 'remark-enhance-codeblock/client';
	import { onMount } from 'svelte';

	import './markdown.css';
	import WithCode from './with-code.svelte';

	let { children, codeless }: import('./markdown.svelte').MarkdownProps = $props();

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

{#if codeless}
	<WithCode>
		{@render children?.()}
	</WithCode>
{:else}
	{@render children?.()}
{/if}
