export interface Metadata {
	title: string;
	description: string;
	/* ...as needed... */
}

export function defineMetadata(metadata: Metadata): Metadata {
	return metadata;
}
