// import path from 'path';
// import { fileURLToPath } from 'url';

import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: UserConfig = {
  plugins: [
    enhancedImages(),
    sveltekit(),
  ],
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(Date.now().toString()),
  },
};

export default config;
