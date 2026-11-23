<script lang="ts" module>
	import { markdown } from '@vnphanquang/markdown/svelte';

	import { defineBlogPostMetadata } from '#data/posts/definition';

	export const metadata = defineBlogPostMetadata({
		title: 'Svelte, Build me a Table-of-Contents',
		description:
			'content indexing at compile time or runtime, zero-javascript visibility tracking, and more with @svelte-put/toc',
		keywords:
			'svelte, web, compile-time, build-time, oss, progressive enhancement, ssr, table-of-contents',
		publishedAt: new Date('2026-11-06'),
		updatedAt: new Date('2026-11-12'),
		tags: ['svelte'],
		numWords: 650,
		readMinutes: 5,
		standardSite: 'at://did:plc:vdzlwjjqp5kpce2kxqyoa467/site.standard.document/3n2xxjclofs4p',
		blueskyPost: {
			accountId: 'did:plc:vdzlwjjqp5kpce2kxqyoa467',
			postId: '3n2xygttk2c2d',
		},
	});
</script>

{markdown`
For the millionth time, i just rewrote the entirety of [@svelte-put/toc]. As always, the focus was
micro-optimisation, reducing runtime JS overhead, and most importantly, shifting as much work to
compile-time as possible.

This short post highlights some exciting new features of \`toc\` version 7. For more comprehensive
guidelines and examples, check out [its official documentation page][@svelte-put/toc].

> [!SUCCESS]
> The [Table-of-Contents](#toc) on the package documentation and on _this very page_ is implemented
> with \`@svelte-put/toc\`. Check it out, and turn off Javascript to see if it still work on your
> browser!

## New Compile-Time Strategy

Previously, \`toc\` is a runtime-only abstraction. Shifting work to compile-time would otherwise
introduce unreliable assumption about the user space. In the latest rewrite for V7, however, i
revisted this problem once again but this time with a lot more confidence: the Svelte
preprocessor API today provides more fine-grained control via Vite plugin. See [vite-plugin-svelte >
advanced usage > transform svelte files with vite
plugins](https://github.com/sveltejs/vite-plugin-svelte/blob/83bb409d55d701ccce14f465f07bef2e2fffde9d/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins),
As such, \`toc\` now enables a setup with zero runtime JS overhead:

~~~svelte #title="content.svelte" #typehint
<script module>
	import { compileToc } from '@svelte-put/toc';
	const toc = compileToc(); // [!code info]
</script>

Use {toc.items} for rendering Table-of-Contents, or pass to Toc instance for further enhancement
~~~

> [!SIDENOTE]
> This strategy requires the \`@svelte-put/toc/vite\` plugin to be added to your Vite config.

\`compileToc()\` indexes content within the same Svelte file, looking for elements matching the
config specs - typically heading tags, and replacing itself with a mapping readily available during
SSR. Still, this implementation assumes your content is static and may not be compatible with
certain complex Svelte/SvelteKit setup. Please [file an
issue](https://github.com/vnphanquang/svelte-put/issues/new) if you happen to run into such
scenario. Nevertheless, \`compileToc\` is optional; runtime indexing should be sufficient as a
fallback:

~~~svelte #typehint
<!-- [!code word:runtime.index] -->
<script lang="ts">
	import { Toc } from '@svelte-put/toc';
	const toc = new Toc();
</script>

<main {...toc.runtime.index()}>indexable content</main>
~~~

## Zero Javascript Visibility Tracking

Previously, \`toc\` relied on the [Intersection Observer] API for tracking which content section is
visible within the viewport. This feature is typically used to support a sticky Table-of-Contents
that dynamically highlights the "active" entry. The feature worked, but i was never particular happy
about the implementation because of the dependency on runtime Javascript.

Version 7 introduces a new strategy using the [CSS scroll-driven
animations] API, which has just [hit baseline](https://caniuse.com/wf-scroll-driven-animations)
across modern browsers in 2026.

~~~svelte #typehint
<script lang="ts">
	import { Toc, compileToc } from '@svelte-put/toc';
	const toc = new Toc({ ...compileToc }); // [!code info]
</script>

<!-- ---cut--- -->
<!-- [!code info] -->
<main {...toc.enhance.scope()}>
	<section>
		{#if toc.items.size}
			<ul>
				{#each toc.items.values() as item (item.id)}
					<li>
						<!-- [!code info] -->
						<a {...toc.enhance.link(item)}>
							{item.text}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section>indexable content</section>
</main>

<style>
	@import url('@svelte-put/toc/styles.css'); /* [!code info] */
</style>
~~~

This is a breaking change; it is by no means perfect and certain trade-offs were made in favor for a
leaner approach. But it always feels good to be able to ship less Javascript! See [The Toc Instance>
Visiblity Tracking](https://vnphanquang.com/projects/svelte-put/packages/toc/toc/tracking) for a
thorough explanation on this new feature.

## Slugification & Anchorification

During indexing, \`toc\` slugifies matching elements using [Github
Slugger](https://npmx.dev/package/github-slugger), supporting linkage from a Table-of-Contents. It
also allows [anchor tag
insertion](https://vnphanquang.com/projects/svelte-put/packages/toc/toc/anchor) for quick share:

~~~svelte
<!-- [!code --] -->
<h2>Svelte is Cool</h2>
<!-- [!code ++:3] -->
<h2 id="svelte-is-cool">
	<a href="#svelte-is-cool"> Svelte is Cool </a>
</h2>

<!-- later, within Table-of-Contents -->
<a {...toc.enhance.link(item)}>{item.text}</a>
~~~

This feature exists long before V7, but \`@svelte-put/preprocess-auto-slug\` has been merged into
\`@svelte-put/toc\` to form a single cohesive package and reduce setup effort, especially now
that everything can be done at compile-time.

## A Headless Approach

It is worth noting that a working Table-of-Contents setup in practice requires much more care beyond
the code samples presented in this post. Similar to other packages in the [svelte-put] collection,
\`toc\` is headless; it tries to make little assumption about your UI layer and attempts to abstract
only the logic.

That being said, V7 introduces some stylesheet to support the visibility tracking and reduce manual
setup for anchor insertion:

~~~css
@import '@svelte-put/toc/styles.css';
/* or, depending on your need: */
@import '@svelte-put/toc/styles/anchor.css';
@import '@svelte-put/toc/styles/track.css';
~~~

## Closing

Thanks for reading. Check out my [svelte-put] collection if you still write Svelte by hand in 2026.
And let me know if you have any suggestion for improvement, or let the community know in this
[discussion thread](https://github.com/sveltejs/kit/discussions/12316) if you are already using a
better abstraction.

[svelte-put]: https://vnphanquang.com/projects/svelte-put/overview
[@svelte-put/toc]: https://vnphanquang.com/projects/svelte-put/packages/toc
[CSS scroll-driven animations]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
[Intersection Observer]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
`}
