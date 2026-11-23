<script lang="ts">
	import { Ascii } from '#lib/components/ascii';

	import asciiHandwrite from './includes/ascii/handwrite.txt?raw';
</script>

<div
	class="tablet:translate-x-14 flex translate-x-10 items-center justify-center"
	aria-hidden={true}
>
	<Ascii class="text-[1cqi]">{asciiHandwrite}</Ascii>
</div>
