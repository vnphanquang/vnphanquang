import { markdown } from 'svelte-md-template';

// creating an alias here to avoid current problem with dts-buddy
// not able to forward type correctly
const md = markdown;
export { md as 'markdown' };

export { default as Markdown } from './components/markdown/markdown.svelte';
