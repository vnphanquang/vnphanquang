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
	<div class="md max-w-readable-relaxed mx-auto">
		<p class="lead">
			Until now, trying to style an article, document, or blog post with Tailwind has been a tedious
			task that required a keen eye for typography and a lot of complex custom CSS.
		</p>
		<ol>
			<li>
				<strong>Nested lists are rarely a good idea.</strong>
				<ul>
					<li>
						You might feel like you are being really "organized" or something but you are just
						creating a gross shape on the screen that is hard to read.
					</li>
					<li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>
					<li>Nesting tons of folders in your source code is also not helpful.</li>
				</ul>
			</li>
			<li>
				<strong>Since we need to have more items, here's another one.</strong>
				<ul>
					<li>I'm not sure if we'll bother styling more than two levels deep.</li>
					<li>Two is already too much, three is guaranteed to be a bad idea.</li>
					<li>If you nest four levels deep you belong in prison.</li>
				</ul>
			</li>
			<li>
				<strong>Two items isn't really a list, three is good though.</strong>
				<ul>
					<li>Again please don't nest lists if you want people to actually read your content.</li>
					<li>Nobody wants to look at this.</li>
					<li>I'm upset that we even have to bother styling this.</li>
				</ul>
			</li>
		</ol>
		<p class="lead">
			Until now, trying to style an article, document, or blog post with Tailwind has been a tedious
			task that required a keen eye for typography and a lot of complex custom CSS.
		</p>

		<dl>
			<dt>Why do you never see elephants hiding in trees?</dt>
			<dd>
				Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
				cupiditate laboriosam fugiat.
			</dd>
			<dt>What do you call someone with no body and no nose?</dt>
			<dd>
				Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa
				quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.
			</dd>
			<dt>Why can't you hear a pterodactyl go to the bathroom?</dt>
			<dd>
				Because the pee is silent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
				quas voluptatibus ex culpa ipsum, aspernatur blanditiis fugiat ullam magnam suscipit
				deserunt illum natus facilis atque vero consequatur! Quisquam, debitis error.
			</dd>
		</dl>

		<Markdown>
			{markdown`
# Welcome to SvelteKit

Visit [svelte.dev/\`docs\`/kit](https://svelte.dev/docs/kit) to **read the _documentation_**

## Callouts

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

> [!ERROR] \`$class=" i-[ph--megaphone]"\`
> This is a sample “callout” that enhances a text block with some contextual meaning
> and helps draw user's attention

---

## Code Blocks

### Single No **Title**

~~~javascript
export function hello() {
	console.log('hello world!'); // [!code info]
}
~~~

---

### Code Group

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

Lorem Ipsum is simply dummy text of the \`printing\` and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.

### Another

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.

#### We haven't **used** an \`h4\` yet

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| git status   |   git status   |    git status |
| git diff     |    git diff    |      git diff |

| Command      | Description                                        |
| ------------ | -------------------------------------------------- |
| \`git status\` | List all _new or modified_ files                   |
| \`git diff\`   | Show file differences that **haven't been** staged |

![This is a black dog](./black-dog.jpg)

> Why is Tailwind removing the default styles on my \`h1\` elements? How do I disable this?
> What do you mean I lose all the other base styles too?

> The truth may be puzzling. It may take some work to grapple with. It may be counterintuitive.
> It may contradict deeply held prejudices. It may not be consonant with what we desperately want to be true.
> But our preferences do not determine what’s true. We have a method, and that method helps us
> to reach not absolute truth, only asymptotic approaches to the truth — never there,
> just closer and closer, always finding vast new oceans of undiscovered possibilities.
> Cleverly designed experiments are the key.
>
> -- <cite>Carl Sagan</cite>, in "<cite>Wonder and Skepticism</cite>",
> from the <cite>Skeptical Inquirer</cite> Volume 19, Issue 1 (January-February 1995)
			`}
		</Markdown>

		<ul>
			<li>
				<p><strong>I often do this thing where list items have headings.</strong></p>
				<p>
					For some reason I think this looks cool which is unfortunate because it's pretty annoying
					to get the styles right.
				</p>
				<p>
					I often have two or three paragraphs in these list items, too, so the hard part is getting
					the spacing between the paragraphs, list item heading, and separate list items to all make
					sense. Pretty tough honestly, you could make a strong argument that you just shouldn't
					write this way.
				</p>
			</li>
			<li>
				<p><strong>Since this is a list, I need at least two items.</strong></p>
				<p>
					I explained what I'm doing already in the previous list item, but a list wouldn't be a
					list if it only had one item, and we really want this to look realistic. That's why I've
					added this second list item so I actually have something to look at when writing the
					styles.
				</p>
			</li>
			<li>
				<p><strong>It's not a bad idea to add a third item either.</strong></p>
				<p>
					I think it probably would've been fine to just use two items but three is definitely not
					worse, and since I seem to be having no trouble making up arbitrary things to type, I
					might as well include it. I'm going to press <kbd>Enter</kbd> now.
				</p>
			</li>
		</ul>

		<figure>
			<blockquote cite="https://www.huxley.net/bnw/four.html">
				<p>
					The truth may be puzzling. It may take some work to grapple with. It may be
					counterintuitive. It may contradict deeply held prejudices. It may not be consonant with
					what we desperately want to be true. But our preferences do not determine what’s true. We
					have a method, and that method helps us to reach not absolute truth, only asymptotic
					approaches to the truth — never there, just closer and closer, always finding vast new
					oceans of undiscovered possibilities. Cleverly designed experiments are the key.
				</p>
			</blockquote>
			<figcaption>
				<p>
					<cite>Carl Sagan</cite>, in "<cite>Wonder and Skepticism</cite>", from the
					<cite>Skeptical Inquirer</cite> Volume 19, Issue 1 (January-February 1995)
				</p>
			</figcaption>
		</figure>

		<p>
			One can press <kbd>ctrl</kbd>+<kbd>k</kbd> to trigger search box
		</p>
	</div>
</main>
