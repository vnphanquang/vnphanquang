<script lang="ts">
	import ogImage from '#lib/assets/images/og.jpg?url';
	import { Footer } from '#lib/components/footer';
	import { Header } from '#lib/components/header';
	import { PageMetadataDefaults } from '#lib/components/page-metadata';
	import { version } from '$app/env';
	import { page } from '$app/state';

	import '../app.css';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<PageMetadataDefaults
	lang="en"
	origin={page.url.origin}
	{version}
	metadata={{
		title: 'vnphanquang',
		description:
			'a personal digital laboratory for nonsensical experiments and whatever else i want',
		keywords: 'vnphanquang, lab, playground, portfolio, personal',
		canonical: page.url.origin + page.url.pathname,
		og: {
			type: 'website',
			siteName: 'vnphanquang',
			image: {
				src: ogImage,
				alt: 'person working away at computer under the night sky, in ascii',
				width: 1200,
				height: 630,
				type: 'image/jpeg',
			},
		},
	}}
>
	<Header />
	{@render children()}
	<Footer {version} />
</PageMetadataDefaults>
