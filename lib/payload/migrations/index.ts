import * as migration_20251214_120151 from './20251214_120151';

export const migrations = [
  {
    up: migration_20251214_120151.up,
    down: migration_20251214_120151.down,
    name: '20251214_120151'
  },
];
