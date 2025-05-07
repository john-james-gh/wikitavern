/** @type {import('knip').KnipConfig} */
const config = {
  include: ["dependencies", "devDependencies"],
  ignoreWorkspaces: ["packages/eslint-config", "packages/typescript-config", "packages/sanity-config"],
  workspaces: {
    "apps/cms": {
      ignoreDependencies: ["@sanity/vision", "@workspace/cms-schema", "@workspace/sanity-config"],
    },
    "apps/web-e2e": {
      ignoreDependencies: ["@workspace/web"],
    },
    "apps/web": {
      ignoreDependencies: ["@workspace/eslint-config"],
    },
    "apps/design-system": {
      ignoreDependencies: ["@workspace/eslint-config"],
    },
    "packages/cms-schema": {
      ignoreDependencies: ["@workspace/sanity-config"],
    },
    "packages/ui": {
      ignoreDependencies: [
        "tw-animate-css",
        "@tailwindcss/postcss",
        "@tailwindcss/typography",
        "tailwindcss",
      ],
    },
  },
}

export default config
