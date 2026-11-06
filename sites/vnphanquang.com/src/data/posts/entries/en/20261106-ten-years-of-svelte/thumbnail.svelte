<script lang="ts">
	import svelte from '#lib/assets/ascii/svelte.txt?raw';
	import { Ascii } from '#lib/components/ascii';

	import balloon from './includes/ascii/balloon.txt?raw';
	import birthdayCake from './includes/ascii/birthday-cake.txt?raw';
	import partyHat from './includes/ascii/party-hat.txt?raw';
</script>

<div class="tablet:text-[0.5cqi] flex items-center justify-center text-[0.7cqi]" aria-hidden={true}>
	<div class="flex flex-col pe-[5cqi]">
		<Ascii class="translate-x-[3cqi] translate-y-[3cqi] self-end">{partyHat}</Ascii>
		<Ascii class="tablet:text-[0.4cqi] text-[0.6cqi]">{svelte}</Ascii>
	</div>
	<Ascii class="self-end">{birthdayCake}</Ascii>
	<Ascii>{balloon}</Ascii>
</div>
