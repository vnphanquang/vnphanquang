<script lang="ts" module>
	import { defineBlogPostMetadata } from '#data/posts/definition';

	export const metadata = defineBlogPostMetadata({
		title: 'Rethinking Markdown in Svelte',
		description:
			'Preprocess static markdown at build time via explicit tagged template - a different take on supporting markdown content in Svelte',
		keywords: 'svelte, markdown, buildtime, static, preprocess, vite plugin',
		publishedAt: new Date('2026-09-27'),
		tags: ['svelte', 'markdown', 'vite'],
	});
</script>

<script lang="ts">
	import { markdown } from '@vnphanquang/markdown/svelte';
</script>

{markdown`
i have been authoring content using Markdown in Svelte land for a while now, sometimes for documentation (e.g.
[svelte-put], a personal collection of Svelte utilities), sometimes for blog posts (e.g. the [Svelte
Vietnam Blog](https://www.sveltevietnam.dev/en/blog)). Contemporary solutions to preprocess Markdown
in Svelte components that i have tried all leave sometimes to be desired for my personal taste.

This post discusses the problem i have with current solutions, and a new alternative.

## TL;DR

[svelte-md-template], a minimal package to support Markdown in Svelte, allows the following
pattern...

~~~svelte #title="+page.svelte" src="fs:./includes/examples/tldr.svelte"

~~~

...which supports better tooling, avoids syntax clashes and vendor lock-in.

## Today Markdown-in-Svelte Preprocessors

For feature-rich, battery-included solutions, there is, of course, [MDsveX], which at the time of
this writing, builds upon on the [unified] ecosystem. There is also [vite-plugin-svelte-md],
which uses [markdown-exit] (a rewrite of [markdown-it]). Other solutions that i am aware of mostly
use the same preprocessing strategy, only differ in the underlying parser.

On the custom solution side of things, there have been several blog posts that provide instruction
on how to build one, ...

- Joy of Code's [How To Make A Svelte Markdown Preprocessor](https://joyofcode.xyz/svelte-preprocessors)
- Steve Kinney's [Creating a Markdown Preprocessor for Svelte](https://stevekinney.com/writing/svelte-markdown-preprocessor)

...to name a few.

> [!INFO]
> Dynamic solutions to render Markdown -> HTML on the fly exist, e.g. [@humanspeak/svelte-markdown](https://github.com/humanspeak/svelte-markdown),
> but are not the focus of this post.

## My Problem

All preprocessors i have seen so far share the same problematic strategy: they mix Svelte and
Markdown syntax at the top level. Here is a canonical example from [MDsveX]:

~~~svelte #title="+page.svelte" src="fs:./includes/examples/mdsvex.svelte"

~~~

This method works okay for simple use cases. However, as i use it more extensively, especially in
writing interactive content that relies heavily on Svelte-specific syntax, some inconveniences start
to surface:

1. Toolings degrade. For example, formatters, linters, highlighters break down or only work
   partially. The most i could do was choose to treat the current buffer as either Svelte or Markdown,
   neglecting support for the other.
2. There are compatibility issues with Svelte syntax. For example, see
   [vite-plugin-svelte-md > Svelte Compatibility](https://github.com/ota-meshi/vite-plugin-svelte-md#-svelte-compatibility),
   or [mdsvex > issue 550 (enhance-img)](https://github.com/pngwn/MDsveX/issues/550).
   As Svelte semantics evolve, maintaining compatibility may require significant effort and/or
   breaking changes.
3. Upstream transformer/parser is locked-in (e.g. [unified] or [markdown-it]), and the library often
   implements more features where i don't need them, but not enough where i need so.

## Introducing svelte-md-template

[svelte-md-template] is a _naive_ take on a more explicit, minimal, and customisable approach,
utilising standard constructs as much as possible. It requires writing Markdown in an explicit
tagged template:

~~~svelte $class="no-line-number"
{markdown(\`write your markdown here\`)}
~~~

In a way, it reverse the priority: Svelte-first, Markdown as needed. "Naive" because i may be
ignorant to the implications this approach has in practice. So far, however, it has served me well:

1. Good tooling support: \`markdown\` tagged templates are often picked up automatically for
   syntax-highlighting or formatting. At the very least, it should be able to customise modern
   LSP / formatter settings to do so. See [Docs > Recommmended Prettier Config](https://github.com/vnphanquang/svelte-md-template#recommended-prettier-config)
   for an example.
2. Minimal processing: the package footprint is quite small, as it doesn't have to maintain custom
   AST or complex parsing. Theoretically, fewer compatibility issues should arise, if at all.

> [!WARNING]
> Small footprint does not necessarily means more optimised. i have not done any benchmark against
> other tools. i suspect the performance largely depends on the transformer being used.

See [Docs > Transformer](https://github.com/vnphanquang/svelte-md-template#transformer) on how to
customise or supply your own Markdown parser.

## Not Perfect

Of course, no solution is without tradeoffs. If you use [svelte-md-template] in a typical Svelte
project, consider configuring your prettier / formatter tooling to avoid auto indentation, as that
would be parsed as fenced code block accidentally.

~~~svelte #title="don't auto-indent"
{markdown(\`
Don't indent here
as it may become
a fenced code block
\`)}
~~~

See [Docs > Recommmended Prettier Config](https://github.com/vnphanquang/svelte-md-template#recommended-prettier-config) for an example.
Another inconvenience is that backticks and curly braces need to be escaped appropriately:

~~~svelte #title="escapes"
{markdown(\` \\\`inline code\\\` need to be escaped \`)}
{markdown(
	\` curly braces, i.e { need to be escaped, unless you intend to use a Svelte expression \`,
)}
~~~

See [Docs > Tradeoffs &
Caveats](https://github.com/vnphanquang/svelte-md-template#tradeoffs--caveats) for some more
explanation.

Lastly, there may be some issue with HMR working in SvelteKit at the moment. Behaviorally, changing
markdown content may cause the scroll position to reset. This may or may not happen with your setup.
In any case, i'm actively looking into it.

## Keeping an Eye on [MDsveX]

A big part of why i started to implement a replacement for MDsveX in the first place was that it has
been trying moving away from the [unified] ecosystem. [@pngwn] - the code owner of MDsveX - laid
out some very reasonable arguments in [this discussion](https://github.com/pngwn/MDsveX/discussions/259).
\`svelte-md-template\` does not suffer from the same problem because, as explained, it isn't mixing
Svelte and Markdown syntax together.

That being said, there has been some recent activities in the [mdsvex] Github repository. [@pngwn]
just published [twinkleplop](https://github.com/pngwn/twinkleplop), a syntax highligher that
[claims to be faster](https://twinkleplop.pngwn.at/docs/benchmarks) than most popular contemporary
alternatives, with some very noble ideas. i suspect [@pngwn] is cooking something up that is worth
keeping an eye on.

## Closing

Will \`svelte-md-template\` prove to be a viable option in Svelte land? Perhaps only time can tell.
Let me know if you have any thoughts. And thank you for reading.

[mdsvex]: https://github.com/pngwn/mdsvex
[unified]: https://github.com/unifiedjs/unified
[vite-plugin-svelte-md]: https://github.com/ota-meshi/vite-plugin-svelte-md
[markdown-exit]: https://github.com/serkodev/markdown-exit
[markdown-it]: https://github.com/markdown-it/markdown-it
[@pngwn]: https://github.com/pngwn
[svelte-md-template]: github.com/vnphanquang/svelte-md-template
[svelte-put]: https://svelte-put.vnphanquang.com/
`}
