<script lang="ts">
	import { Toc } from '@svelte-put/toc';
	import { error } from '@sveltejs/kit';
	import { Markdown } from '@vnphanquang/markdown/svelte';

	import { page } from '$app/state';
	import { loadBlogPost } from '$data/posts';
	import { translations } from '$data/translations';
	import { Breadcrumbs, defineCrumbs } from '$lib/components/breadcrumbs';
	import { PageMetadata } from '$lib/components/page-metadata';
	import { TableOfContents } from '$lib/components/table-of-contents';
	import { formatDateForBlog } from '$lib/utils/datetime';

	import type { PageProps } from './$types';

	const { params }: PageProps = $props();

	const post = $derived(await loadBlogPost(params));

	// svelte-ignore state_referenced_locally
	if (!post) error(400, 'No post with such name!'); // for SSR
	$effect(() => {
		if (!post) error(400, 'No post with such name!'); // for CSR
	});

	const crumbs = $derived(
		defineCrumbs([
			{ name: 'vnphanquang.com', label: 'quang', path: '/' },
			{ name: 'Blog', label: 'blog', path: '/blog' },
			{ name: post.metadata.title, label: post.metadata.slug, path: page.url.pathname },
		]),
	);

	let cappedTitle = $derived.by(() => {
		const title = post.metadata.title;
		if (title.length > 100) return title.slice(0, 100) + '...';
		return title;
	});

	let t = $derived(translations[post.metadata.language]);

	const toc = new Toc({
		selector: ':where(h2, h3, h4, h5, h6)',
		observe: {
			enabled: true,
			link: {
				activeAttribute: 'data-current',
			},
		},
	});
</script>

<PageMetadata
	breadcrumbs={crumbs}
	metadata={{
		title: `${cappedTitle} | vnphanquang`,
		description: post.metadata.description,
		og: {
			title: post.metadata.title,
			...(post.ogImage && {
				image: {
					src: post.ogImage,
					alt: '',
				},
			}),
		},
	}}
/>
<main class="max-w-pad @container space-y-10 py-10" lang={post.metadata.language}>
	<Breadcrumbs.List {crumbs} />
	<div class="md">
		<h1>{post.metadata.title}</h1>
		<p class="lead">{post.metadata.description}</p>
	</div>

	{#if post.thumbnail}
		<post.thumbnail />
	{/if}

	<div class="border-fill-200 mobile:flex-col-reverse flex justify-between border-t pbs-2">
		<p>
			{#if post.metadata.numWords}
				~ {post.metadata.numWords} {t.words}
			{/if}{#if post.metadata.readMinutes}
				, {post.metadata.readMinutes} {t.min_read}
			{/if}
		</p>
		<p>
			{formatDateForBlog(post.metadata.publishedAt)}
			{#if post.metadata.updatedAt}
				({t.updated_at} {formatDateForBlog(post.metadata.updatedAt)})
			{/if}
		</p>
	</div>

	<div class="read grid gap-10">
		<!-- post content -->
		<section class="content md" use:toc.actions.root>
			<Markdown codeless={post.metadata.codeless}>
				<post.content />
			</Markdown>
		</section>

		<!-- table of contents -->
		<section
			class="toc tablet:sticky top-header mobile:border-onehalf mobile:border-dashed mobile:border-secondary mobile:-mx-3 mobile:p-3 h-fit space-y-6"
		>
			<h2 class="border-outline border-b-fill-200 border-b text-2xl leading-relaxed font-bold">
				{t.toc}
			</h2>
			<TableOfContents {toc} />
		</section>
	</div>
</main>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	.read {
		grid-template-areas:
			'toc'
			'content';

		@media (--tablet) {
			grid-template-areas: 'content toc';
			grid-template-columns: 1fr 16rem;
		}

		@media (--widescreen) {
			grid-template-columns: 1fr 20rem;
		}

		@media (width >= 96rem) {
			grid-template-columns: 1fr 24rem;
		}
	}

	.content {
		grid-area: content;
	}

	.toc {
		grid-area: toc;
	}
</style>
