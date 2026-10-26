import type { Coordinate } from './grid';

export function coordinateToIndex(coordinate: Coordinate, numCols: number): number {
	return coordinate.row * numCols + coordinate.col;
}

export function indexToCoordinate(index: number, numCols: number): Coordinate {
	const row = Math.floor(index / numCols);
	const col = index % numCols;
	return { row, col };
}

export function range(start: number, end: number): number[] {
	const from = Math.min(start, end);
	const to = Math.max(start, end);
	const length = to - from;
	const array = new Array(length);
	for (let i = 0; i < length; i++) {
		array[i] = from + i;
	}
	return array;
}
