<script lang="ts">
	import { resolve } from '$app/paths';
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
				<a class="c-link-lazy p-2" href={resolve('/naq')}>NAQ</a>
			</li>
		</ul>
	</navbar>
</header>
