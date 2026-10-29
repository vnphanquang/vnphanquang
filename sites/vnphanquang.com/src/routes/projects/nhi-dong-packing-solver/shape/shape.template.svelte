<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import { indexToCoordinate } from '../utils';

	import type { Shape } from './shape';

	export interface ShapeTemplateProps extends HTMLAttributes<HTMLElement> {
		shape: Shape;
	}
</script>

<script lang="ts">
	let { shape, class: cls, ...rest }: ShapeTemplateProps = $props();

</script>

<div
	class={["grid w-fit", cls]}
	style:--rows={shape.dimension.rows}
	style:--cols={shape.dimension.cols}
	style:--color={shape.color}
	{...rest}
>
	{#each shape.indices as index (index)}
		{let coor = $derived(indexToCoordinate(index, shape.dimension.cols))}
		<div
			class="cell bg-blue-500"
			style:--col={coor.col}
			style:--row={coor.row}
		></div>
	{/each}
</div>

<style>
	.grid {
		--cell-size-default: 3rem;

		border-collapse: collapse;
		grid-template-columns: repeat(var(--cols), var(--cell-size, var(--cell-size-default)));
		grid-template-rows: repeat(var(--rows), var(--cell-size, var(--cell-size-default)));
	}

	.cell {
		grid-column: calc(var(--col) + 1);
		grid-row: calc(var(--row) + 1);

		aspect-ratio: 1 / 1;
		border: 1px solid black;

		background-color: var(--color, light-dark(gray, lightgray));
	}
</style>
