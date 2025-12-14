import * as migration_20251214_175440 from './20251214_175440';

export const migrations = [
  {
    up: migration_20251214_175440.up,
    down: migration_20251214_175440.down,
    name: '20251214_175440'
  },
];
