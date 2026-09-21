<script lang="ts" module>
	import { type Snippet, getContext, setContext } from 'svelte';

	import type { PageMetadataProps } from '../page-metadata';

	const CONTEXT_KEY = Symbol('page-metadata');
	export type PageMetadataDefaults = () => PageMetadataProps;
	function setPageMetadataDefaults(input: PageMetadataDefaults) {
		return setContext(CONTEXT_KEY, input);
	}
	export function getPageMetadataDefaults(): PageMetadataDefaults {
		return getContext(CONTEXT_KEY);
	}
</script>

<script lang="ts">
	let { children, ...defaults }: PageMetadataProps & { children?: Snippet } = $props();
	setPageMetadataDefaults(() => defaults);
</script>

{@render children?.()}
