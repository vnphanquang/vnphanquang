<script lang="ts" module>
	import { defineBlogPostMetadata } from '$data/posts/definition';

	export const metadata = defineBlogPostMetadata({
		title: 'Rethinking Markdown in Svelte',
		description:
			'Preprocess static markdown at build time via explicit tagged template - a different take on supporting markdown content in Svelte',
		keywords: 'svelte, markdown, buildtime, static, preprocess, vite plugin',
		publishedAt: new Date('2026-09-19'),
		tags: ['svelte', 'markdown', 'vite'],
	});
</script>

<script lang="ts">
	import { markdown } from '@vnphanquang/markdown/svelte';
</script>

{markdown`
~~~typescript #title="kitchen sink"
console.log('success'); // [!code success]
console.log('info'); // [!code info]
console.log('warning'); // [!code warning]
console.log('error'); // [!code error

// [!code focus:2]
console.log('diff removed'); // [!code --]
console.log('diff added'); // [!code ++

// word highlight [!code word:the]
// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
~~~
`}
