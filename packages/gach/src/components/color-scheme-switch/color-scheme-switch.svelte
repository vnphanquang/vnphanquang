<script lang="ts">
	import type { ColorScheme } from '../../constants';

	let {
		colorScheme = 'system',
		onselect,
		class: cls,
		...rest
	}: import('./color-scheme-switch.svelte').ColorSchemeSwitchProps = $props();

	let nextColorScheme = $derived.by(() => {
		if (colorScheme === 'system') return 'light' as const;
		if (colorScheme === 'light') return 'dark' as const;
		return 'system' as const;
	});

	const COLOR_SCHEME_DATA = {
		system: {
			icon: 'i-[ph--devices]',
			label: 'System',
		},
		light: {
			icon: 'i-[ph--sun]',
			label: 'Light',
		},
		dark: {
			icon: 'i-[ph--moon]',
			label: 'Dark',
		},
	};

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!onselect) return;

		if (!document.startViewTransition) {
			onselect(nextColorScheme);
			return;
		}

		const transition = document.startViewTransition(() => {
			onselect(nextColorScheme);
			document.documentElement.classList.toggle('in-theme-transition', true);
		});

		await transition.finished;
		document.documentElement.classList.toggle('in-theme-transition', false);
	}
</script>

<form class={[cls]} method="GET" onsubmit={handleSubmit} {...rest}>
	<label class="c-link-icon flex items-center p-2">
		<input class="sr-only" type="submit" name="color-scheme" value={nextColorScheme} />
		{const current = $derived(COLOR_SCHEME_DATA[colorScheme])}
		<i class={['i h-6 w-6', current.icon]}></i>
		<span class="sr-only">
			Current: {current.label}. Click to circle through available color schemes
		</span>
	</label>
</form>

<style global>
	:root.in-theme-transition {
		&::view-transition-old(root) {
			animation-delay: 600ms;
		}

		&::view-transition-new(root) {
			animation: circle-in 600ms var(--default-transition-timing-function);
		}

		@media (prefers-reduced-motion: reduce) {
			&::view-transition-old(root) {
				animation-duration: 0ms;
			}

			&::view-transition-new(root) {
				animation-duration: 0ms;
			}
		}
	}

	@keyframes circle-in {
		from {
			clip-path: circle(0% at 100% 0%);
		}

		to {
			clip-path: circle(140% at 100% 0%);
		}
	}
</style>
