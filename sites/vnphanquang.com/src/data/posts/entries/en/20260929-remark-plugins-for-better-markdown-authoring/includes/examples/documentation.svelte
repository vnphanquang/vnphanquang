<script>
	import Demo from './demo.svelte';
	import { markdown } from 'svelte-md-template';
</script>

<!-- Render that demo -->
<Demo />

<!-- Render source code of the demo -->
{markdown`
~~~svelte src="fs:./demo.svelte"

~~~
`}
