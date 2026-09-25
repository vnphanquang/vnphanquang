import { generateKitEntries } from '#data/posts';

import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = generateKitEntries;
