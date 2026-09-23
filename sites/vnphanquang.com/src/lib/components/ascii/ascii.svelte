<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, ...rest }: HTMLAttributes<HTMLPreElement> = $props();
</script>

<pre {...rest} aria-hidden="true">{@render children?.()}</pre>

<style>
	@layer components {
		pre {
			font-family: monospace;
			line-height: 1;
			letter-spacing: 0;
		}
	}
</style>
