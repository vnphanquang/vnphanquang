<script lang="ts">
	import fixture from './fixtures/one.json';
	import { Grid, GridTemplate, type GridTemplateProps } from './grid';
	import { Shape, ShapeTemplate } from './shape';

	const STEPS = [
		{
			id: 'target',
			title: 'Define shape',
			description: 'Select squares that draw the final shape.',
		},
		{
			id: 'options',
			title: 'Define pieces',
			description:
				'Select squares that draw a cut-out shape. Click "Add" to register that shape. Add as many as needed.',
		},
		{
			id: 'play',
			title: 'Play puzzle',
			description: 'Try out the interactive puzzle. Drag and drop pieces so that they fit inside the final shape',
		},
		{
			id: 'solve',
			title: 'Check solution',
			description: 'See a possible solution for the puzzle.',
		},
	];

	const grid = Grid.fromShape(fixture.target);

	let stepIndex: number = $state(0);
	let step = $derived(STEPS[stepIndex]);
	let target: Shape | null = $state(fixture.target);
	let options: Shape[] = $state(fixture.options);
	let configurable = $derived(stepIndex === 0);
	let actionable = $derived(stepIndex < 2);
	let selectable = $derived(stepIndex < 2);
	let highlight: GridTemplateProps['highlight'] | undefined = $derived.by(() => {
		if (!target || (step.id !== 'options' && step.id !== 'play')) return;
		return ({ index }) => {
			if (!target?.indices.includes(index)) return;
			return 'oklch(from light-dark(black, lightgray) l c h / 10%)';
		};
	});

	let hasPrevious = $derived(stepIndex > 0);
	let hasNext = $derived(stepIndex < STEPS.length - 1);
	let canGoNext = $derived.by(() => {
		if (step.id === 'target') {
			return !!grid.selected.length;
		}
		return true;
	});
	function goto(step = 1) {
		const currentStep = STEPS[stepIndex];
		const nextStep = STEPS[stepIndex + step];
		switch (nextStep.id) {
			case 'target':
				if (!target) break;
				grid.selectFromShape(target);
				break;
			case 'options':
				if (currentStep.id === 'target') {
					grid.trim({ inplace: true });
					target = new Shape({
						rows: grid.rows,
						cols: grid.cols,
						indices: grid.selected,
					});
					grid.clear();
				}
				break;
		}
		stepIndex += step;
	}

	function addOption() {
		if (!grid.selected.length) return;
		const shape = Shape.from(grid);
		options.push(shape);
		grid.clear();
	}
</script>

<main class="max-w-pad flex flex-1 flex-col space-y-10 py-10">
	<!-- header -->
	<header>
		<nav>
			<ul class="steps">
				{#each STEPS as step, i (step.id)}
					<li>
						<label>
							<span>{step.title}</span>
							<input type="radio" class="sr-only" value={i} bind:group={stepIndex} name="step" />
						</label>
					</li>
				{/each}
			</ul>
		</nav>
	</header>

	<!-- main content -->
	<section class="flex-1 space-y-10">
		<section>
			<p>{step.description}</p>
			{#if stepIndex < 2}
				<GridTemplate class="h-fit w-fit" {grid} {selectable} {actionable} {configurable} {highlight} />
			{:else}
				<div class="border-onehalf border-current p-6 shadow-brutal-lg w-fit">
					<ShapeTemplate shape={target} />
				</div>
			{/if}
		</section>

		{#if step.id === 'options'}
			<section class="space-y-4">
				<h2 class="text-2xl font-bold">Pieces</h2>
				<ul class="flex max-w-full gap-4 overflow-auto pb-2">
					{#each options as shape, i (shape.id)}
						<li class="flex flex-col justify-between gap-10 space-y-6 border border-dashed p-4">
							<ShapeTemplate {shape} --cell-size="2rem" />
							<button class="c-btn px-3 py-1" onclick={() => options.splice(i, 1)}> Remove </button>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</section>

	<!-- actions -->
	<footer
		class="z-header bg-fill-50 sticky bottom-0 flex flex-wrap justify-between gap-4 border-t
		border-current py-4"
	>
		<button
			class={['c-btn c-btn--outlined', !hasPrevious && 'invisible']}
			onclick={() => goto(-1)}
			disabled={!hasPrevious}
		>
			Back
		</button>
		{#if step.id === 'options'}
			<button class="c-btn ms-auto" onclick={addOption}> Add </button>
		{/if}
		{#if hasNext}
			<button class="c-btn" onclick={() => goto(+1)} disabled={!canGoNext}> Continue </button>
		{/if}
	</footer>

	<!-- {#if target} -->
	<!-- 	<section class="space-y-6"> -->
	<!-- 		<h2 class="text-2xl font-bold">Target Shape</h2> -->
	<!-- 		<ShapeTemplate shape={target} --cell-size="3rem" /> -->
	<!-- 	</section> -->
	<!-- {/if} -->
	<!---->
	<!-- {#if options.length} -->
	<!-- 	<section class="space-y-6"> -->
	<!-- 		<h2 class="text-2xl font-bold">Cut-out Pieces</h2> -->
	<!-- 		<ul class="flex flex-wrap gap-6"> -->
	<!-- 			{#each options as shape, i (shape.id)} -->
	<!-- 				<li class="flex h-fit flex-col gap-10 space-y-6 border border-dashed p-4"> -->
	<!-- 					<ShapeTemplate {shape} --cell-size="3rem" /> -->
	<!-- 					<button class="c-btn px-3 py-1" onclick={() => options.splice(i, 1)}> Remove </button> -->
	<!-- 				</li> -->
	<!-- 			{/each} -->
	<!-- 		</ul> -->
	<!-- 	</section> -->
	<!-- {/if} -->
</main>

<style>
	.steps {
		counter-reset: step;
		display: flex;

		& > li {
			display: contents;

			& > label {
				--step-fill: var(--color-primary);
				--step-stroke: var(--color-base-50);

				cursor: pointer;
				counter-increment: step;

				position: relative;

				display: flex;
				flex: 1;
				flex-direction: column;
				gap: 0.5em;
				align-items: center;

				&::before {
					content: counter(step);

					align-content: center;

					aspect-ratio: 1 / 1;
					width: 2em;
					height: 2em;
					border-radius: 50%;

					font-weight: 700;
					color: var(--step-stroke);
					text-align: center;

					background-color: var(--step-fill);
				}

				&:has(:disabled) {
					cursor: not-allowed;
				}
			}

			&:has(:checked) ~ li > label {
				--step-fill: var(--color-stroke-50);
				--step-stroke: var(--color-fill-50);
			}

			&:has(:checked) > label {
				color: var(--color-primary);
			}

			&:not(:first-child) > label::after {
				content: '';

				position: absolute;
				z-index: -1;
				inset-block-start: 1em;
				inset-inline-end: 100%;
				translate: 50% -50%;

				width: 100%;
				height: 0.5em;

				background-color: var(--step-fill);
			}
		}
	}
</style>
