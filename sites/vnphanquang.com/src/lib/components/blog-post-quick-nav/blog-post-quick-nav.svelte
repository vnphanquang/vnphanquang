<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	export interface BlockPostQuickNavProps extends HTMLAttributes<HTMLElement> {
		/**
		 * FIXME:
		 * this JS-dependency may be reduced once scroll-driven animation hit baseline?
		 */
		visible?: boolean;
	}
</script>

<script lang="ts">
	let { class: cls, visible = false, ...rest }: BlockPostQuickNavProps = $props();
</script>

<div
	class={[
		'z-overlay mobile:inset-x-0 tablet:inset-s-1/2 tablet:-translate-x-1/2 fixed inset-be-0 overflow-visible',
		cls,
	]}
	{...rest}
>
	<nav
		class={[
			'bg-stroke-50 text-fill-50 tablet:border-surface tablet:border-onehalf mobile:justify-evenly flex items-center px-2',
			visible ? 'translate-y-0' : 'translate-y-16',
		]}
		lang="en"
		aria-label="Quick Navigation"
	>
		{#snippet inlink(href: string, aria: string, iconClass: string)}
			<a class="c-link-lazy flex flex-col items-center justify-end gap-2 p-2" {href}>
				<i class={['i h-6 w-6', iconClass]}></i>
				<span class="sr-only">{aria}</span>
			</a>
		{/snippet}
		<ul class="contents">
			<li>
				{@render inlink('#share', 'Share', 'i-[ph--share-fat]')}
			</li>
			<li class="pr-8">
				{@render inlink('#toc', 'Table of Contents', 'i-[ph--list-magnifying-glass]')}
			</li>
			<li class="absolute inset-s-1/2 inset-bs-0 -translate-1/2">
				<a
					class="c-link-lazy bg-stroke-50 relative flex flex-col items-center justify-end gap-2 rounded-full p-2"
					href="#content"
				>
					<span
						class="bg-stroke-50 -z-px absolute -inset-s-1 -inset-e-1 inset-bs-1/2 inset-be-0 h-[calc(50%+0.25rem)] rounded-b-full"
					></span>
					<i class="i i-[ph--caret-up] h-6 w-6"></i>
					<span class="sr-only"> Scroll to start of blog post </span>
				</a>
			</li>
			<li class="pl-8">
				{@render inlink('#read-next', 'Read next', 'i-[ph--newspaper-clipping]')}
			</li>
			<li>
				{@render inlink('#comments', 'Comments', 'i-[ph--chat-dots]')}
			</li>
		</ul>
	</nav>
</div>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	nav {
		transition-timing-function: var(--default-transition-timing-function);
		transition-duration: 250ms;
		transition-property: clip-path, translate;

		@media (--tablet) {
			clip-path: circle(1.25rem at 50% 1.25px);

			&:hover {
				clip-path: circle(10rem at 50% 0);
				transition-duration: 150ms;
			}
		}
	}
</style>
