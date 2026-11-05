<script lang="ts">
	import ascii404 from '#lib/assets/ascii/404.txt?raw';
	import asciiOwlGenericError from '#lib/assets/ascii/owl-generic-error.txt?raw';
	import { Ascii } from '#lib/components/ascii';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<main
	class="max-w-pad desktop:py-20 desktop:gap-10 @container flex flex-1 flex-col items-center gap-6 py-10"
>
	{#if page.status === 404}
		<div class="ascii-404">
			<Ascii>{ascii404}</Ascii>
		</div>
		<p class="desktop:text-2xl text-center text-xl">
			Hoo-hoops, the content you're looking for does not exist. Maybe try:
		</p>
	{:else}
		<div class="ascii-generic">
			<Ascii>{asciiOwlGenericError}</Ascii>
		</div>
		<p class="desktop:text-2xl text-center text-xl">
			Hoo-hoops, something is not right:
			{#if page.error?.message}
				<br />
				<span class="text-error">{page.error.message}</span>
			{/if}
		</p>
	{/if}
	<div class="flex justify-center gap-6">
		<a class="c-btn" href={resolve('/')}> Back to homepage </a>
		<a class="c-btn c-btn--outlined" href={resolve('/blog')}> Entertain me </a>
	</div>
</main>

<style>
	.ascii-404 {
		font-size: 0.8cqi;
	}

	.ascii-generic {
		font-size: min(0.8cqi, 0.4rem);
	}
</style>
