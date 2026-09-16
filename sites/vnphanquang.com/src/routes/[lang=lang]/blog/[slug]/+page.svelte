<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { Markdown } from '@vnphanquang/markdown/svelte';

	import { loadBlogPost } from '$data/posts';

	import type { PageProps } from './$types';

	const { params }: PageProps = $props();

	const post = $derived(await loadBlogPost(params));

	if (!post) error(400, 'No post with such name!'); // for SSR
	$effect(() => {
		if (!post) error(400, 'No post with such name!'); // for CSR
	});
</script>

<main class="max-w-pad py-20">
	<section class="md">
		<h1>{post.metadata.title}</h1>
		<Markdown codeless={post.metadata.codeless}>
			<post.content />
		</Markdown>
	</section>
</main>
