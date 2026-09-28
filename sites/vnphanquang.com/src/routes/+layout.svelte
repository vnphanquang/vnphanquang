<script lang="ts">
	import { createContexts } from '@vnphanquang/gach/contexts';
	import { CommonLayout } from '@vnphanquang/gach/layouts';
	import { onMount } from 'svelte';

	import ogImage from '#lib/assets/images/og.jpg?url';
	import { Footer } from '#lib/components/footer';
	import { Header } from '#lib/components/header';
	import { version } from '$app/env';
	import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '$app/env/public';
	import { COOKIE_NAME_COLOR_SCHEME } from '$app/env/public';
	import { navigating, page } from '$app/state';

	import '../app.css';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const contexts = createContexts({
		colorScheme: () => ({
			cookieName: COOKIE_NAME_COLOR_SCHEME,
			user: data.preferences.colorScheme,
		}),
		globalLoading: () => [navigating.complete],
	});

	function identifyUmami() {
		window.umami?.identify({
			systemColorScheme: contexts.colorScheme.system,
			userColorScheme: contexts.colorScheme.user,
		});
	}

	onMount(() => {
		if (window.umami) {
			identifyUmami();
		} else {
			document.getElementById('umami-script')?.addEventListener('load', identifyUmami);
		}
	});
</script>

<svelte:head>
	{#if UMAMI_SCRIPT_URL && UMAMI_WEBSITE_ID}
		<script
			id="umami-script"
			defer
			src={UMAMI_SCRIPT_URL}
			data-website-id={UMAMI_WEBSITE_ID}
		></script>
	{/if}
</svelte:head>

<CommonLayout
	{...contexts}
	metadataDefaults={{
		lang: 'en',
		origin: page.url.origin,
		version,
		metadata: {
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
		},
	}}
>
	<Header />
	{@render children()}
	<Footer {version} />
</CommonLayout>
