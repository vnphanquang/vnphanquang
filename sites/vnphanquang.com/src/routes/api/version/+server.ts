import { version } from '$app/env';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({ version }), {
		status: 200,
		headers: new Headers([['Content-Type', 'application/json']]),
	});
};
