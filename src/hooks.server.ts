import type { Handle } from '@sveltejs/kit';

import { PUBLIC_COOKIE_COLOR_SCHEME } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  const { locals, cookies } = event;

  locals.colorScheme = (cookies.get(PUBLIC_COOKIE_COLOR_SCHEME) as ColorScheme) || 'system';
  cookies.set(PUBLIC_COOKIE_COLOR_SCHEME, locals.colorScheme, {
    path: '/',
    secure: true,
    httpOnly: false,
  });

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%cookie-color-scheme%', event.locals.colorScheme)
  });

  return response;
}
