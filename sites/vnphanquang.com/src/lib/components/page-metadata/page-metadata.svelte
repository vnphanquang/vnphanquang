<script lang="ts" module>
	import type { Thing } from 'schema-dts';

	import { getPageMetadataDefaults } from './page-metadata-defaults.svelte';
	import { buildStructuredBreadcrumbs, toStringWithContext } from './structured-data';

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
</script>

<script lang="ts">
	let props: PageMetadataProps = $props();

	let getDefaults = getPageMetadataDefaults();

	let { version, meta } = $derived.by(() => {
		const defaults = getDefaults();

		const origin = props.origin ?? defaults.origin ?? '';
		const lang = props.lang ?? defaults.lang ?? 'en';
		const version = props.version ?? defaults.version ?? '';

		const { og: defaultOg, structured: defaultStructured, ...defaultTop } = defaults.metadata ?? {};
		const { og: propOg, structured: propStructured, ...propTop } = props.metadata ?? {};

		const breadcrumbs = props.breadcrumbs ?? defaults.breadcrumbs ?? '';
		const structured = propStructured ?? defaultStructured;
		const things = !structured ? [] : Array.isArray(structured) ? structured : [structured];
		if (breadcrumbs) {
			things.push(
				buildStructuredBreadcrumbs({
					lang,
					origin,
					items: breadcrumbs,
				}),
			);
		}

		const mergedTop = { ...defaultTop, ...propTop };
		const mergedOg = {
			title: mergedTop.title,
			description: mergedTop.description,
			url: mergedTop.canonical,
			...defaultOg,
			...propOg,
			image: {
				...defaultOg?.image,
				...propOg?.image,
			},
		};
		if (mergedOg.image?.src?.startsWith('/')) {
			mergedOg.image.src = `${origin}${mergedOg.image.src}`;
		}

		return {
			lang,
			version,
			meta: {
				...mergedTop,
				og: mergedOg,
				structured: things.length > 0 ? toStringWithContext(things) : undefined,
			},
		};
	});
</script>

<svelte:head>
	<!-- basic tags -->
	{#if meta.title}
		<title>{meta.title}</title>
	{/if}

	{#if version}
		<meta name="version" content={version} />
	{/if}

	{#if meta.description}
		<meta name="description" content={meta.description} />
	{/if}

	{#if meta.keywords}
		<meta name="keywords" content={meta.keywords} />
	{/if}

	{#if meta.canonical}
		<link href={meta.canonical} rel="canonical" />
	{/if}

	<!-- OG tags -->
	{#if meta.og}
		{#if meta.og.type}
			<meta property="og:type" content={meta.og.type} />
		{/if}

		{#if meta.og.title}
			<meta property="og:title" content={meta.og.title} />
		{/if}

		{#if meta.og.description}
			<meta property="og:description" content={meta.og.description} />
		{/if}

		{#if meta.og.siteName}
			<meta property="og:site_name" content={meta.og.siteName} />
		{/if}

		{#if meta.og.url}
			<meta property="og:url" content={meta.og.url} />
		{/if}

		{#if meta.og.locale}
			<meta property="og:locale" content={meta.og.locale.current} />
			{#each meta.og.locale.alternate ?? [] as locale (locale)}
				<meta property="og:locale:alternate" content={locale} />
			{/each}
		{/if}

		{#if meta.og.image}
			{#if meta.og.image.src}
				<meta property="og:image" content={meta.og.image.src} />
			{/if}
			{#if meta.og.image.alt}
				<meta property="og:image:alt" content={meta.og.image.alt} />
			{/if}
			{#if meta.og.image.width}
				<meta property="og:image:width" content={meta.og.image.width.toString()} />
			{/if}
			{#if meta.og.image.height}
				<meta property="og:image:height" content={meta.og.image.height.toString()} />
			{/if}
			{#if meta.og.image.type}
				<meta property="og:image:type" content={meta.og.image.type} />
			{/if}
		{/if}
	{/if}

	<!-- structured data in ld+json -->
	{#if meta?.structured}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html '<' + `script type="application/ld+json">${meta.structured}</script` + '>'}
	{/if}
</svelte:head>
