<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, ...rest }: HTMLAttributes<HTMLPreElement> = $props();
</script>

<pre {...rest} aria-hidden="true">{@render children?.()}</pre>

<style>
	@layer components {
		pre {
			font-family: monospace;
			font-variant-ligatures: none;
			font-variant-numeric: tabular-nums;
			font-kerning: none;
			line-height: 1;
			text-size-adjust: 100%;
			text-size-adjust: 100%;
			text-rendering: geometricprecision;
			letter-spacing: 0;
			white-space: pre;
		}
	}
</style>
