import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

export const variables = defineEnvVars({
	COOKIE_NAME_COLOR_SCHEME: {
		public: true,
		static: true,
		schema: v.optional(v.string(), 'color-scheme'),
		description: 'cookie name to store color-scheme user preference',
	},
});
