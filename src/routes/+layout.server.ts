import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  return { colorScheme: locals.colorScheme };
};
