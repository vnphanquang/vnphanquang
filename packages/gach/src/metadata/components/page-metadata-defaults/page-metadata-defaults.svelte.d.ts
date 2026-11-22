import type { Component, Snippet } from 'svelte';

import type { PageMetadataProps } from '../page-metadata/page-metadata.svelte';

export interface PageMetadataDefaultsProps extends PageMetadataProps {
	children?: Snippet;
}

declare const PageMetadataDefaults: Component<PageMetadataDefaultsProps>;
export default PageMetadataDefaults;

declare function getPageMetadataDefaults(): () => PageMetadataProps;
export { getPageMetadataDefaults };
