import * as migration_20251211_223552 from './20251211_223552';
import * as migration_20251212_110737 from './20251212_110737';
import * as migration_20251212_122630 from './20251212_122630';
import * as migration_20251212_132727 from './20251212_132727';

export const migrations = [
  {
    up: migration_20251211_223552.up,
    down: migration_20251211_223552.down,
    name: '20251211_223552',
  },
  {
    up: migration_20251212_110737.up,
    down: migration_20251212_110737.down,
    name: '20251212_110737',
  },
  {
    up: migration_20251212_122630.up,
    down: migration_20251212_122630.down,
    name: '20251212_122630',
  },
  {
    up: migration_20251212_132727.up,
    down: migration_20251212_132727.down,
    name: '20251212_132727'
  },
];
