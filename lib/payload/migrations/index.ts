import * as migration_20251214_102007 from './20251214_102007';

export const migrations = [
  {
    up: migration_20251214_102007.up,
    down: migration_20251214_102007.down,
    name: '20251214_102007'
  },
];
