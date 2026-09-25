<script lang="ts">
	import type { BlogPost } from '#data/posts/definition';
	import { translations } from '#data/translations';
	import { formatDateForBlog } from '#lib/utils/datetime';

	let { post, href }: { post: Omit<BlogPost, 'content'>; href: string } = $props();

	let t = $derived(translations[post.metadata.language]);
</script>

<article
	class="border-fill-200 tablet:p-6 bg-fill-50 relative border p-4"
	lang={post.metadata.language}
>
	<div class="space-y-2">
		{#if post.thumbnail}
			<a class="@container block p-4" {href} aria-hidden={true}>
				<post.thumbnail />
			</a>
		{/if}
		<h2>
			<a class="c-link-preserved relative text-xl font-bold" {href}>
				{post.metadata.title}
			</a>
		</h2>
		<p class="text-stroke-200">
			{formatDateForBlog(post.metadata.updatedAt ?? post.metadata.publishedAt)}
			{#if post.metadata.readMinutes}
				• {post.metadata.readMinutes} {t.min_read}
			{/if}
		</p>
		<p>{post.metadata.description}</p>
	</div>
	<a class="c-link-lazy bg-fill-50/80 absolute inset-e-0 inset-bs-0 border-s border-be p-2" {href}>
		{t.read_more}
		<i class="i i-[ph--arrow-right]"></i>
	</a>
</article>
