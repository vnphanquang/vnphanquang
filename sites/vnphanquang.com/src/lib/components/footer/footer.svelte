<script lang="ts">
	import { Ascii } from '#lib/components/ascii';

	const ascii_bubble_prefix = ` .------------------.\n( `;
	const ascii_bubble_suffix = ` )\n '------------------\`\\\n`;
	const ascii_default = ' built by human ♥︎ ';
	const ascii_hovered = ' LLM not welcomed ';
	const ascii_clicked = 'not all owls hoot!';
	const ascii_owl = ' ,_,\n(O,O)\n(   )\n-"-"----';

	let { version }: { version: string } = $props();
</script>

<footer class="from-fill-50 to-primary-fill-100 space-y-2 bg-linear-to-b to-120% pbs-14 pbe-10">
	<div class="main max-w-pad grid text-sm">
		<div class="notes tablet:self-end leading-relaxed">
			<p>{version}</p>
			<p>
				made possible by
				<a class="c-link-lazy" href="http://vite.dev/">
					<span class="sr-only">Vite</span>
					<i class="i i-[simple-icons--vite]"></i>
				</a>
				<a class="c-link-lazy" href="https://svelte.dev">
					<span class="sr-only">Svelte and SvelteKit</span>
					<i class="i i-[simple-icons--svelte]"></i>
				</a>
				<a class="c-link-lazy" href="https://tailwindcss.com">
					<span class="sr-only">TailwindCSS</span>
					<i class="i i-[simple-icons--tailwindcss]"></i>
				</a>
			</p>
			<p>MIT 2023-Present © Quang Phan</p>
		</div>
		<ul class="socials flex items-center gap-4 text-xl">
			<li>
				<a class="c-link-icon" href="https://github.com/vnphanquang">
					<span class="sr-only">Github</span>
					<i class="i i-[simple-icons--github]"></i>
				</a>
			</li>
			<li>
				<a class="c-link-icon" href="https://bsky.app/profile/vnphanquang.com">
					<span class="sr-only">Bluesky</span>
					<i class="i i-[simple-icons--bluesky]"></i>
				</a>
			</li>
		</ul>
		<label class="owl flex cursor-pointer flex-row-reverse items-start gap-4 justify-self-end">
			<Ascii class="leading-normal tracking-wider">{ascii_owl}</Ascii>
			<input class="peer" type="checkbox" hidden />
			<Ascii class="leading-normal"
				>{ascii_bubble_prefix}<span class="hovered">{ascii_hovered}</span><span class="clicked"
					>{ascii_clicked}</span
				><span class="default">{ascii_default}</span>{ascii_bubble_suffix}</Ascii
			>
		</label>
	</div>
</footer>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	.main {
		grid-template-areas:
			'owl'
			'socials'
			'notes';
		gap: 0.5rem;

		@media (--tablet) {
			grid-template-areas: 'notes socials owl';
			grid-template-columns: 1fr auto 1fr;
		}
	}

	.notes {
		grid-area: notes;
	}

	.socials {
		grid-area: socials;
	}

	.owl {
		grid-area: owl;
	}

	.default,
	.hovered,
	.clicked {
		transition-timing-function: var(--default-transition-timing-function);
		transition-duration: var(--default-transition-duration);
		transition-property: all;
	}

	:is(.hovered, .clicked) {
		display: none;
		opacity: 0;
	}

	.owl:hover:not(:has(input:checked)) .hovered,
	.owl:has(input:checked) .clicked {
		display: inline-block;
		opacity: 1;

		@starting-style {
			opacity: 0;
		}

		& ~ .default {
			display: none;
			opacity: 0;
		}
	}
</style>
