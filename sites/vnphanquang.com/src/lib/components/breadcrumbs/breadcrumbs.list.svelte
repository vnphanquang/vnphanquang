<script lang="ts" module>
	import type { StructuredCrumb } from '@vnphanquang/gach/metadata';
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Item from './breadcrumbs.item.svelte';

	export interface Crumb extends StructuredCrumb {
		/** what is actually shown in the UI */
		label?: string;
	}

	export interface BreadcrumbsListProps extends HTMLAttributes<HTMLElement> {
		crumbs?: Crumb[];
		scrollIndicator?: 'blur' | 'ellipsis';
	}

	export function defineCrumbs(crumbs: Array<Crumb>): Crumb[] {
		return crumbs;
	}
</script>

<script lang="ts">
	const { crumbs, scrollIndicator = 'blur', children, ...rest }: BreadcrumbsListProps = $props();

	let scrollableLeft = $state(true);
	let scrollableRight = $state(true);
	let scrollable = $state(false);
	let ol: HTMLOListElement | undefined = $state(undefined);
	const PAD = 10;
	function checkScrollable() {
		if (!ol) return;
		scrollable = ol.scrollWidth > ol.offsetWidth;
		scrollableLeft = ol.scrollLeft > PAD;
		scrollableRight = ol.scrollLeft + ol.offsetWidth < ol.scrollWidth - PAD;
	}
	onMount(checkScrollable);
</script>

<nav
	aria-label="Breadcrumbs"
	data-scrollable={scrollable}
	data-scrollable-left={scrollableLeft}
	data-scrollable-right={scrollableRight}
	data-scrollable-indicator={scrollIndicator}
	{...rest}
>
	<ol
		class="scrollbar-hidden text-stroke-200 font-fira flex items-center gap-2 overflow-auto border border-transparent whitespace-nowrap"
		bind:this={ol}
		onscroll={checkScrollable}
	>
		{#if crumbs}
			{#each crumbs as item, i (item.name)}
				<Item
					{...i < crumbs.length - 1 ? { href: item.path } : { 'aria-current': true }}
					{...item.lang && { lang: item.lang }}
				>
					{item.label ?? item.name}
				</Item>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</ol>
</nav>

<style>
	@layer components {
		nav {
			margin-inline: calc(-1 * var(--container-padding-x));
		}

		nav[data-scrollable]:not([data-scrollable='false']) {
			--blur-background-from: var(--color-fill-50, var(--color-primary-fill-50));
			--blur-background-to: rgb(0 0 0 / 0%);

			position: relative;

			&::before,
			&::after {
				pointer-events: none;

				position: absolute;
				z-index: 2;
				top: 0;
				bottom: 0;

				display: block;

				opacity: 0;

				transition: opacity 200ms ease;
			}

			&[data-scrollable-indicator='blur'] {
				&::before,
				&::after {
					content: '';
					width: 132px;
				}

				&::before {
					left: -16px;
					background: linear-gradient(
						270deg,
						var(--blur-background-to) 0%,
						var(--blur-background-from) 86.2%
					);
				}

				&::after {
					right: -16px;
					background: linear-gradient(
						270deg,
						var(--blur-background-from) 0%,
						var(--blur-background-to) 86.2%
					);
				}
			}

			&[data-scrollable-indicator='ellipsis'] {
				&::before {
					content: '...';
					right: 100%;
				}

				&::after {
					content: '...';
					left: 100%;
				}
			}

			&[data-scrollable-left='true']::before {
				opacity: 1;
			}

			&[data-scrollable-right='true']::after {
				opacity: 1;
			}
		}

		ol {
			padding-inline: var(--container-padding-x);

			&::before {
				content: 'pwd: ';
				opacity: 0.5;
			}
		}
	}
</style>
