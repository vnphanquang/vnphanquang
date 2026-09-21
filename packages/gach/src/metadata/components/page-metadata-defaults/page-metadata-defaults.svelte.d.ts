import type { Component, Snippet } from 'svelte';

import type { PageMetadataProps } from '../page-metadata';

export interface PageMetadataDefaultsProps extends PageMetadataProps {
	children?: Snippet;
}

declare const PageMetadataDefaults: Component<PageMetadataDefaultsProps>;
export default PageMetadataDefaults;

export type PageMetadataDefaults = () => PageMetadataProps;
declare function getPageMetadataDefaults(): PageMetadataDefaults;
export { getPageMetadataDefaults };
