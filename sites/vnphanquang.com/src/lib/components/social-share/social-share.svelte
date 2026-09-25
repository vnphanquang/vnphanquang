<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import { CopyBtn } from '../copy-btn';

	export interface SocialShareProps extends Omit<HTMLAttributes<HTMLUListElement>, 'title'> {
		jsFeatures?: boolean;
		url: string;
		title: string;
	}
</script>

<script lang="ts">
	let { url, title, jsFeatures = true, class: cls, ...rest }: SocialShareProps = $props();

	let encodedUrl = $derived(url);

	const commonIconLinkClass = 'c-link-icon border-onehalf flex rounded-full border-current p-2';
</script>

<ul class={['flex flex-wrap gap-4', cls]} {...rest}>
	{#if jsFeatures}
		<li>
			<CopyBtn class={commonIconLinkClass} textToCopy={url} lang="en">Copy URL</CopyBtn>
		</li>
	{/if}
	<li>
		<a
			class={commonIconLinkClass}
			href="https://bsky.app/intent/compose?text={encodedUrl}"
			data-external
		>
			<span class="c-infobox" lang="en">Share on Bluesky</span>
			<i class="i i-[ph--butterfly] h-6 w-6"></i>
		</a>
	</li>
	<li>
		<a
			class={commonIconLinkClass}
			href="https://www.facebook.com/sharer/sharer.php?u={encodedUrl}"
			data-external
		>
			<span class="c-infobox">Share on Facebook</span>
			<i class="i i-[ph--facebook-logo] h-6 w-6"></i>
		</a>
	</li>
	<li>
		<a
			class={commonIconLinkClass}
			href="https://www.linkedin.com/shareArticle?mini=true&url={encodedUrl}&title={title}"
			data-external
		>
			<span class="c-infobox">Share on Linkedin</span>
			<i class="i i-[ph--linkedin-logo] h-6 w-6"></i>
		</a>
	</li>
	<li>
		<!-- FIXME: implement dialog strategy and enable this, prefer HTML native over JS -->
		<!-- {#if hydrated} -->
		<!-- 	<button -->
		<!-- 		type="button" -->
		<!-- 		class="c-link-icon border-onehalf flex rounded-full border-current p-2" -->
		<!-- 		onclick={openQrDialog} -->
		<!-- 	> -->
		<!-- 		<span class="sr-only">QR Code</span> -->
		<!-- 		<i class="i i-[ph--qr-code] h-6 w-6"></i> -->
		<!-- 	</button> -->
		<!-- {/if} -->
	</li>
</ul>
