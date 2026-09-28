<script lang="ts">
	import markdown from '#lib/assets/ascii/markdown.txt?raw';
	import { Ascii } from '#lib/components/ascii';

	import paperPencil from './includes/ascii/paper-pencil.txt?raw';
</script>

<div class="flex items-center justify-center gap-4 text-[0.5cqi] @3xl:gap-10" aria-hidden={true}>
	<Ascii>{paperPencil}</Ascii>
	<Ascii>{markdown}</Ascii>
</div>
