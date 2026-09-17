<script lang="ts">
	import { Footer } from '$lib/components/footer';
	import { Header } from '$lib/components/header';

	import '../app.css';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Header />
{@render children()}
<Footer />
