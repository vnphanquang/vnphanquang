import { coordinateToIndex, indexToCoordinate } from './utils';

export interface Dimension {
	rows: number;
	cols: number;
}

export interface Coordinate {
	row: number;
	col: number;
}

export class Grid {
	cols: number;
	rows: number;
	cells: Cell[];

	constructor(dimension: Dimension) {
		const { rows, cols } = dimension;
		this.cols = cols;
		this.rows = rows;
		this.cells = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const cell = new Cell({ row, col });
				this.cells[cell.index(this)] = cell;
			}
		}
	}

	coordinate(coordinate: Coordinate): Cell {
		return this.cells[coordinateToIndex(coordinate, this.cols)];
	}

	coordinateRange(start: Coordinate, end: Coordinate): Cell[] {
		const from = coordinateToIndex(start, this.cols);
		const to = coordinateToIndex(end, this.cols);
		return this.cells.slice(from, to);
	}
}

export class Cell {
	row: number;
	col: number;

	constructor({ row, col }: Coordinate) {
		this.row = row;
		this.col = col;
	}

	static fromIndex<Grid extends { cols: number }>(grid: Grid, index: number): Cell {
		return new Cell(indexToCoordinate(index, grid.cols));
	}

	index<Grid extends { cols: number }>(grid: Grid): number {
		return coordinateToIndex(this, grid.cols);
	}
}
