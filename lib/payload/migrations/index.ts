import * as migration_20251211_223552 from './20251211_223552';
import * as migration_20251212_110737 from './20251212_110737';
import * as migration_20251212_122630 from './20251212_122630';
import * as migration_20251212_132727 from './20251212_132727';
import * as migration_20251213_073508 from './20251213_073508';
import * as migration_20251213_154413 from './20251213_154413';
import * as migration_20251213_221134 from './20251213_221134';

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
    name: '20251212_132727',
  },
  {
    up: migration_20251213_073508.up,
    down: migration_20251213_073508.down,
    name: '20251213_073508',
  },
  {
    up: migration_20251213_154413.up,
    down: migration_20251213_154413.down,
    name: '20251213_154413',
  },
  {
    up: migration_20251213_221134.up,
    down: migration_20251213_221134.down,
    name: '20251213_221134'
  },
];
