<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let props: import('./loading-bar.svelte').LoadingBarProps = $props();

	const p = new Tween(0, {
		duration: 8000,
		easing(t) {
			const steps = [0, 0.2, 0.6, 0.75, 1] as const;
			for (let i = 0; i < steps.length; i++) {
				if (t < steps[i]) {
					const stepDuration = steps[i] - steps[i - 1];
					return cubicInOut((t - steps[i - 1]) / stepDuration) * stepDuration + steps[i - 1];
				}
			}
			return 1;
		},
	});

	onMount(() => {
		p.target = 1;
	});

	let percentage = $derived(p.current * 100);
</script>

<div
	class={['z-notification fixed inset-x-0 inset-bs-0 h-1 w-full', props]}
	style="

--percentage: {percentage}%"
>
	<progress max="100" value={percentage} aria-label="page loading indicator" class="sr-only">
		{percentage}%
	</progress>
	<div
		class="from-primary via-secondary to-tertiary absolute inset-s-0 inset-bs-0 h-full bg-linear-to-r"
		style:width="var(--percentage)"
		aria-disabled="true"
	></div>
</div>
