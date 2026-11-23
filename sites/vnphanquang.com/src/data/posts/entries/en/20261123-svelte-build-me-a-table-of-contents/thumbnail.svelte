<script lang="ts">
	import { Ascii } from '#lib/components/ascii';

	import asciiHandwrite from './includes/ascii/handwrite.txt?raw';
</script>

<div class="flex items-center justify-center" aria-hidden={true}>
	<Ascii class="text-[1cqi]">{asciiHandwrite}</Ascii>
</div>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	:global(.thumbnail) > div {
		translate: 2.5rem;

		@media (--tablet) {
			translate: 3.5rem;
		}
	}
</style>
