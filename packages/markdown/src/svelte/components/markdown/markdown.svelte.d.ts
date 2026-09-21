import type { Component, Snippet } from 'svelte';

export interface MarkdownProps {
	children?: Snippet;
	/** @default false */
	codeless?: boolean;
}

declare const Component: Component<MarkdownProps>;
export default Component;
