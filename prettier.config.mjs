/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  proseWrap: "preserve",
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: ["^[./]", "<THIRD_PARTY_MODULES>", "^@/(.*)$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
