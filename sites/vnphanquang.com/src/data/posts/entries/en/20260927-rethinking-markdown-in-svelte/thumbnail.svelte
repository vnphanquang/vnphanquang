<script lang="ts">
	import svelte from '#lib/assets/ascii/svelte.txt?raw';
	import { Ascii } from '#lib/components/ascii';

	import arrowCircle from './includes/ascii/arrow-circle.txt?raw';
	import markdown from './includes/ascii/markdown.txt?raw';
</script>

<div class="flex items-center justify-center gap-4 text-[0.5cqi] @3xl:gap-10" aria-hidden={true}>
	<Ascii>{markdown}</Ascii>
	<Ascii class="ml-4">{arrowCircle}</Ascii>
	<Ascii>{svelte}</Ascii>
</div>
