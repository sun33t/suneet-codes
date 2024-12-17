import path from "node:path";

const config = {
  "*.{cjs,mjs,js,ts,jsx,tsx}": (stagedFiles) => [
    `next lint --fix --file ${stagedFiles
      .map((f) => path.relative(process.cwd(), f))
      .join(" --file ")}`,
    `prettier --write ${stagedFiles.join(" ")}`,
  ],
  "*.{css,md,json}": (stagedFiles) => [
    `prettier --write ${stagedFiles.join(" ")}`,
  ],
};
export default config;
