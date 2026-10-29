<script lang="ts" module>
	import { createAttachmentKey } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';

	import { coordinateToIndex } from '../utils';

	import type { Grid } from './grid.svelte';

	export interface GridTemplateProps extends HTMLAttributes<HTMLElement> {
		grid: Grid;
		configurable?: boolean;
		actionable?: boolean;
		highlight?: (cell: { index: number }) => string | undefined;
	}

	const MAX_SIZE = 20;
</script>

<script lang="ts">
	let {
		grid,
		actionable = false,
		configurable = false,
		highlight,
		class: cls,
		...rest
	}: GridTemplateProps = $props();

	let showCellNumber = $state(false);

	function revertSettings() {
		showCellNumber = false;
		grid.resetDimension();
	}

	interface ToggleBoxEndDetail {
		index: number;
		deselect: boolean;
	}

	const dragSelect: {
		root: () => HTMLAttributes<HTMLElement>;
		cell: (index: number) => HTMLAttributes<HTMLElement>;
	} = {
		root: () => ({
			[createAttachmentKey()]: (element) => {
				let start: number | null = null;

				function toggleboxstart(e: Event) {
					start = (e as CustomEvent<number>).detail;
				}

				function toggleboxend(e: Event) {
					if (start === null) return;
					const { index: end, deselect } = (e as CustomEvent<ToggleBoxEndDetail>).detail;
					if (start !== end) {
						grid.toggleBox(start, end, !deselect);
					}
					start = null;
				}

				element.addEventListener('toggleboxstart', toggleboxstart);
				element.addEventListener('toggleboxend', toggleboxend);
				return () => {
					element.removeEventListener('toggleboxstart', toggleboxstart);
					element.removeEventListener('toggleboxend', toggleboxend);
				};
			},
		}),
		cell: (index: number) => ({
			[createAttachmentKey()]: (element) => {
				function pointerup(e: PointerEvent) {
					const target = e.target as HTMLElement;
					const event = new CustomEvent<ToggleBoxEndDetail>('toggleboxend', {
						detail: {
							index,
							deselect: e.shiftKey,
						},
						bubbles: true,
					});
					target.dispatchEvent(event);
				}

				function pointerdown(e: PointerEvent) {
					e.preventDefault();
					const target = e.target as HTMLElement;
					const event = new CustomEvent<number>('toggleboxstart', {
						detail: index,
						bubbles: true,
					});
					target.dispatchEvent(event);
				}

				element.addEventListener('pointerdown', pointerdown);
				element.addEventListener('pointerup', pointerup);
				return () => {
					element.removeEventListener('pointerdown', pointerdown);
					element.removeEventListener('pointerup', pointerup);
				};
			},
		}),
	};

	const commonBtnClasses =
		'c-btn c-btn--ghost flex justify-center items-center w-full text-fill-100 hover:text-stroke-50';
</script>

<div
	class={['border-onehalf shadow-brutal-lg border-current p-6', cls]}
	style:anchor-scope="--settings"
	{...rest}
>
	<div class="ms-10 flex gap-2">
		{#if actionable}
			<button
				class="c-btn px-3 py-1"
				popovertarget="actions"
				popovertargetaction="toggle"
				style:anchor-name="--actions"
			>
				<i class="i i-[ph--function]"></i>
				<span>Actions</span>
			</button>
		{/if}
		{#if configurable}
			<button
				class="c-btn px-3 py-1"
				popovertarget="settings"
				popovertargetaction="toggle"
				style:anchor-name="--settings"
			>
				<i class="i i-[ph--gear]"></i>
				<span>Settings</span>
			</button>
		{/if}
	</div>
	<table {...dragSelect.root()} style:--cols={grid.cols}>
		<thead>
			<tr>
				{#each { length: grid.cols + 1 }, col (col)}
					<th scope="col">
						{#if col > 0}
							{col}
						{/if}
					</th>
				{/each}
				<td></td>
			</tr>
		</thead>
		<tbody>
			{#each { length: grid.rows }, row (row)}
				<tr>
					<th scope="row">{row + 1}</th>
					{#each { length: grid.cols }, col (col)}
						{let index = $derived(coordinateToIndex({ row, col }, grid.cols))}
						{let anchor = $derived(
							index === 0
								? '--first'
								: index === coordinateToIndex({ row: grid.rows - 1, col: grid.cols - 1 }, grid.cols)
									? '--last'
									: '',
						)}
						{let highlighted = $derived(highlight?.({ index }))}
						<td
							class="cell border border-dashed border-current"
							style:--color-highlighted={highlighted}
						>
							<label {...dragSelect.cell(index)}>
								<input
									class="sr-only"
									type="checkbox"
									value={index}
									bind:group={grid.selected}
									name="selected"
								/>
								<svg viewBox="0 0 1 1" fill="none" style:anchor-name={anchor}>
									<rect x="0" y="0" width="1" height="1" />
								</svg>
								<span
									class={[
										showCellNumber && 'text-fill-200 absolute grid place-items-center text-sm',
										!showCellNumber && 'sr-only',
									]}
									style:position-anchor="var(--anchor)"
									style:position-area="center"
								>
									{index + 1}
								</span>
							</label>
						</td>
					{/each}
					{#if row === 0}
						<td class="relative" rowspan={grid.rows} style:width="2.5rem">
							{#if configurable && grid.cols < MAX_SIZE}
								<button
									class={['absolute inset-0', commonBtnClasses]}
									onclick={() => grid.grow('col')}
								>
									<i class="i i-[ph--plus] shrink-0"></i>
									<span class="c-infobox">Add column</span>
								</button>
							{/if}
						</td>
					{/if}
				</tr>
			{/each}
			<tr>
				<td></td>
				<td colspan={grid.cols}>
					{#if configurable && grid.rows < MAX_SIZE}
						<button class={commonBtnClasses} onclick={() => grid.grow('row')}>
							<i class="i i-[ph--plus] shrink-0"></i>
							<span class="c-infobox">Add row</span>
						</button>
					{/if}
				</td>
				<td>
					{#if configurable && grid.rows < MAX_SIZE && grid.cols < MAX_SIZE}
						<button class={commonBtnClasses} onclick={() => grid.grow('both')}>
							<i class="i i-[ph--plus] shrink-0"></i>
							<span class="c-infobox">Add row & column</span>
						</button>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>

	{#if configurable}
		<aside class="border border-current" popover id="settings" style:--anchor="--settings">
			<div class="grid grid-cols-[auto_1fr] gap-4 p-4">
				{const commonLabelClasses = 'col-span-2 flex grid grid-cols-subgrid items-center gap-2'}
				<label class={commonLabelClasses}>
					<span>Rows:</span>
					<input
						class="c-range"
						type="range"
						bind:value={grid.rows}
						name="rows"
						min="4"
						max={MAX_SIZE}
					/>
				</label>
				<label class={commonLabelClasses}>
					<span>Columns:</span>
					<input
						class="c-range"
						type="range"
						bind:value={grid.cols}
						name="cols"
						min="4"
						max={MAX_SIZE}
					/>
				</label>
				<label class={commonLabelClasses}>
					<span>Show cell number:</span>
					<input
						class="c-checkbox"
						type="checkbox"
						role="switch"
						bind:checked={showCellNumber}
						name="show-cell-number"
					/>
				</label>
				<button class="c-btn c-btn--outlined px-3 py-1" onclick={revertSettings}>
					<span>Revert to defaults</span>
				</button>
			</div>
		</aside>
	{/if}

	{#if actionable}
		<aside class="border border-current" popover id="actions" style:--anchor="--actions">
			{const commonActionItemClasses = 'c-btn c-btn--ghost px-3 py-1 justify-start w-full'}
			<ul class="divide-y-current divide-y">
				<li>
					<button class={commonActionItemClasses} onclick={grid.clear}>
						<i class="i i-[ph--eraser]"></i>
						<span>Clear all selected squares</span>
					</button>
				</li>
				<li>
					{#if configurable}
						<button class={commonActionItemClasses} onclick={() => grid.trim({ inplace: true })}>
							<i class="i i-[ph--scissors]"></i>
							<span>Trim unselected rows & columns</span>
						</button>
					{/if}
				</li>
			</ul>
		</aside>
	{/if}
</div>

<style>
	table {
		--cell-size-default: 3rem;

		user-select: none;
		anchor-scope: --active, --pointered, --first, --last;
		table-layout: fixed;

		th {
			font-weight: normal;

			&[scope='row'] {
				width: 2.5rem;
			}

			&[scope='col'] {
				height: 2.5rem;
			}
		}
	}

	.cell {
		--anchor: --cell;
		--color-relative: oklch(from lightblue l c h / 10%);
		--color-checked: oklch(from lightgreen l c h / 50%);
		--color-pointered: oklch(from lightblue l c h / 25%);

		anchor-name: var(--anchor);
		anchor-scope: --cell;

		aspect-ratio: 1 / 1;
		width: var(--cell-size, var(--cell-size-default));
		height: auto;

		background-color: var(--color-highlighted);

		&:has(:checked) {
			background-color: var(--color-checked);
		}

		&:hover {
			--anchor: --pointered;

			&::before,
			&::after {
				pointer-events: none;
				content: '';

				position: absolute;
				z-index: -1;

				background-color: var(--color-relative);
			}

			&::before {
				inset-block: anchor(--first start) anchor(--last end);
				inset-inline: anchor(--pointered start) anchor(--pointered end);
			}

			&::after {
				inset-block: anchor(--pointered start) anchor(--pointered end);
				inset-inline: anchor(--first start) anchor(--last end);
			}
		}

		&:active {
			--anchor: --active;

			&:not(:hover)::after {
				pointer-events: none;
				content: '';

				position: absolute;
				inset-block: calc(min(anchor(--active start), anchor(--pointered start)) - 1px)
					calc(min(anchor(--active end), anchor(--pointered end)) - 1px);
				inset-inline: calc(min(anchor(--active start), anchor(--pointered start)) - 1px)
					calc(min(anchor(--active end), anchor(--pointered end)) - 1px);

				border: 2px solid red;
			}
		}

		&:is(:hover, :active) {
			background-color: var(--color-pointered);

			&:has(:checked) {
				background-color: color-mix(in oklab, var(--color-checked) 50%, var(--color-pointered) 50%);
			}
		}
	}

	#settings,
	#actions {
		inset-block-start: calc(anchor(var(--anchor) end) + 0.25rem);
		inset-inline-start: anchor(var(--anchor) start);
	}
</style>
