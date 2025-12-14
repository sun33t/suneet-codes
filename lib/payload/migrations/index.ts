import * as migration_20251214_120829 from './20251214_120829';

export const migrations = [
  {
    up: migration_20251214_120829.up,
    down: migration_20251214_120829.down,
    name: '20251214_120829'
  },
];
