import { FlatCompat } from "@eslint/eslintrc";
import nodePlugin from "eslint-plugin-n";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  nodePlugin.configs["flat/recommended-script"],
  {
    rules: {
      "n/no-process-env": ["warn"],
      "n/no-missing-import": ["off"],
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
