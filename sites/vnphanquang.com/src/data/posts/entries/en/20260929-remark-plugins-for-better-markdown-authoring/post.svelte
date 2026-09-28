<script lang="ts" module>
	import { markdown } from '@vnphanquang/markdown/svelte';

	import { defineBlogPostMetadata } from '#data/posts/definition';

	export const metadata = defineBlogPostMetadata({
		title: 'Remark Plugins for Better Markdown Authoring',
		description:
			'Adding callouts or alerts, loading code example from external source, revamping code block UI, and more...',
		keywords: 'unified, markdown, remark, code, authoring, plugin',
		publishedAt: new Date('2026-09-29'),
		tags: ['unified', 'markdown'],
		numWords: 900,
		readMinutes: 5,
		standardSite: 'at://did:plc:vdzlwjjqp5kpce2kxqyoa467/site.standard.document/3mwlorx4zzsgo',
		// blueskyPost: {
		// 	accountId: 'did:plc:vdzlwjjqp5kpce2kxqyoa467',
		// 	postId: '...',
		// },
	});
</script>

{markdown`
Following up on "[Rethinking Markdown in Svelte](/blog/rethinking-markdown-in-svelte)", i think it
may be appropriate to quickly share some of the remark plugins that have become essential in my markdown
authoring toolkit, especially for sharing code examples in documentation and blog posts.

## Notes

A few things before we start:

1. i wrote these plugins. They started out as some adhoc customisation, matured over time, and
   reused enough times that i finally spent time abstracting them to their own packages.
2. a typical use of [unified] is assumed, i.e markdown ([remark]) -> html ([rehype]), for these
   plugins to work.
3. i won't go into details on how each plugin works or how to use them. For that, please visit their
   Github pages.

## Adding Callouts / Alerts

[remark-transform-blockquote] turns a blockquote with special marker into some special HTML.
In this very blog that you are reading, if i write this:

~~~markdown $class=" no-line-number"
> [!INFO]
> A callout UI that provides visual cue for an important text.
~~~

The final HTML will be:

> [!INFO]
> A callout UI that provides visual cue for an important text.

The syntax was inspired by [Github Markdown
Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts),
while the UI was inspired by the SideNote UI from [Josh Comeau's blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/).

The plugin comes with some
[presets](https://github.com/vnphanquang/remark-transform-blockquote#presets) so you can quickly
have Github Markdown Alerts or Josh's SideNote working. It also allows deep customisation that can
support a wide variety of use cases, one of which we will soon see in the next sections.

## Loading Code Example from An External Source

Next, [remark-codeblock-source] is a long-time-coming abstraction that significantly reduces my
maintenance effort when sharing large blocks of code. Say i have some interactive demo i want to render
for readers to try out:

~~~svelte #title="demo.svelte" src="fs:./includes/examples/demo.svelte"

~~~

But i also want to show the source code of that very demo on the same page for readers to inspect /
copy as needed (exactly what i have done above). i'll do:

~~~svelte #title="documentation.svelte" src="fs:./includes/examples/documentation.svelte"

~~~

The example above demonstrates my personal Svelte setup, but [remark-codeblock-source] is not restricted
to Svelte, and will probably work where [unified] is used. The essential part is just this:

~~~~markdown $class=" no-line-number"
~~~svelte src="fs:./demo.svelte"

~~~
~~~~

The idea is simple: write example code in its own file / module, to take full advantage of language
tools and avoid repetition. Then, load it in using the \`src\` meta attribute.

The plugin also allows loading from Github, which comes in handy from time to time. It also allows
providing a custom resolver, in case content is fetched from a CMS, for example.

## A Friendly and Useful Code Block

On the topic of sharing code, [remark-enhance-codeblock] is the most sophisticated so far, completely
revamping the code block UI, as already shown in this post. Here's one again, for good measure:

~~~typescript #title="code me some block"
export function hello() {
	console.log('hello world');
}
~~~

It adds a few convenient features for readers:

1. title for code block that benefits from such context,
2. the option to collapse to avoid cluttering,
3. copy, because what is code for if not to be used,
4. fullscreen, for full eyes on every possible pixel.

But above all, it tries to do so in the most accessible way as possible, with [progressive
enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) in mind.
Try using keyboard to navigate / interact with it. Or, try turning off Javascript and notice:

1. Primary functions still work, including collapsing / expanding,
2. Features that are JS-dependent are not rendered, so readers will not be frustrated when, for
   example, they click on the copy button but nothing is copied.

As a bonus, let's group multiple blocks of code...

> [!CODEGROUP]
>
> ~~~html #title="index.html"
> <html>
> 	<head>
> 		<link rel="stylesheet" href="styles.css" />
> 		<script src="main.js"></script>
> 	</head>
> 	<body>
> 		<div id="app">Hello World!</div>
> 	</body>
> </html>
> ~~~
>
> ~~~javascript #title="main.js"
> function main() {
> 	document.getElementById('app');
> }
> ~~~
>
> ~~~css #title="styles.css"
> #app {
> 	color: red;
> }
> ~~~

...which is made possible by wrapping three fenced code blocks in a blockquote with a marker
\`!CODEGROUP\`, an extended semantic discussed in [Adding Callouts /
Alerts](#adding-callouts--alerts) (the callback i promised).

## Supporting Svelte's Enhanced Img & Embedding Youtube

[@sveltejs/enhanced-img] was probably one of the best thing from the Svelte ecosystem (thank you too
[vite] and [imagetools]). Supporting this package when using Markdown in Svelte, however, has been
historically troublesome, because it uses a rather odd syntax that isn't recognised as valid HTML by
popular markdown parser:

~~~svelte $class=" no-line-number"
<!-- notice the colon : -->
<enhanced:img src="./path/to/your/image.jpg" alt="An alt text" />
~~~

Luckily, supporting this in remark is relatively simple as of right now. The central idea is to
transform a regular \`image\` node with some metadata so that it will turn into the correct Svelte
syntax during an intermediate preprocessing phase (out of scope in this post, see "[Rethinking
Markdown in Svelte](/blog/rethinking-markdown-in-svelte)" for some more details).

As of now, i have not found time to package this abstraction. But you can see the [source
code](https://github.com/vnphanquang/vnphanquang/blob/d29b03bfbf877dc9914bd8bc348a897293e3cb87/packages/markdown/src/unified/plugins/remark-transform-img/index.js#L9)
at Github, or here:

> [!CODEGROUP]
>
> ~~~javascript #title="remark-transform-img.js" src="github:vnphanquang/vnphanquang/d29b03bfbf877dc9914bd8bc348a897293e3cb87/packages/markdown/src/unified/plugins/remark-transform-img/index.js"
>
> ~~~
>
> ~~~javascript #title="types.public.d.ts" src="github:vnphanquang/vnphanquang/d29b03bfbf877dc9914bd8bc348a897293e3cb87/packages/markdown/src/unified/plugins/remark-transform-img/types.public.d.ts"
>
> ~~~

Proceed with caution, however, as no thorough testing has been done for the code above.

> [!SUCCESS] \`$class=" i-[ph--lightbulb]"\`
> The plugin also allows optionally warpping an image in figure, as well as turning a markdown
> image node into an embedded youtube iframe if its source matches "https://youtube.com/embed/...".

## Wrapping Blockquote in Figure with Citation

Blockquote in markdown is quite rudimentary:

> This is a quote from somebody; there is no way to know who...

There is not yet a native way to provide citation or reference to the source material. i wrote a
remark plugin that wraps a \`blockquote\` element in HTML \`figure\`, allowing this pattern:

~~~markdown $class=" no-line-number"
> AI my ass. Me write code. Leave me alone.
>
> -- probably, most definitely me
~~~

The \`--\` in the last paragraph marks whatever follows should go inside \`figcaption\`:

> AI my ass. Me write code. Leave me alone.
>
> -- probably, most definitely me

As in the previous section, however, i have not found time to make this into a standalone package.
You can see its [source code](https://github.com/vnphanquang/vnphanquang/blob/main/packages/markdown/src/unified/plugins/remark-blockquote-figure.js#L16) on Github, or here:

~~~javascript #title="remark-blockquote-figure.js" src="github:vnphanquang/vnphanquang/d29b03bfbf877dc9914bd8bc348a897293e3cb87/packages/markdown/src/unified/plugins/remark-blockquote-figure.js"

~~~

## Closing

Let me know how you are writing markdown, what problems you are facing, or if any of the plugins i
introduced here is useful to you. i'd probably be adding more demo to this post if something
worthwhile comes up later.

For now, thank you for reading.

[@sveltejs/enhanced-img]: https://svelte.dev/docs/kit/images#sveltejs-enhanced-img
[imagetools]: https://github.com/JonasKruckenberg/imagetools
[vite]: https://github.com/vitejs/vite
[unified]: https://github.com/unifiedjs/unified
[remark]: https://github.com/remarkjs/remark
[rehype]: https://github.com/rehypejs/rehype
[remark-codeblock-source]: https://github.com/vnphanquang/remark-codeblock-source
[remark-enhance-codeblock]: https://github.com/vnphanquang/remark-enhance-codeblock
[remark-transform-blockquote]: https://github.com/vnphanquang/remark-transform-blockquote
`}
