import * as migration_20251214_112409 from './20251214_112409';

export const migrations = [
  {
    up: migration_20251214_112409.up,
    down: migration_20251214_112409.down,
    name: '20251214_112409'
  },
];
