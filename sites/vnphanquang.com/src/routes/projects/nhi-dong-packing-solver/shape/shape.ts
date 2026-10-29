import { Grid } from '../grid';
import { type Dimension } from '../utils';

export class Shape {
	id: string;
	dimension: Dimension;
	indices: number[];
	color?: string;

	constructor(init: Dimension & { indices: number[]; color?: string }) {
		this.id = crypto.randomUUID();
		this.dimension = { cols: init.cols, rows: init.rows };
		this.indices = init.indices;
		this.color = init.color;
	}

	static from(grid: Grid, color?: string): Shape {
		const trimmed = grid.trim();
		return new Shape({
			rows: trimmed.rows,
			cols: trimmed.cols,
			indices: trimmed.selected,
			color,
		});
	}
}
