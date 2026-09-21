import type { Thing } from 'schema-dts';
import type { Component } from 'svelte';

export interface Metadata {
	title?: string;
	description?: string;
	keywords?: string;
	canonical?: string;
	/** LD+SON structured data */
	structured?: Thing[] | Thing;
	og?: {
		type?: 'website' | 'article' | 'profile';
		title?: string;
		description?: string;
		siteName?: string;
		url?: string;
		locale?: {
			current?: string;
			alternate?: string[];
		};
		image?: {
			src?: string;
			alt?: string;
			width?: number;
			height?: number;
			type?: string;
		};
	};
}

export interface PageMetadataProps {
	/** current site ISO language code */
	lang?: string;
	/** site origin */
	origin?: string;
	/** page-specific data  */
	metadata?: Metadata;
	/** site/app version, usually contain git hash of build commit */
	version?: string;
	/** add BreadcrumbList structured data if provided */
	breadcrumbs?: { path: string; name: string }[];
}

declare const PageMetadata: Component<PageMetadataProps>;
export default PageMetadata;
