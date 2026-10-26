/* eslint-disable svelte/prefer-svelte-reactivity */
import { untrack } from 'svelte';

import {
	type Dimension,
	coordinateToIndex,
	indexToCoordinate,
	range,
	type Coordinate,
} from '../grid';

interface SelectableGridOptions extends Dimension {
	selected?: number[];
}

const DEFAULT_SIZE = 8;

export class SelectableGrid {
	#dimension: Dimension = $state({ rows: DEFAULT_SIZE, cols: DEFAULT_SIZE });
	selected: number[] = $state([]);

	constructor(options: Partial<SelectableGridOptions> = {}) {
		this.#dimension = { rows: options.rows ?? DEFAULT_SIZE, cols: options.cols ?? DEFAULT_SIZE };
		if (options.selected) this.selected = options.selected;
	}

	get cols() {
		return this.#dimension.cols;
	}
	set cols(cols: number) {
		this.#updateDimension({ cols });
	}

	get rows() {
		return this.#dimension.rows;
	}
	set rows(rows: number) {
		this.#updateDimension({ rows });
	}

	#updateDimension = (dimension: Partial<Dimension>, updateSelected = true) => {
		const { rows = this.#dimension.rows, cols = this.#dimension.cols } = dimension;
		const lastDimension = untrack(() => this.#dimension);
		this.#dimension = { cols, rows };

		if (!updateSelected) return;
		// update selected
		const previousSelected = untrack(() => this.selected);
		this.selected = previousSelected
			.map((index) => indexToCoordinate(index, lastDimension.cols))
			.filter(({ row, col }) => row < rows && col < cols)
			.map((coor) => coordinateToIndex(coor, cols));
	};

	grow(dimension: 'row' | 'col' | 'both', by = 1) {
		this.#updateDimension({
			rows:
				dimension === 'row' || dimension === 'both'
					? this.#dimension.rows + by
					: this.#dimension.rows,
			cols:
				dimension === 'col' || dimension === 'both'
					? this.#dimension.cols + by
					: this.#dimension.cols,
		});
	}

	trim() {
		if (!this.selected.length) return;

		const coordinates = this.selected.map((s) => indexToCoordinate(s, this.cols));

		const uniqueRows = Array.from(new Set(coordinates.map((c) => c.row)));
		const minRow = Math.min(...uniqueRows);
		const maxRow = Math.max(...uniqueRows);
		const newRows = this.rows - (minRow + this.rows - 1 - maxRow);

		const uniqueCols = Array.from(new Set(coordinates.map((c) => c.col)));
		const minCol = Math.min(...uniqueCols);
		const maxCol = Math.max(...uniqueCols);
		const newCols = this.cols - (minCol + this.cols - 1 - maxCol);

		this.selected = coordinates
			.map(
				(coor) =>
					({
						row: coor.row - minRow,
						col: coor.col - minCol,
					}) as Coordinate,
			)
			.map((coor) => coordinateToIndex(coor, newCols));
		this.#updateDimension({ rows: newRows, cols: newCols }, false);
	}

	isSelected(index: number) {
		return this.selected.includes(index);
	}

	toggleRange(from: number, to: number, selected: boolean) {
		const ranged = range(from, to);

		if (selected) {
			this.selected = Array.from(new Set([...this.selected, ...ranged]));
			return;
		}
		this.selected = Array.from(new Set(this.selected).difference(new Set(ranged)));
	}

	/**
	 * equivalence of visually dragging from one cel to another
	 * note that the selected range [from, to] is inclusive
	 */
	toggleBox(from: number, to: number, selected: boolean) {
		const start = indexToCoordinate(from, this.#dimension.cols);
		const end = indexToCoordinate(to, this.#dimension.cols);
		const minRow = Math.min(start.row, end.row);
		const maxRow = Math.max(start.row, end.row);
		const minCol = Math.min(start.col, end.col);
		const maxCol = Math.max(start.col, end.col);

		const boxed: number[] = [];
		for (let row = minRow; row <= maxRow; row++) {
			for (let col = minCol; col <= maxCol; col++) {
				boxed.push(coordinateToIndex({ row, col }, this.#dimension.cols));
			}
		}

		if (selected) {
			this.selected = Array.from(new Set([...this.selected, ...boxed]));
			return;
		}
		this.selected = Array.from(new Set(this.selected).difference(new Set(boxed)));
	}
}
