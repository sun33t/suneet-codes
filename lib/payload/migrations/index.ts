import * as migration_20251214_004803 from './20251214_004803';

export const migrations = [
  {
    up: migration_20251214_004803.up,
    down: migration_20251214_004803.down,
    name: '20251214_004803'
  },
];
