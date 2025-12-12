import * as migration_20251211_223552 from './20251211_223552';

export const migrations = [
  {
    up: migration_20251211_223552.up,
    down: migration_20251211_223552.down,
    name: '20251211_223552',
  },
];
