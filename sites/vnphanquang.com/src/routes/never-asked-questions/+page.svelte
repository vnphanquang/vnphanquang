<script lang="ts">
	import asciiNightWindow from '$lib/assets/ascii/night-window.txt?raw';
</script>

<main class="max-w-pad max-tablet:flex-col-reverse flex flex-1 gap-20 py-10">
	<pre
		class="ascii max-tablet:mx-auto desktop:text-[0.6rem] tablet:sticky inset-bs-10 h-fit text-[0.45rem]">{asciiNightWindow}</pre>
	<div class="max-w-readable w-full">
		<h1 class="tablet:text-4xl font-quang border-b text-3xl font-bold">Never Asked Questions</h1>
		<p class="text-right text-sm leading-relaxed italic">
			You might even stumble upon some answers...
		</p>
		<dl class="">
			<div>
				<dt>What the hell 🤯?</dt>
				<dd>Yes</dd>
			</div>

			<div>
				<dt>Why Vim?</dt>
				<dd>
					Right tool 🪛 for the right job 🔩!
					<a class="c-link" href="https://neovim.io/">Neovim</a>, btw.
				</dd>
			</div>

			<div>
				<dt>Why did you attack my cuccos 🐔?</dt>
				<dd>Bottle yourself up and give me your rupee 💎, now!</dd>
			</div>

			<div>
				<dt>Will i take LLM's jobs?</dt>
				<dd>Cleaning 💩 is a respectable work. Everyone's got a passion, or a will to live.</dd>
			</div>

			<div>
				<dt>
					The climate has been changing for countless centuries. Why bother now with this buzzing
					"climate change"?"
				</dt>
				<dd class="leading-relaxed">
					<p>
						The crux of the climate change argument is not the fact that it is changing but the rate
						at which it is. CO<sub>2</sub> is just the tip of the iceburg with no clear indication for
						ordinary folks. Ocean acidification is the evil twin of global warming. Species are going
						extinct at a rate much greater than the background extinction rate.
					</p>
					<br />
					<p>
						This rate of change is comparable to previous mass extinctions in earth history. If that
						doesn't make you 💩 your pants, then hold your bladder and read
						<a
							class="c-link"
							href="https://en.wikipedia.org/wiki/The_Sixth_Extinction:_An_Unnatural_History"
						>
							Elizabeth Kolbert's "The Sixth Extinction".
						</a>
					</p>
				</dd>
			</div>

			<div>
				<dt>Will my donation pay your rent?</dt>
				<dd>
					Yes. <a class="c-link" href="https://github.com/sponsors/vnphanquang">Github Sponsor</a> is
					currently where you can give it a go. i appreciate your kindness.
				</dd>
			</div>

			<div>
				<dt>What will you do if you have too much money?</dt>
				<dd>Use it to buy all the other money in this world, and burn them all 🔥.</dd>
			</div>

			<div>
				<dt>You okay, comrade?</dt>
				<dd>
					<a class="c-link" href="https://youtu.be/Jr-IzeSX0BA?si=gKrXGO7514mu4cEP">Hello world!</a>
				</dd>
			</div>
		</dl>
	</div>
</main>

<style>
	dt {
		font-weight: 600;
	}

	dl > div {
		padding-block: 1.5rem;
		border-block-end: 1px solid var(--color-fill-200);
	}

	dd {
		margin-block-start: 1rem;
		padding-inline-start: 1rem;
		border-inline-start: 2px solid var(--color-fill-200);
		font-size: var(--text-sm);
	}
</style>
