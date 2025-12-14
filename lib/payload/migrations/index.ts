import * as migration_20251214_111115 from './20251214_111115';

export const migrations = [
  {
    up: migration_20251214_111115.up,
    down: migration_20251214_111115.down,
    name: '20251214_111115'
  },
];
