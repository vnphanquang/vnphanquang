<script lang="ts">
	import { ColorSchemeSwitch } from '@vnphanquang/gach/components';
	import { ColorSchemeContext } from '@vnphanquang/gach/contexts';

	import { resolve } from '$app/paths';

	const colorScheme = ColorSchemeContext.get();
</script>

<header class="max-w-pad flex items-center py-4">
	<a class="font-quang relative -inset-be-0.5 me-auto text-4xl" href={resolve('/')}> quang</a>

	<navbar>
		<ul class="flex items-center">
			<li>
				<a class="c-link-lazy p-2" href={resolve('/blog')}>Blog</a>
			</li>
			<li>
				<a class="c-link-lazy p-2" href={resolve('/projects')}>Projects</a>
			</li>
			<li>
				<a class="c-link-lazy p-2" href={resolve('/never-asked-questions')}>NAQ</a>
			</li>
		</ul>
	</navbar>
	<ColorSchemeSwitch
		colorScheme={colorScheme.user}
		onselect={(scheme) => (colorScheme.user = scheme)}
	/>
</header>
