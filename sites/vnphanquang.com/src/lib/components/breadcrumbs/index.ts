import Item from './breadcrumbs.item.svelte';
import List from './breadcrumbs.list.svelte';

export const Breadcrumbs = { List, Item };
export { defineCrumbs } from './breadcrumbs.list.svelte';
export type * from './breadcrumbs.item.svelte';
export type * from './breadcrumbs.list.svelte';
