<script lang="ts" module>
	import { copy } from '@svelte-put/copy';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	export interface CopyBtnProps extends HTMLButtonAttributes {
		textToCopy: string;
		iconClass?: string;
	}
</script>

<script lang="ts">
	let { textToCopy, iconClass = 'i-[ph--link]', children, ...rest }: CopyBtnProps = $props();

	let copyTimeoutId: ReturnType<typeof setTimeout>;
	let copied = $state(false);
	function onCopied() {
		copied = true;
	}
	function onMouseEnterCopyButton() {
		clearTimeout(copyTimeoutId);
	}
	function onMouseLeaveCopyButton() {
		copyTimeoutId = setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<button
	type="button"
	use:copy={{ text: textToCopy }}
	oncopied={onCopied}
	onmouseleave={onMouseLeaveCopyButton}
	onmouseenter={onMouseEnterCopyButton}
	{...rest}
>
	<span class="c-infobox">
		{@render children?.()}
	</span>
	{#if copied}
		<i class="i i-[ph--clipboard-text] h-6 w-6" in:fly={{ duration: 200, y: 10 }}></i>
	{:else}
		<i class={['i h-6 w-6', iconClass]} in:fly={{ duration: 200, y: 10 }}></i>
	{/if}
</button>
