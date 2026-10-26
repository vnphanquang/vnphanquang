<script lang="ts">
	import { SelectableGrid, SelectableGridTemplate } from './selectable-grid';

	const grid = new SelectableGrid();
</script>

<main class="max-w-pad flex-1">
	<SelectableGridTemplate {grid} configurable />
</main>
