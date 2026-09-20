<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { listBlogPosts } from '$data/posts';
	import { buildStructuredBlog } from '$data/posts/structured';
	import { translations } from '$data/translations';
	import asciiCogito from '$lib/assets/ascii/cogito.txt?raw';
	import asciiOcarina from '$lib/assets/ascii/ocarina.txt?raw';
	import { Ascii } from '$lib/components/ascii';
	import { Breadcrumbs, defineCrumbs } from '$lib/components/breadcrumbs';
	import { PageMetadata } from '$lib/components/page-metadata';
	import { formatDateForBlog } from '$lib/utils/datetime';

	import ogImage from './og.jpg?url';

	const crumbs = defineCrumbs([
		{ name: 'vnphanquang.com', label: 'quang', path: '/' },
		{ name: 'Blog', label: 'blog', path: page.url.pathname },
	]);

	const posts = await listBlogPosts();
</script>

<PageMetadata
	breadcrumbs={crumbs}
	metadata={{
		title: 'Latest Thoughts | vnphanquang',
		description: 'scribbling, scrabbling, but mostly just babbling...',
		og: {
			title: 'Latest Thoughts in Writing',
			image: {
				src: ogImage,
				alt: '',
			},
		},
		structured: buildStructuredBlog(),
	}}
/>
<main class="max-w-pad mobile:flex-col flex flex-1 gap-20 py-10">
	<div class="max-w-readable w-full space-y-10">
		<div>
			<h1 class="tablet:text-4xl font-quang border-b text-3xl font-bold">Latest thoughts</h1>
			<p class="text-right text-sm leading-relaxed italic">
				<a class="c-link-lazy" href="https://youtu.be/9B612wK056c?si=qEE1XFp1Y9aq7v8N">
					"Hey! Listen!"
				</a>
			</p>
		</div>

		<ul class="space-y-8">
			{#each posts as post (post.metadata.slug)}
				{const href = resolve('/blog/[slug]', { slug: post.metadata.slug })}
				{const t = translations[post.metadata.language]}
				<li>
					<article
						class="group border-fill-200 tablet:p-6 bg-fill-50 relative space-y-2 border p-4"
						lang={post.metadata.language}
					>
						{#if post.thumbnail}
							<a class="@container block p-4" {href} aria-hidden={true}>
								<post.thumbnail />
							</a>
						{/if}
						<h2>
							<a class="c-link-preserved relative text-xl font-bold" {href}>
								{post.metadata.title}
								<i class="not-can-hover:hidden i i-[ph--cursor-click] text-[0.75em]"></i>
							</a>
						</h2>
						<p class="text-stroke-200">
							{formatDateForBlog(post.metadata.updatedAt ?? post.metadata.publishedAt)}
							{#if post.metadata.readMinutes}
								• {post.metadata.readMinutes} {t.min_read}
							{/if}
						</p>
						<p>{post.metadata.description}</p>
						<a
							class="c-link-lazy bg-fill-50/80 absolute inset-e-0 inset-bs-0 border-s border-be p-2"
							{href}
						>
							Read more
							<i class="i i-[ph--arrow-right]"></i>
						</a>
					</article>
				</li>
			{/each}
		</ul>

		<div class="flex items-end justify-between">
			<Breadcrumbs.List class="mbs-10" {crumbs} />
			<a class="c-link-lazy" href="https://www.youtube.com/watch?v=Heciu9zmiOE">
				<Ascii class="text-[0.05rem] opacity-50">{asciiOcarina}</Ascii>
				<span class="sr-only">an ocarina</span>
			</a>
		</div>
	</div>

	<Ascii class="mobile:mx-auto tablet:sticky mobile:text-[0.7rem] inset-bs-10 mbs-10 h-fit"
		>{asciiCogito}</Ascii
	>
</main>
