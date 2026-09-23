export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;

export type ExternalLinkConfig = {
	/** what files the vite plugin should process, passed to Vite `transform.filter.id.include` */
	include?: FilterIdSpecs;
	/** what files the vite plugin should skip, passed to Vite `transform.filter.id.exclude` */
	exclude?: FilterIdSpecs;
	/** a list of hosts that, if href does NOT match, will be marked as external. `localhost` is already included */
	hosts: string[];
	/** a boolean attribute that explicitly marks the anchor tag as external to be processed. Defaults to `'data-external'` */
	markerAttribute?: string;
	/** attributes to add to the anchor tag. Defaults to `{ target: '_blank', rel: 'noopener noreferrer' }` */
	attributes?: Record<string, string>;
};
