<script lang="ts">
	import './code.css';

	let { children }: import('./with-code.svelte').WithCodeProps = $props();
</script>

{@render children?.()}
