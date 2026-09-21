import type { ColorScheme } from './constants';

declare global {
	namespace App {
		interface Locals {
			colorScheme: ColorScheme;
		}
	}
}

export {};
