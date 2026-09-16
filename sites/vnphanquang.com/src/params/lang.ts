import type { ParamMatcher } from '@sveltejs/kit';

export const LANGUAGES = ['en', 'vi'] as const;
export type Language = (typeof LANGUAGES)[number];

export const match = ((param: string): param is Language =>
	LANGUAGES.includes(param as Language)) satisfies ParamMatcher;
