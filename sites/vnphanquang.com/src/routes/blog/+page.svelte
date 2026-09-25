<script lang="ts">
	import { PageMetadata } from '@vnphanquang/gach/metadata';

	import { listBlogPosts } from '#data/posts';
	import { buildStructuredBlog } from '#data/posts/structured';
	import asciiCogito from '#lib/assets/ascii/cogito.txt?raw';
	import asciiOcarina from '#lib/assets/ascii/ocarina.txt?raw';
	import { Ascii } from '#lib/components/ascii';
	import { BlogPostItem } from '#lib/components/blog-post-item';
	import { Breadcrumbs, defineCrumbs } from '#lib/components/breadcrumbs';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

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
<main class="max-w-pad max-desktop:flex-col desktop:gap-20 flex flex-1 py-10">
	<div class="max-w-readable w-full space-y-10">
		<div>
			<h1 class="tablet:text-4xl font-quang border-b text-3xl font-bold">latest thoughts</h1>
			<p class="text-right text-sm leading-relaxed italic">
				<a class="c-link-lazy" href="https://youtu.be/9B612wK056c?si=qEE1XFp1Y9aq7v8N">
					"Hey! Listen!"
				</a>
			</p>
		</div>

		<ul class="space-y-8">
			{#each posts as post (post.metadata.slug)}
				{const href = resolve('/blog/[slug]', { slug: post.metadata.slug })}
				<li>
					<BlogPostItem {post} {href} />
				</li>
			{/each}
		</ul>

		<div class="flex items-end justify-between">
			<Breadcrumbs.List class="mbs-10" {crumbs} />
			<a class="c-link-lazy" href="https://www.youtube.com/watch?v=Heciu9zmiOE">
				<Ascii class="text-[0.05rem] opacity-75">{asciiOcarina}</Ascii>
				<span class="sr-only">an ocarina</span>
			</a>
		</div>
	</div>

	<Ascii
		class="max-desktop:mx-auto tablet:sticky max-widescreen:text-[0.7rem] inset-bs-10 mbs-10 h-fit tracking-wide"
		>{asciiCogito}</Ascii
	>
</main>
