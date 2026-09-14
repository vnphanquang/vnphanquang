<script lang="ts">
	import { Markdown, markdown } from '@vnphanquang/markdown/svelte';
</script>

<main class="p-10">
	<p class="text-blue-500">
		Testing
		<i class="i i-[ph--arrow-square-out]"></i>
		<i class="i ia-3dots"></i>
		<i class="i ia-spinner"></i>
	</p>
	<div class="space-y-10">
		<Markdown>
			{markdown`
# Welcome to SvelteKit

Visit [svelte.dev/docs/kit](https://svelte.dev/docs/kit) to read the documentation

> [!INFO]
> This is a sample “callout” that enhances a text block with some contextual meaning
> and helps draw user's attention

> [!SUCCESS]
> This is a sample “callout” that enhances a text block with some contextual meaning
> and helps draw user's attention

> [!WARNING]
> This is a sample “callout” that enhances a text block with some contextual meaning
> and helps draw user's attention

> [!ERROR]
> This is a sample “callout” that enhances a text block with some contextual meaning
> and helps draw user's attention

~~~javascript
export function hello() {
	console.log('hello world!'); // [!code info]
}
~~~

> [!CODEGROUP]
>
> ~~~typescript #title="kitchen sink"
> console.log('success'); // [!code success]
> console.log('info'); // [!code info]
> console.log('warning'); // [!code warning]
> console.log('error'); // [!code error]
>
> // [!code focus:2]
> console.log('diff removed'); // [!code --]
> console.log('diff added'); // [!code ++]
>
> // word highlight [!code word:the]
> // Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
> ~~~
>
> ~~~typescript #title="vite.config.ts" src="fs:../../vite.config.ts"
>
> ~~~
>
> ~~~javascript #title="eslint.config.js" src="fs:../../eslint.config.js"
>
> ~~~
>
> ~~~json #title="tsconfig.json" src="fs:../../tsconfig.json"
>
> ~~~
>
> ~~~json #title="package.json" src="fs:../../package.json"
>
> ~~~
			`}
		</Markdown>
	</div>
</main>
