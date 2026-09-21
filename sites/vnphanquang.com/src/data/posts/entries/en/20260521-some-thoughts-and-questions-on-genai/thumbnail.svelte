<script lang="ts">
	import { Ascii } from '#lib/components/ascii';

	import flat from './includes/ascii/robot-flat.txt?raw';
	import frawn from './includes/ascii/robot-frawn.txt?raw';
	import happy from './includes/ascii/robot-happy.txt?raw';
</script>

<div class="flex justify-center gap-4 text-[0.5cqi] @3xl:gap-10">
	<Ascii>{happy}</Ascii>
	<Ascii>{flat}</Ascii>
	<Ascii>{frawn}</Ascii>
</div>
