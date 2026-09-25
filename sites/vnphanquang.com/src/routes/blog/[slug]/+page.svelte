<script lang="ts">
	import { Toc } from '@svelte-put/toc';
	import { error } from '@sveltejs/kit';
	import { PageMetadata } from '@vnphanquang/gach/metadata';
	import { Markdown } from '@vnphanquang/markdown/svelte';

	import { getNextRelevantBlogPost, loadBlogPost } from '#data/posts';
	import { buildStructuredBlogPost } from '#data/posts/structured';
	import { translations } from '#data/translations';
	import { BlueskyComments } from '#lib/bluesky';
	import { BlogPostItem } from '#lib/components/blog-post-item';
	import { BlogPostQuickNav } from '#lib/components/blog-post-quick-nav';
	import { Breadcrumbs, defineCrumbs } from '#lib/components/breadcrumbs';
	import { SocialShare } from '#lib/components/social-share';
	import { TableOfContents } from '#lib/components/table-of-contents';
	import { formatDateForBlog } from '#lib/utils/datetime';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

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

	let contentEl: HTMLElement | undefined = $state(undefined);
	let showQuickNav = $state(false);
	function onScroll() {
		if (!contentEl) return;
		showQuickNav = window.scrollY > contentEl.offsetTop;
	}
</script>

<svelte:window onscroll={onScroll} />

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
		structured: buildStructuredBlogPost(page.url.origin, post),
	}}
/>

<main class="flex-1 space-y-20 py-10">
	<section class="max-w-pad @container space-y-10" lang={post.metadata.language}>
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
			{#key post.metadata.slug}
				<section class="content md" use:toc.actions.root id="content" bind:this={contentEl}>
					<Markdown codeless={post.metadata.codeless}>
						<post.content />
					</Markdown>
					<p class="border-t-fill-200 border-t pt-2 text-sm">
						Found a typo or need to correct something?
						<a class="c-link" href={post.contentEditUrl}>Suggest an edit on Github</a>.
					</p>
				</section>
			{/key}

			<!-- table of contents -->
			<div class="toc">
				<section
					class="tablet:sticky top-header mobile:border-onehalf mobile:border-dashed mobile:border-secondary mobile:-mx-3 mobile:p-3 space-y-6"
				>
					<h2
						class="border-outline border-b-fill-200 border-b text-2xl leading-relaxed font-bold"
						id="toc"
					>
						{t.toc}
					</h2>
					<TableOfContents {toc} />
				</section>
			</div>

			<!-- share -->
			<section class="share space-y-6">
				<h2
					class="border-outline border-b-fill-200 border-b text-2xl leading-relaxed font-bold capitalize"
					id="share"
				>
					{t.share}
				</h2>
				<SocialShare
					url={page.url.origin + resolve('/blog/[slug]', { slug: post.metadata.slug })}
					title={post.metadata.title}
				/>
			</section>

			<section class="read-more space-y-6">
				<h2
					class="border-outline border-b-fill-200 border-b text-2xl leading-relaxed font-bold capitalize"
					id="read-more"
				>
					{t.read_more}
				</h2>
				{let next = $derived(await getNextRelevantBlogPost(params))}
				{let nextHref = $derived(resolve('/blog/[slug]', { slug: next.metadata.slug }))}
				<BlogPostItem post={next} href={nextHref} />
			</section>
		</div>
	</section>

	{#if post.metadata.blueskyPost}
		<BlueskyComments linkage={post.metadata.blueskyPost} />
	{/if}
</main>
<BlogPostQuickNav visible={showQuickNav} />

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	.read {
		grid-template-areas:
			'toc'
			'content'
			'share'
			'read-more';

		@media (--tablet) {
			grid-template-areas:
				'content share'
				'content toc'
				'content read-more';
			grid-template-columns: 1fr 16rem;
			grid-template-rows: auto 1fr auto;
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

	.share {
		grid-area: share;
	}
</style>
