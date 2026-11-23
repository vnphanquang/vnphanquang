<script lang="ts">
	import { enhanceCodeblock } from 'remark-enhance-codeblock/client';
	import { onMount } from 'svelte';

	import './markdown.css';
	import WithCode from './with-code.svelte';

	let { children, codeless }: import('./markdown.svelte').MarkdownProps = $props();

	function getTextExcludingClasses(rootNode: HTMLElement, classNames: string[] = []) {
		if (!rootNode) return '';
		if (!classNames.length) return rootNode.textContent;
		const selector = classNames.map((cls) => `.${CSS.escape(cls)}`).join(', ');
		const clone = rootNode.cloneNode(true) as HTMLElement;
		clone.querySelectorAll(selector).forEach((el) => el.remove());
		return clone.textContent;
	}

	onMount(() => {
		if (!codeless) {
			enhanceCodeblock({
				copy: {
					fn({ pre }) {
						const codeNode = pre.getElementsByTagName('code')[0];
						if (!codeNode) return '';
						return getTextExcludingClasses(codeNode, ['remove', 'twoslash-popup-container']);
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
