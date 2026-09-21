import { ColorSchemeContext } from './color-scheme.svelte.js';
import { LoadingContext } from './loading.svelte.js';
import { LockScrollContext } from './lockscroll.svelte.js';

/**
 * @typedef CreateContextsInput
 * @property {() => import('./color-scheme.svelte').ColorSchemeContextInit} colorScheme
 * @property {import('./loading.svelte.js').LoadingAutoTriggers} globalLoading
 */

/**
 * For immediate use after creation
 * @typedef CreateContextsOutput
 * @property {LockScrollContext} lockscroll
 * @property {ColorSchemeContext} colorScheme
 * @property {LoadingContext} globalLoading
 */

/**
 * @param {CreateContextsInput} input
 * @returns {CreateContextsOutput}
 */
export function createContexts(input) {
	return {
		lockscroll: LockScrollContext.set(),
		colorScheme: ColorSchemeContext.set(input.colorScheme),
		globalLoading: LoadingContext.setGlobal(input.globalLoading),
	};
}

export * from './color-scheme.svelte.js';
export * from './lockscroll.svelte.js';
export * from './loading.svelte.js';
