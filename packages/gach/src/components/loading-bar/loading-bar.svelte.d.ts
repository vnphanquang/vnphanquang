import type { Component } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type LoadingBarProps = HTMLAttributes<HTMLDivElement>;

/** top loading bar, similar to one seen on github */
declare const LoadingBar: Component<LoadingBarProps>;
export default LoadingBar;
