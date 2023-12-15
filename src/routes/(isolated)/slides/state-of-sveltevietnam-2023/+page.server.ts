import type { PageServerLoad } from './$types';
import ogImage from './_page/images/thumbnail.jpg';

export const ssr = false;

export const load: PageServerLoad = () => {
  return {
    meta: {
      title: 'State of SvelteVietnam 2023',
      description: 'Slides for the "State of Svelte Vietnam" presentation at the "Online Meetup Year-End 2023" event',
      og: {
        image: ogImage,
      },
    },
  };
};
