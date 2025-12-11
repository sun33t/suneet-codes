import * as migration_20251211_223019 from "./20251211_223019";

export const migrations = [
	{
		up: migration_20251211_223019.up,
		down: migration_20251211_223019.down,
		name: "20251211_223019",
	},
];
