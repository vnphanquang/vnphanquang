import type { Component, Snippet } from 'svelte';

import type { LoadingContext, LockScrollContext } from '@vnphanquang/gach/contexts';

import type { PageMetadataProps } from '../../metadata/components';

export interface CommonLayoutProps {
	metadataDefaults?: PageMetadataProps;
	children?: Snippet;
	lockscroll?: LockScrollContext;
	globalLoading?: LoadingContext;
}

/**
 * Add global dialog portal, notification portal, lockscroll, loading, etc.
 */
declare const CommonLayout: Component<CommonLayoutProps>;
export default CommonLayout;
