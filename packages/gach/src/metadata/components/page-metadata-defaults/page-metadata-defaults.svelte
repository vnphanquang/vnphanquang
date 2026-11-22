<script lang="ts" module>
	import { type Snippet, getContext, setContext } from 'svelte';

	import type { PageMetadataProps } from '../page-metadata/page-metadata.svelte';

	const CONTEXT_KEY = Symbol('page-metadata');
	function setPageMetadataDefaults(input: () => PageMetadataProps) {
		return setContext(CONTEXT_KEY, input);
	}
	export function getPageMetadataDefaults(): () => PageMetadataProps {
		return getContext(CONTEXT_KEY);
	}
</script>

<script lang="ts">
	let { children, ...defaults }: PageMetadataProps & { children?: Snippet } = $props();
	setPageMetadataDefaults(() => defaults);
</script>

{@render children?.()}
