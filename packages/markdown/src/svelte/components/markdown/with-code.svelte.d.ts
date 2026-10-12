import type { Component, Snippet } from 'svelte';

export interface WithCodeProps {
	children?: Snippet;
}

declare const WithCode: Component<WithCodeProps>;
export default WithCode;
