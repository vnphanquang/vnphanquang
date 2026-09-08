import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vnphanquang/eslint-config';
import { globalIgnores } from 'eslint/config';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default await defineConfig({}, globalIgnores([gitignorePath]));
